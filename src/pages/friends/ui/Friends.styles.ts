import { styled } from '@app/stitches.config';
import { floatCloseAnimation, floatFarAnimation } from '@app/stitches.config';

export const Illustration = styled('div', {
    height: '160px',
    width: '148px',
    position: 'relative',
  });
  
export const FriendImage = styled('img', {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 1,
    variants: {
      position: {
        close: {
          animation: `${floatCloseAnimation} 60s ease-in-out infinite`,
          zIndex: 2,
          width: '103px',
          height: '143px',
          left: '-5px',
        },
        far: {
          width: '76px',
          height: '100px',
          top: '20px',
          left: '55px',
          opacity: 0.9,
          animation: `${floatFarAnimation} 45s ease-in-out infinite`,
        },
      },
    },
});