import { getUserData } from '@/services/api/user/model';
import { initClicker } from '@/services/websocket/clicker';
import { initDataRaw } from '@/stores/telegram';
import { UserResponseData, UserResponse } from '@/services/api/user/types';
import { ClickerState, SerializedState } from '@/services/websocket/clicker';
import { preload } from '@/stores/preload';
import {
  $gameState,
  $localState,
  $isNew,
  $initializationStep,
  $initializationError,
  $prefetchedState,
  transport,
  $user,
  $subscribed,
  $subscribeButton,
} from '@/stores/state';
import { User } from '@/stores/types';

// Add this mapper function
const mapUserResponseToUser = (userResponse: UserResponse): User => ({
  firstName: userResponse.tg_fullname.split(' ')[0], // Assuming the first name is the first part of the full name
  lastName: userResponse.tg_fullname.split(' ').slice(1).join(' '), // The rest is the last name
  id: parseInt(userResponse.tg_uid),
  username: userResponse.tg_username,
  languageCode: 'en', // Set a default or get it from somewhere else if available
  photoUrl: userResponse.tg_profile_image || undefined,
});

export const initializeApp = async () => {
  try {
    // Step 1: Load local state
    $initializationStep.set(1);
    const localState = $localState.get();

    // Step 2: Load prefetched state
    $initializationStep.set(2);
    const prefetchedState = await getPrefetchedState();
    $prefetchedState.set(prefetchedState);

    // Determine if user is new
    // smart initialization is turned off in development
    if (import.meta.env.DEV) {
      $isNew.set(true);
    } else {
      const isNew = $isNew.get() || (!localState && !prefetchedState);
      $isNew.set(isNew);
    }

    // Preload content if necessary
    await preload($isNew.get());

    // Step 3: Get user data from API
    $initializationStep.set(3);
    const userData = await getUserData({ rawData: initDataRaw });

    // Step 4: Initialize game state
    $initializationStep.set(4);
    const gameState = initializeGameState(localState, prefetchedState, userData);
    $gameState.set(gameState);
    const initialLoader = document.getElementById('initial-loader');
    if (initialLoader) {
      initialLoader.remove();
    }

    // Update local state
    $localState.set(gameState.serialize());

    // Update user state
    $user.set(mapUserResponseToUser(userData.user));

    if (userData.user.can_play) {
      $subscribeButton.set('clicked');
      $subscribed.set(true);
      $isNew.set(false);
    } else {
      $subscribed.set(false);
    }

    // Step 5: Connect to WebSocket
    $initializationStep.set(5);

    const transportUrl = new URL(import.meta.env.VITE_WS_URL);
    transportUrl.searchParams.set('rawData', initDataRaw);

    await transport.connect(transportUrl.toString());

    // Initialization complete
    $initializationError.set(null);
  } catch (error) {
    console.error('Initialization error:', error);
    $initializationError.set(error instanceof Error ? error.message : String(error));
  }
};

const getPrefetchedState = (): Promise<SerializedState | null> => {
  return new Promise(resolve => {
    const prefetchedState = localStorage.getItem('prefetchedState');
    if (prefetchedState) {
      resolve(JSON.parse(prefetchedState));
    } else {
      const timeout = setTimeout(() => resolve(null), 5000);
      document.addEventListener('stateReceived', function onStateReceived(event: Event) {
        document.removeEventListener('stateReceived', onStateReceived);
        clearTimeout(timeout);
        const data = (event as CustomEvent<SerializedState>).detail;
        resolve(data);
      });
    }
  });
};

const initializeGameState = (
  localState: SerializedState | null,
  prefetchedState: SerializedState | null,
  userData: UserResponseData
): ClickerState => {
  // Compare timestamps and use the most recent data
  const states = [localState, prefetchedState, userData.user.clicker_state]
    .filter(Boolean)
    .sort((a, b) => {
      const getTimestamp = (state: SerializedState | { energy_reset_at: string }) =>
        'energyResetAt' in state
          ? new Date(state.energyResetAt).getTime()
          : new Date(state.energy_reset_at).getTime();

      return (
        getTimestamp(b as SerializedState | { energy_reset_at: string }) -
        getTimestamp(a as SerializedState | { energy_reset_at: string })
      );
    });

  const mostRecentState = states[0];
  if (mostRecentState) {
    const { quarks, stars, clicks, level } = mostRecentState;
    return initClicker(quarks, stars, clicks, level);
  }

  return initClicker();
};
