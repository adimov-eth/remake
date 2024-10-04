import { styled } from '@/app/stitches.config';
import { Button } from '@/shared/ui/Button';

export const Inputs = styled('div', {
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  marginTop: '2.5rem'
});

export const ToggleButton = styled('div', {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '2.75rem',
  height: '2.75rem',
});

export const Icon = styled('div', {
  fill: '#fff',
  width: '1.5rem',
  height: '1.5rem',
});

export const DirectionIndicator = styled('div', {
  textAlign: 'center',
  margin: '625rem 0',
  color: '#9ca3af',
  fontSize: '0.875rem',
});

export const SwapButton = styled(Button, {
  margin: '1.25rem 0'
});