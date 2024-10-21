import { useEffect, useCallback, useReducer, useMemo, useRef } from 'react';
import { initUtils } from '@telegram-apps/sdk-react';

import { type Mission } from '@shared/services/api/missions/types.ts';
import { initDataRaw } from '@app/stores/telegram';
import { useClaimMissionReward, useGetMissions } from '@shared/services/api/missions/model';

export const getMissionClickTime = (title: string): string | null =>
  localStorage.getItem(title);

export const setMissionClickTime = (title: string): void =>
  localStorage.setItem(title, Date.now().toString());

export const removeMissionClickTime = (title: string): void =>
  localStorage.removeItem(title);

export const calculateTimeDiff = (startTime: number): number =>
  Date.now() - startTime;

export interface MissionValidationConfig {
  validationDelayMs?: number;
  validationTimeMs: number;
  missionTimeMs: number;
  maxWaitTimeMs?: number;
  missionsFetchStatus: string[];
}

interface UseMissionValidationParams {
  mission: Mission;
  url: string;
  title: string;
  config: MissionValidationConfig;
}

interface UseMissionValidationReturn {
  isCompleted: boolean;
  isValidating: boolean;
  isOpen: boolean;
  handleClick: () => void;
  handleClose: () => void;
}

interface State {
  isCompleted: boolean;
  isValidating: boolean;
  isOpen: boolean;
}

type Action =
  | { type: 'SET_COMPLETED'; payload: boolean }
  | { type: 'SET_VALIDATING'; payload: boolean }
  | { type: 'SET_OPEN'; payload: boolean };

/**
 * Reducer function for managing state transitions.
 */
const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_COMPLETED':
      return { ...state, isCompleted: action.payload };
    case 'SET_VALIDATING':
      return { ...state, isValidating: action.payload };
    case 'SET_OPEN':
      return { ...state, isOpen: action.payload };
    default:
      return state;
  }
};

// Move DEFAULT_CONFIG outside the hook to prevent re-initialization
const DEFAULT_CONFIG: Partial<MissionValidationConfig> = {
  validationDelayMs: 250,
  maxWaitTimeMs: 3 * 60 * 1000, // 3 minutes
  missionsFetchStatus: ['telegram_follow'],
};

/**
 * Custom hook for mission validation logic.
 *
 * @param {UseMissionValidationParams} params - Parameters for the hook.
 * @returns {UseMissionValidationReturn} - Contains state and handlers for mission validation.
 */
