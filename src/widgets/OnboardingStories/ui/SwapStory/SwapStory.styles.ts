import { styled } from '@app/stitches.config';
import { SwapCurrencyIcon } from '@shared/assets/icons';

export const Icon = styled('div', {
  width: '1.125rem',
  height: '1.125rem',
});

export const Root = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '0.625rem',
  marginTop: 'auto',
  paddingTop: '1.5rem',
  paddingBottom: '10rem',
  width: '100%',
});

export const Input = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  width: '100%',
  padding: '1.25rem 1rem',
  borderRadius: '0.75rem',
  background: 'rgba(13, 15, 32, 0.90)',
  boxShadow: '0px 0px 20px 0px rgba(37, 211, 255, 0.70)',
});

export const InputLabel = styled('div', {
  color: '#FFF',
  fontSize: '1rem',
  fontStyle: 'normal',
  fontWeight: 400,
});

export const InputControl = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  color: '#FFF',
  fontSize: '1.5rem',
  fontStyle: 'normal',
  fontWeight: 400,
});
  
export const InputValue = styled('span', {
  fontSize: '1.5rem',
  color: 'rgba(255, 255, 255, 1)',
});

export const InputPostfix = styled('div', {
  display: 'flex',
  alignItems: 'center',
});

export const Currency = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '0.25rem',
  background: '#1C1F30',
  borderRadius: '0.75rem',
  padding: '0.5rem 0.625rem',
});

export const SwapIcon = styled(SwapCurrencyIcon, {
  position: 'relative',
  margin: '-1.5625rem 0',
  width: '2.5rem',
  height: '2.5rem',
  fill: 'rgba(255, 255, 255, 1)',
});

export const CurrencyName = styled('span', {
  fontSize: '0.75rem',
  color: 'rgba(255, 255, 255, 1)',
});