import React from 'react';
import { useTranslation } from 'react-i18next';
import { Currency } from '@app/stores/swap';

import { Label } from '@shared/ui/Label';
import * as S from './SwapFormInput.styles';

interface ISwapFormInputInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  value: string;
  currency: Currency;
  showMaxButton?: boolean;
  onMaxClick?: () => void;
}

const currencyMap: Record<string, string> = {
  'quarks': 'QRK',
  'stars': 'STR',
};

export const SwapFormInput: React.FC<ISwapFormInputInputProps> = ({
  label,
  value,
  currency,
  showMaxButton,
  onMaxClick,
  ...props
}) => {
  const { t } = useTranslation('global');

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