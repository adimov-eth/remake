import { styled } from '@app/stitches.config';
import EnergyIcon from '@shared/assets/energy.svg?react';

export const Root = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '0.625rem',
  alignItems: 'center',
});

export const Icon = styled(EnergyIcon, {
  marginRight: '0.25rem',
  width: '1.25rem',
  height: '1.25rem',
});

export const Value = styled('span', {
  fontFamily: 'var(--font-mono)',
  fontSize: '0.875rem',
  fontWeight: 600,
  textAlign: 'left',
  color: '#fff',
  opacity: 0.7,
});
  
export const Inner = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '0.25rem',
});

export const Title = styled('span', {
  fontFamily: 'var(--font-pro-display)',
  fontSize: '0.875rem',
  color: '#4E5464',
});