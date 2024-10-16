import React from 'react';
import { useTranslation } from 'react-i18next';
import { Currency } from '@app/stores/swap';

import { Label } from '@shared/ui/Label';
import * as S from './SwapFormInput.styles';

interface ISwapFormInputInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  currency: Currency;
  showMaxButton?: boolean;
  onMaxClick?: () => void;
  max: number;
  step: string;
  min: string;
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
  step,
  min
}) => {
  const { t } = useTranslation('global');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <S.InputRow>
      <S.Label>{label}</S.Label>
      <S.InputContainer>
        <S.Input
          type="number"
          inputMode="decimal"
          pattern="[0-9]*"
          value={value}
          onChange={handleChange}
          placeholder="0"
          min={min}
          max={max}
          step={step}
        />
        <S.CurrencyBlock>
          {showMaxButton && <Label as="button" onClick={onMaxClick}>{t('max')}</Label>}
          <Label variant='secondary'>
            <img src={currency.icon} width={18} height={18} />
            <span>{currencyMap[currency.symbol]}</span>
          </Label>
        </S.CurrencyBlock>
      </S.InputContainer>
    </S.InputRow>
  );
};