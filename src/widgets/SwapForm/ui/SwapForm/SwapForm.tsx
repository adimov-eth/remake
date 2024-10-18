import { FC, useState } from 'react';
import { useStore } from '@nanostores/react';
import { useTranslation } from 'react-i18next';
import { SwapDirection } from '@app/stores/swap';
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

const swapRatesMap: Record<SwapDirection, number> = {
  [SwapDirection.QuarkToStar]: 0.001,
  [SwapDirection.StarToQuark]: 900,
};

interface SwapState {
  direction: SwapDirection;
  fromCurrency: CurrencyEnum;
  fromMax: number;
  fromMin: string;
  fromStep: string;
  fromValue: string;
  toCurrency: CurrencyEnum;
  toMax: number;
  toMin: string;
  toStep: string;
  toValue: string;
}

export const SwapForm: FC = () => {
  const rawData = initDataRaw || '';
  const gameState = useStore($gameState);
  const { data: userData, isLoading: isUserDataLoading } = useGetUserData({ enabled: !!rawData, variables: { rawData } });
  const { syncedQuarks, syncedStars } = useSyncedValues(userData, gameState);
  
  const { t } = useTranslation('global');
  const [swapState, setSwapState] = useState<SwapState>({
    direction: SwapDirection.QuarkToStar,
    fromCurrency: CurrencyEnum.QUARK,
    fromMax: syncedQuarks,
    fromMin: '100',
    fromStep: '100',
    fromValue: '',
    toCurrency: CurrencyEnum.STAR,
    toMax: syncedStars,
    toMin: '0.1',
    toStep: '0.1',
    toValue: '',
  });

  const convertCurrency = (amount: number): number => {
    const rate = swapRatesMap[swapState.direction];
    return Number((amount * rate).toFixed(6));
  };

  const updateSwapValues = (value: string, id: string) => {
    const max = swapState.direction === SwapDirection.QuarkToStar ? syncedQuarks : syncedStars;
    const numericValue = Math.min(Math.max(parseFloat(value) || 0, 0), max);
    
    const rate = swapRatesMap[swapState.direction];
    let fromValue: number, toValue: number;

    if (swapState.direction === SwapDirection.QuarkToStar) {
      switch (id) {
      case 'from':
        fromValue = numericValue;
        toValue = Number((numericValue * rate).toFixed(6));
        break;
      case 'to':
        toValue = numericValue;
        fromValue = Number((numericValue / rate).toFixed(6));
        break;
      default:
        throw new Error('Invalid input type');
      }
    } else {
      switch (id) {
      case 'from':
        fromValue = numericValue;
        toValue = Number((numericValue / rate).toFixed(6));
        break;
      case 'to':
        toValue = numericValue;
        fromValue = Number((numericValue * rate).toFixed(6));
        break;
      default:
        throw new Error('Invalid input type');
      }
    }

    setSwapState(prevState => ({
      ...prevState,
      fromValue: fromValue.toString(),
      toValue: toValue.toString(),
    }));
  };

  const onSuccess = () => {
    updateSwapValues('', 'from');
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
    updateSwapValues(e.target.value, e.target.id);
  };

  const handleChangeDirection = () => {
    setSwapState(prevState => {
      const newDirection = prevState.direction === SwapDirection.QuarkToStar
        ? SwapDirection.StarToQuark
        : SwapDirection.QuarkToStar;

      return {
        direction: newDirection,
        fromCurrency: prevState.toCurrency,
        fromMax: prevState.toMax,
        fromMin: prevState.toMin,
        fromStep: prevState.toStep,
        fromValue: prevState.toValue,
        toCurrency: prevState.fromCurrency,
        toMax: prevState.fromMax,
        toMin: prevState.fromMin,
        toStep: prevState.fromStep,
        toValue: prevState.fromValue,
      };
    });
  };

  const handleSetMax = () => {
    const maxValue = swapState.direction === SwapDirection.QuarkToStar ? syncedQuarks : syncedStars;

    if (maxValue < 0) throw new Error('Max value cannot be negative');
    
    const convertedValue = convertCurrency(maxValue);

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
            step={swapState.fromStep}
            min={swapState.fromMin}
            max={swapState.fromMax}
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
            min={swapState.toMin}
            max={swapState.toMax}
            step={swapState.toStep}
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
