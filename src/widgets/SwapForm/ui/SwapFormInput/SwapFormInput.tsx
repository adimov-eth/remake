import React from 'react';
import { useTranslation } from 'react-i18next';
import { Currency } from '@app/stores/swap';

import * as S from './SwapFormInput.styles'

interface ISwapFormInputInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  currency: Currency;
  showMaxButton?: boolean;
  onMaxClick?: () => void;
  max: number;
}

const currencyMap: Record<string, string> = {
  'quarks': 'QRK',
  'stars': 'STR',
};

export const SwapFormInput: React.FC<ISwapFormInputInputProps> = ({
  label,
  value,
  onChange,
  currency,
  showMaxButton,
  onMaxClick,
  max,
}) => {
  const { t } = useTranslation('global');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value)
  };

  return (
    <S.InputRow>
      <S.Label>{label}</S.Label>
      <S.InputContainer>
      <S.Input
        type="text"
        value={value}
        onChange={handleChange}
        placeholder="0"
        max={max}
      />
      {showMaxButton && <S.MaxButton onClick={onMaxClick}>{t('max')}</S.MaxButton>}
      <S.CurrencyBlock>
        <S.IconWrapper>{<img src={currency.icon} />}</S.IconWrapper>
        <span>{currencyMap[currency.symbol]}</span>
      </S.CurrencyBlock>
    </S.InputContainer>
    </S.InputRow>
  )
};