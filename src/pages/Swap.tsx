import React, { useCallback, useMemo } from 'react';
import * as S from './Swap.style';
import { useStore } from '@nanostores/react';
import { initDataRaw } from '@/stores/telegram';
import { queryClient } from '@/services/api/queryClient';
import { useCreateSwap } from '@/services/api/swap/model';
import { useGetUserData } from '@/services/api/user/model';
import { $gameState } from '@/stores/state';
import CurrencyInput from '@/components/CurrencyInput';
import { Loader } from '@/components/Loader/Loader';
import { ClickerState } from '@/services/websocket/clicker';
import { UserResponseData } from '@/services/api/user/types';
import { useTranslation } from 'react-i18next';

import {
  $swapState,
  SwapDirection,
  SWAP_PAIRS,
  updateSwapValues,
  toggleSwapDirection,
  setMaxFromValue,
} from '@/stores/swap';

// Improved custom hook with proper typing
const useSyncedValues = (
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

const Swap: React.FC = () => {
  const rawData = initDataRaw || '';
  const gameState = useStore($gameState);
  const { fromValue, toValue, direction } = useStore($swapState);
  // const connectionStatus = useStore($connectionStatus);

  const { t: tPages } = useTranslation('pages');
  const { t: tGlobal } = useTranslation('global');

  const { data: userData, isLoading: isUserDataLoading } = useGetUserData({
    enabled: !!rawData,
    variables: { rawData },
  });

  const { syncedQuarks, syncedStars } = useSyncedValues(userData, gameState);

  const { mutateAsync: swapMutation, isPending: isSwapPending } = useCreateSwap();

  const currentPair = useMemo(() => SWAP_PAIRS[direction], [direction]);

  const handleValueChange = useCallback(
    (value: string, input: 'from' | 'to') => {
      const maxValue = direction === SwapDirection.QuarkToStar ? syncedQuarks : syncedStars;
      updateSwapValues(value, input, maxValue);
    },
    [syncedQuarks, syncedStars, direction]
  );

  const handleSwapDirectionToggle = useCallback(() => {
    toggleSwapDirection();
  }, []);

  const handleSwapClick = useCallback(async () => {
    const amount = parseFloat(fromValue);
    if (!amount) return;

    try {
      await swapMutation(
        {
          rawData,
          body: {
            amount: String(amount),
            currency: currentPair.from.symbol,
          },
        },
        {
          onSuccess: () => {
            updateSwapValues('', 'from', 0);
            queryClient.invalidateQueries({ queryKey: ['get/missions'] });
          },
        }
      );
    } catch (error) {
      console.error('Error creating swap:', error);
      // TODO: Implement proper error handling (e.g., show error message to user)
    }
  }, [swapMutation, currentPair.from.symbol, fromValue, rawData]);

  const isLoading = isUserDataLoading; //|| isSwapPending || connectionStatus !== 'online';

  const INDICATOR: Record<SwapDirection, string> = {
    QuarkToStar: tPages('swap.exchange_quark'),
    StarToQuark: tPages('swap.exchange_star'),
  };

  const [top, bottom] = useMemo(
    () =>
      direction === SwapDirection.QuarkToStar
        ? [syncedQuarks, syncedStars]
        : [syncedStars, syncedQuarks],
    [direction, syncedQuarks, syncedStars]
  );

  if (isLoading) {
    return <Loader speed="fast" />;
  }

  return (
    <>
      <S.Inputs>
        <CurrencyInput
          label={tGlobal('sell')}
          value={fromValue}
          onChange={value => handleValueChange(value, 'from')}
          currency={currentPair.from}
          showMaxButton
          onMaxClick={() => setMaxFromValue(top)}
          max={top}
        />
        <S.ToggleButton onClick={handleSwapDirectionToggle}>
          <S.SwapIcon />
        </S.ToggleButton>
        <CurrencyInput
          label={tGlobal('buy')}
          value={toValue}
          onChange={value => handleValueChange(value, 'to')}
          currency={currentPair.to}
          max={bottom}
        />
      </S.Inputs>
      <S.SwapButton
        variant="gradientFilled"
        onClick={handleSwapClick}
        disabled={parseFloat(fromValue) === 0}
      >
        {tGlobal('swap')}
      </S.SwapButton>
      <S.DirectionIndicator>{INDICATOR[direction]}</S.DirectionIndicator>
    </>
  );
};

export default Swap;
