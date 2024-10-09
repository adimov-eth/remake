import { styled } from '@app/stitches.config';
import { floatingAnimation } from '@app/stitches.config';

export const IllustrationWrapper = styled('div', {
  animation: `${floatingAnimation} 60s ease-in-out infinite`,
});