import React from 'react';
import { useTranslation } from 'react-i18next';
import { quarkPng, starPng } from '@shared/assets';

import { Label } from '@shared/ui/Label';
import * as S from './SwapFormInput.styles';

export type TSwapFormInputCurrency = 'quark' | 'star';
interface ISwapFormInputInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  value: string;
  currency: TSwapFormInputCurrency;
  showMaxButton?: boolean;
  onSetMax?: () => void;
}

const currencyMap: Record<string, string> = {
  'quark': 'QRK',  
  'star': 'STR',
};

export const SwapFormInput: React.FC<ISwapFormInputInputProps> = ({
  label,
  value,
  currency,
  showMaxButton,
  onSetMax,
  ...props
}) => {
  const { t } = useTranslation('global');
  const currencyIcon = currency === 'quark' ? quarkPng : starPng;
  const currencySymbol = currencyMap[currency] || null;

  return (
    <S.InputRow>
      <S.Label>{label}</S.Label>
      <S.InputContainer>
        <S.Input
          type="number"
          inputMode="decimal"
          pattern="[0-9]*"
          value={value}
          placeholder="0"
          {...props}
        />
        <S.CurrencyBlock>
          {showMaxButton && <Label as="button" onClick={onSetMax}>{t('max')}</Label>}
          <Label variant='secondary'>
            {currencySymbol && <img src={currencyIcon} width={18} height={18} />}
            <span>{currencySymbol}</span>
          </Label>
        </S.CurrencyBlock>
      </S.InputContainer>
    </S.InputRow>
  );
};