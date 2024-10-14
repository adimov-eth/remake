import { styled } from '@app/stitches.config';
import { floatCloseAnimation } from '@app/stitches.config';

export const Root = styled('div', {
  position: 'relative',
  display: 'grid',
  gap: '1.25rem',
  gridTemplateRows: '1fr auto',
  height: '100%',
});

export const TopArea = styled('div', {
  display: 'grid',
  gap: '1.25rem',
  gridAutoFlow: 'row',
  gridAutoRows: 'max-content',
});

export const Illustration = styled('div', {
  animation: `${floatCloseAnimation} 60s ease-in-out infinite`,
});

export const BottomArea = styled('div', {
  position: 'sticky',
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: 1,
  padding: '1rem 0',
});
