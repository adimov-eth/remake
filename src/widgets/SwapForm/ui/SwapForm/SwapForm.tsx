import React, { useCallback, useMemo } from 'react';
import { useStore } from '@nanostores/react';
import { useTranslation } from 'react-i18next';
import {
  $swapState,
  SwapDirection,
  SWAP_PAIRS,
  updateSwapValues,
  toggleSwapDirection,
  setMaxFromValue,
} from '@app/stores/swap';
import { initDataRaw } from '@app/stores/telegram';
import { $gameState } from '@app/stores/state';

import { queryClient } from '@shared/services/api/queryClient';
import { useCreateSwap } from '@shared/services/api/swap/model';
import { useGetUserData } from '@shared/services/api/user/model';
import { useSyncedValues } from '@shared/hooks/useSyncedValues';

import { ErrorNotification } from '@shared/ui/Notification';
import { Loader } from '@shared/ui/Loader';
import { Button } from '@shared/ui/Button';
import { ExactConversion } from '@features/ExactConversion';
import { PalindromeConverter } from '@features/PalindromeConverter';
import { SwapFormInput } from '../SwapFormInput/SwapFormInput';

import * as S from './SwapForm.style';
import SwapIcon from '@shared/assets/swap-currency.svg?react';

// TODO требуется полный рефакторинг

export const SwapForm: React.FC = () => {
  const rawData = initDataRaw || '';
  const gameState = useStore($gameState);
  const { t: tGlobal } = useTranslation('global');
  // const connectionStatus = useStore($connectionStatus);
  const { fromValue, toValue, direction, step: swapStep } = useStore($swapState);
  const { data: userData, isLoading: isUserDataLoading } = useGetUserData({ enabled: !!rawData, variables: { rawData } });
  const { syncedQuarks, syncedStars } = useSyncedValues(userData, gameState);
  const currentPair = useMemo(() => SWAP_PAIRS[direction], [direction]);
  const isQuarkToStarDirection = useMemo(() => direction === SwapDirection.QuarkToStar, [direction]);
 
  const handleSwapSuccess = () => {
    updateSwapValues('', 'from', 0);
    setTimeout(() => queryClient.invalidateQueries({ queryKey: ['get/missions'] }), 2000); // delay so swap can be processed before missions are updated
  };

  const handleSwapError = (error: unknown) => {
    ErrorNotification(tGlobal('something_went_wrong'));
    console.error('Error creating swap:', error);
  };

  const { mutate: swapMutation, isPending: isSwapPending, isSuccess: isSwapSuccess } = useCreateSwap({
    onSuccess: handleSwapSuccess,
    onError: handleSwapError,
  });

  const handleChange = (value: string, input: 'from' | 'to') => {
    const maxValue = direction === SwapDirection.QuarkToStar ? syncedQuarks : syncedStars;
    updateSwapValues(value, input, maxValue);
  };

  const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const amount = parseFloat(fromValue);
    if (!amount) return;

    swapMutation({ rawData, body: { amount: String(amount), currency: currentPair.from.symbol } });
  }, [swapMutation, currentPair.from.symbol, fromValue, rawData]);

  const isLoading = isUserDataLoading; //|| isSwapPending || connectionStatus !== 'online';

  const [top, bottom] = useMemo(() => {
    return direction === SwapDirection.QuarkToStar
      ? [syncedQuarks, syncedStars]
      : [syncedStars, syncedQuarks];
  }, [direction, syncedQuarks, syncedStars]);

  if (isLoading) return <Loader speed="fast" />;

  const submitDisabled = !parseFloat(fromValue) || isSwapPending;
  
  return (
    <>
      <form onSubmit={handleSubmit}>
        <S.Inputs>
          <SwapFormInput
            showMaxButton
            onChange={e => handleChange(e.target.value as string, 'from')}
            label={tGlobal('sell')}
            value={fromValue}
            onMaxClick={() => setMaxFromValue(top)}
            currency={currentPair.from}
            max={top}
            step={swapStep}
          />
          <S.ToggleButton onClick={toggleSwapDirection}>
            <Button rounded="full" shine>
              <S.Icon as={SwapIcon} />
            </Button>
          </S.ToggleButton>
          <SwapFormInput
            onChange={e => handleChange(e.target.value, 'to')}
            label={tGlobal('buy')}
            value={toValue}
            currency={currentPair.to}
            step={swapStep}
            max={bottom}
          />
        </S.Inputs>
        <S.SwapButton
          type="submit"
          variant="primary"
          loading={isSwapPending}
          disabled={submitDisabled}
        >
          {tGlobal('swap')}
        </S.SwapButton>
      </form>
      {(isQuarkToStarDirection && isSwapSuccess) && <ExactConversion quarks={parseInt(fromValue)} />}
      {(isQuarkToStarDirection && isSwapSuccess) && <PalindromeConverter quarks={parseInt(fromValue)} />}
    </>
  );
};