export const useMissionValidation = ({
  mission,
  url,
  title,
  config,
}: UseMissionValidationParams): UseMissionValidationReturn => {
  // Merge default config with provided config using useMemo to memoize
  const mergedConfig = useMemo(
    () => ({
      ...DEFAULT_CONFIG,
      ...config,
    }),
    [config]
  );

  const {
    validationDelayMs,
    validationTimeMs,
    missionTimeMs,
    maxWaitTimeMs,
    missionsFetchStatus,
  } = mergedConfig;

  // Utilities and data
  const utils = useMemo(() => initUtils(), []);
  const rawData = useMemo(() => initDataRaw, []);
  const {
    progress_status: progressStatus,
    id: missionId,
    slug: missionSlug,
  } = mission || {};

  // Initialize state using useReducer
  const [state, dispatch] = useReducer(reducer, {
    isCompleted: progressStatus === 'claimed_reward',
    isValidating: !!getMissionClickTime(title),
    isOpen: false,
  });

  const { isCompleted, isValidating, isOpen } = state;

  // API interactions
  const claimRewardMutation = useClaimMissionReward();
  const { refetch } = useGetMissions({
    enabled: !!rawData,
    variables: { rawData },
  });

  /**
   * Checks if the mission requires fetching the actual status from the server.
   */
  const shouldFetchActualStatus = useCallback(
    (slug: string): boolean => missionsFetchStatus.includes(slug),
    [missionsFetchStatus]
  );

  /**
   * Determines if the mission meets the time requirement.
   */
  const isMissionValid = useCallback(
    (timeDiff: number, slug: string): boolean =>
      timeDiff >= missionTimeMs || shouldFetchActualStatus(slug),
    [missionTimeMs, shouldFetchActualStatus]
  );

  /**
   * Processes the mission by claiming rewards or refetching data.
   */
  const processMission = useCallback(
    async ({
      missionId,
      slug,
      rawData,
    }: {
      missionId: string;
      slug: string;
      rawData: any;
    }) => {
      try {
        if (shouldFetchActualStatus(slug)) {
          await refetch();
          setTimeout(() => dispatch({ type: 'SET_OPEN', payload: true }), validationTimeMs);
        } else {
          await claimRewardMutation.mutateAsync({ missionId, rawData });
        }
      } catch (error) {
        console.error('Error processing mission:', error);
        // Optionally, update state to reflect the error
      }
    },
    // Dependencies are stable and won't cause infinite loops
    [shouldFetchActualStatus, refetch, validationTimeMs, claimRewardMutation]
  );

  /**
   * Handles the mission validation process.
   */
  const handleClaim = useCallback(() => {
    const clickTimeString = getMissionClickTime(title);

    // Start validation animation
    setTimeout(() => dispatch({ type: 'SET_VALIDATING', payload: true }), validationDelayMs);
    setTimeout(() => dispatch({ type: 'SET_VALIDATING', payload: false }), validationTimeMs);

    if (clickTimeString) {
      const clickTime = parseInt(clickTimeString, 10);
      const timeDiff = calculateTimeDiff(clickTime);
      const valid = isMissionValid(timeDiff, missionSlug || '');

      // Update completion status if not fetching from server
      if (!shouldFetchActualStatus(missionSlug || '')) {
        dispatch({ type: 'SET_COMPLETED', payload: valid });
      }

      // Process mission if valid
      if (valid && missionId) {
        processMission({ missionId, slug: missionSlug || '', rawData });
      }

      // Clean up localStorage if mission is completed or max wait time exceeded
      if (valid || timeDiff > (maxWaitTimeMs || 0)) {
        removeMissionClickTime(title);
      }
    }

    // Open modal if not fetching actual status
    if (!shouldFetchActualStatus(missionSlug || '')) {
      setTimeout(() => dispatch({ type: 'SET_OPEN', payload: true }), validationTimeMs);
    }
  }, [
    title,
    validationDelayMs,
    validationTimeMs,
    maxWaitTimeMs,
    isMissionValid,
    missionSlug,
    shouldFetchActualStatus,
    missionId,
    rawData,
    processMission,
  ]);

  /**
   * Handles click events on the mission component.
   */
  const handleClick = useCallback(() => {
    if (!isCompleted) {
      setMissionClickTime(title);
      handleClaim();
    }
    utils.openLink(url);
  }, [isCompleted, title, handleClaim, url, utils]);

  /**
   * Handles focus events to re-validate the mission if necessary.
   */
  const handleFocus = useCallback(() => {
    if (getMissionClickTime(title)) {
      handleClaim();
    }
  }, [title, handleClaim]);

  /**
   * Initial validation check.
   */
  const handleClaimRef = useRef(handleClaim);
  handleClaimRef.current = handleClaim;

  useEffect(() => {
    if (getMissionClickTime(title)) {
      handleClaimRef.current();
    }
    // We only want to run this effect once when the component mounts.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title]);

  /**
   * Event listener setup for window focus.
   */
  useEffect(() => {
    window.addEventListener('focus', handleFocus);
    return () => {
      window.removeEventListener('focus', handleFocus);
    };
  }, [handleFocus]);

  /**
   * Handles closing the modal and refetching mission data.
   */
  const handleClose = useCallback(() => {
    dispatch({ type: 'SET_OPEN', payload: false });
    refetch();
  }, [refetch]);

  return {
    isCompleted,
    isValidating,
    isOpen,
    handleClick,
    handleClose,
  };
};
