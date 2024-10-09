import { useMemo } from 'react';
import { ClickerState } from '@shared/services/websocket/clicker';
import { UserResponseData } from '@shared/services/api/user/types';

export const useSyncedValues = (
  userData: UserResponseData | undefined,
  gameState: ClickerState | null
) => {
  return useMemo(() => {
    const getStateValue = (key: 'quarks' | 'stars'): number => {
      const userValue = userData?.user?.clicker_state?.[key];
      const gameStateValue = gameState?.[key].get();
      return userValue ?? gameStateValue ?? 0;
    };

    return {
      syncedQuarks: getStateValue('quarks'),
      syncedStars: getStateValue('stars'),
    };
  }, [userData, gameState]);
};