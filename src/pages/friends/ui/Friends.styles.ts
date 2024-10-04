import { styled } from '@app/stitches.config';
import { floatCloseAnimation } from '@app/stitches.config';

export const Illustration = styled('div', {
  animation: `${floatCloseAnimation} 60s ease-in-out infinite`,
});