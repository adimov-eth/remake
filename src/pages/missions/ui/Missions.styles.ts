import { styled } from '@/app/stitches.config';
import { floatingAnimation } from '@app/stitches.config';

export const IllustrationWrapper = styled('div', {
  height: '160px',
  width: '148px',
  position: 'relative',
  animation: `${floatingAnimation} 60s ease-in-out infinite`,
  '& img': {
    position: 'absolute',
    top: '0',
    left: '0',
  }
});