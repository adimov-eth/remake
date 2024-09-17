import React from 'react';
import { useTranslation } from 'react-i18next';
// Define the Currency type
import { Currency } from '@app/stores/swap';

interface CurrencyInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  currency: Currency;
  showMaxButton?: boolean;
  onMaxClick?: () => void;
  max: number;
}

const S: Record<string, string> = {
  'quarks': 'QRK',
  'stars': 'STR',
};

const CurrencyInput: React.FC<CurrencyInputProps> = ({
  label,
  value,
  onChange,
  currency,
  showMaxButton,
  onMaxClick,
  max,
}) => {
  const { t } = useTranslation('global');

  return (
    <InputRow>
      <Label>{label}</Label>
      <InputContainer>
      <Input
        type="text"
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
        placeholder="0"
        max={max}
      />
      {showMaxButton && <MaxButton onClick={onMaxClick}>{t('max')}</MaxButton>}
      <CurrencyBlock>
        <IconWrapper>{<img src={currency.icon} />}</IconWrapper>
        <span>{S[currency.symbol]}</span>
      </CurrencyBlock>
    </InputContainer>
    </InputRow>
  )
};

export default CurrencyInput;

import { styled } from '@/app/stitches.config';

const InputRow = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: 'rgba(43, 46, 69, 0.5)',
  padding: '16px',
  borderRadius: '8px',
  width: '100%',
  marginBottom: '10px',
});

const Label = styled('span', {
  color: '#9ca3af',
  fontSize: '16px',
  marginBottom: '8px',
});

const InputContainer = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
});

const Input = styled('input', {
  width: '60%',
  textAlign: 'left',
  background: 'none',
  border: 'none',
  color: '#fff',
  fontSize: '24px',
  marginRight: '8px',

  '&::placeholder': {
    color: '#9ca3af',
  },

  '&:focus': {
    outline: 'none',
  },
});

const MaxButton = styled('button', {
  backgroundColor: '#365ae5',
  color: '#fff',
  border: 'none',
  borderRadius: '8px',
  padding: '4px 12px',
  cursor: 'pointer',
  fontSize: '14px',
  marginRight: '8px',
});

const CurrencyBlock = styled('div', {
  display: 'flex',
  alignItems: 'center',
  backgroundColor: 'rgba(43, 46, 69, 0.7)',
  padding: '4px 14px 4px 8px',
  borderRadius: '9999px',
  maxWidth: '30%',
  width: 'max-content',

  '& span': {
    color: 'white',
  },
});

const IconWrapper = styled('span', {
  marginRight: '4px',
  width: '24px',
  height: '24px',
});
