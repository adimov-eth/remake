import { FC, useState } from 'react';
import { useStore } from '@nanostores/react';
import { useTranslation } from 'react-i18next';
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

enum CurrencyEnum {
  QUARK = 'quarks',
  STAR = 'stars',
}

enum SwapDirection {
  QuarkToStar = 'QuarkToStar',
  StarToQuark = 'StarToQuark',
}

const swapRatesMap: Record<SwapDirection, number> = {
  [SwapDirection.QuarkToStar]: 0.001,
  [SwapDirection.StarToQuark]: 900,
};

interface SwapState {
  direction: SwapDirection;
  fromValue: string;
  toValue: string;
}

export const SwapForm: FC = () => {
  const { t } = useTranslation('global');
  const rawData = initDataRaw || '';
  const gameState = useStore($gameState);
  const { data: userData, isLoading: isUserDataLoading } = useGetUserData({ enabled: !!rawData, variables: { rawData } });
  const { syncedQuarks, syncedStars } = useSyncedValues(userData, gameState);
  const [swapState, setSwapState] = useState<SwapState>({
    direction: SwapDirection.QuarkToStar,
    fromValue: '',
    toValue: '',
  });

  const onSuccess = () => {
    setSwapState(prevState => ({
      ...prevState,
      fromValue: '',
      toValue: '',
    }));
    setTimeout(() => queryClient.invalidateQueries({ queryKey: ['get/missions'] }), 2000);
  };

  const onError = (error: unknown) => {
    ErrorNotification(t('something_went_wrong'));
    console.error('Error creating swap:', error);
  };

  const { mutate: swapMutation, isPending: isSwapPending, isSuccess: isSwapSuccess } = useCreateSwap({ onSuccess, onError });
  const isSubmitDisabled = !parseFloat(swapState.fromValue) || isSwapPending;
  const isQuarkToStarDirection = swapState.direction === SwapDirection.QuarkToStar;
  const isLoading = isUserDataLoading;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const amount = parseFloat(swapState.fromValue);
    if (!amount) return;

    swapMutation({ rawData, body: { amount: String(amount), currency: isQuarkToStarDirection ? CurrencyEnum.QUARK : CurrencyEnum.STAR } });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const max = swapState.direction === SwapDirection.QuarkToStar ? syncedQuarks : syncedStars;
    const clampedValue = Math.min(Math.max(parseFloat(e.target.value) || 0, 0), max);
    
    const rate = swapRatesMap[swapState.direction];
    let fromValue: number, toValue: number;

    if (e.target.id === 'from') {
      fromValue = clampedValue;
      toValue = Number((clampedValue * rate).toFixed(6));
    }

    if (e.target.id === 'to') {
      fromValue = Number((clampedValue / rate).toFixed(6));
      toValue = clampedValue;
    }

    setSwapState(prevState => ({
      ...prevState,
      fromValue: fromValue.toString(),
      toValue: toValue.toString(),
    }));
  };

  const handleChangeDirection = () => {
    setSwapState(prevState => {
      const newDirection = prevState.direction === SwapDirection.QuarkToStar
        ? SwapDirection.StarToQuark
        : SwapDirection.QuarkToStar;

      return {
        direction: newDirection,
        fromValue: prevState.toValue,
        toValue: prevState.fromValue,
      };
    });
  };

  const handleSetMax = () => {
    const maxValue = isQuarkToStarDirection ? syncedQuarks : syncedStars;

    if (maxValue < 0) throw new Error('Max value cannot be negative');
    
    const rate = swapRatesMap[swapState.direction];
    const convertedValue = Number((maxValue * rate).toFixed(6));

    setSwapState(prevState => ({
      ...prevState,
      fromValue: maxValue.toString(),
      toValue: convertedValue.toString(),
    }));
  };

  if (isLoading) return <Loader speed="fast" />;
  
  return (
    <>
      <form onSubmit={handleSubmit}>
        <S.Inputs>
          <SwapFormInput
            id="from"
            label={t('sell')}
            showMaxButton
            value={swapState.fromValue}
            currency={isQuarkToStarDirection ? 'quark' : 'star'}
            step={isQuarkToStarDirection ? '100' : '0.1'}
            min={isQuarkToStarDirection ? '100' : '0.1'}
            max={isQuarkToStarDirection ? syncedQuarks : syncedStars}
            onChange={handleChange}
            onSetMax={handleSetMax}
          />
          <S.ToggleButton onClick={handleChangeDirection}>
            <Button rounded="full" shine>
              <S.Icon as={SwapIcon} />
            </Button>
          </S.ToggleButton>
          <SwapFormInput
            id="to"
            label={t('buy')}
            value={swapState.toValue}
            currency={isQuarkToStarDirection ? 'star' : 'quark'}
            min={isQuarkToStarDirection ? '0.1' : '100'}
            max={isQuarkToStarDirection ? syncedStars : syncedQuarks}
            step={isQuarkToStarDirection ? '0.1' : '100'}
            onChange={handleChange}
          />
        </S.Inputs>
        <S.SwapButton
          type="submit"
          variant="primary"
          loading={isSwapPending}
          disabled={isSubmitDisabled}
        >
          {t('swap')}
        </S.SwapButton>
      </form>
      {(isQuarkToStarDirection && isSwapSuccess) && (
        <>
          <ExactConversion quarks={parseInt(swapState.fromValue)} />
          <PalindromeConverter quarks={parseInt(swapState.fromValue)} />
        </>
      )}
    </>
  );
};
