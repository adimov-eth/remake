import { atom } from 'nanostores';
import { CurrencyEnum } from '@shared/services/api/swap/types';
import { quarkPng, starPng } from '@shared/assets';

// TODO удалить после тестирования SwapForm

// Currency types and constants
export type Currency = {
  name: string;
  symbol: CurrencyEnum;
  icon: string; 
};

export const QUARK_CURRENCY: Currency = {
  name: 'Quark',
  symbol: CurrencyEnum.QUARK,
  icon: quarkPng
};

export const STAR_CURRENCY: Currency = {
  name: 'Star',
  symbol: CurrencyEnum.STAR,
  icon: starPng
};

// Swap types and constants
export enum SwapDirection {
  QuarkToStar = 'QuarkToStar',
  StarToQuark = 'StarToQuark',
}

export const SWAP_PAIRS: Record<SwapDirection, { from: Currency; to: Currency }> = {
  [SwapDirection.QuarkToStar]: {
    from: QUARK_CURRENCY,
    to: STAR_CURRENCY,
  },
  [SwapDirection.StarToQuark]: {
    from: STAR_CURRENCY,
    to: QUARK_CURRENCY,
  },
};


type SwapRate = {
    [SwapDirection.QuarkToStar]: number
    [SwapDirection.StarToQuark]: number
}

export const SWAP_RATES: SwapRate = {
  [SwapDirection.QuarkToStar]: 0.001,
  [SwapDirection.StarToQuark]: 900,
};

export const $swapRates = atom<SwapRate>(SWAP_RATES);

export interface SwapState {
  fromValue: string;
  toValue: string;
  direction: SwapDirection;
  step: string;
  min: string;
}

export const $swapState = atom<SwapState>({
  fromValue: '',
  toValue: '',
  direction: SwapDirection.QuarkToStar,
  step: '1',
  min: '100'
});

const convertCurrency = (amount: number, direction: SwapDirection): number => {
  const rate = $swapRates.get()[direction];
  return Number((amount * rate).toFixed(6));
};

export const updateSwapValues = (value: string, input: 'from' | 'to', max: number) => {
  const { direction, step, min } = $swapState.get();
  const numericValue = Math.min(Math.max(parseFloat(value) || 0, 0), max);
  
  const rate = $swapRates.get()[direction];
  let fromValue: number, toValue: number;

  if (input === 'from') {
    fromValue = numericValue;
    toValue = Number((numericValue * rate).toFixed(6));
  } else {
    toValue = numericValue;
    fromValue = rate !== 0 ? Number((numericValue / rate).toFixed(6)) : 0;
  }
  console.log('fromValue', fromValue, 'toValue', toValue);
  $swapState.set({
    direction,
    fromValue: fromValue.toString(),
    toValue: toValue.toString(),
    step,
    min
  });
};

export const toggleSwapDirection = () => {
  const currentState = $swapState.get();
  const newDirection = currentState.direction === SwapDirection.QuarkToStar
    ? SwapDirection.StarToQuark
    : SwapDirection.QuarkToStar;

  const newStep = newDirection === SwapDirection.QuarkToStar ? '1' : '0.1';
  const newMin = newDirection === SwapDirection.QuarkToStar ? '100' : '0.1';
  $swapState.set({
    fromValue: currentState.toValue,
    toValue: currentState.fromValue,
    direction: newDirection,
    step: newStep,
    min: newMin
  });
};

export const setMaxFromValue = (maxValue: number) => {
  if (maxValue < 0) {
    throw new Error('Max value cannot be negative');
  }
  
  const { direction, step, min } = $swapState.get();
  const convertedValue = convertCurrency(maxValue, direction);

  $swapState.set({
    direction,
    fromValue: maxValue.toString(),
    toValue: convertedValue.toString(),
    step,
    min
  });
};