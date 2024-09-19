import { styled, pathsAnimation, opacityAnimation, fontAnimation, movementAnimation } from '@app/stitches.config';

export const GlitchyTextWrapper = styled('span', {
    position: 'relative',
    display: 'inline-block',
    '& > *': {
      animation: `${pathsAnimation} 5s step-end infinite`,
    },
    '&::before, &::after': {
      content: 'attr(data-text)',
      position: 'absolute',
      width: '110%',
      zIndex: -1,
    },
    '&::before': {
      animation: [
        `${pathsAnimation} 5s step-end 15s infinite`, 
        `${opacityAnimation} 5s step-end 15s infinite`, 
        `${fontAnimation} 8s step-end 15s infinite`, 
        `${movementAnimation} 10s step-end 15s infinite`
      ].join(','),
    },
    '&::after': {
      animation: [
        `${pathsAnimation} 5s step-end 15s infinite`, 
        `${opacityAnimation} 5s step-end 15s infinite`, 
        `${fontAnimation} 7s step-end 15s infinite`, 
        `${movementAnimation} 8s step-end 15s infinite`
      ].join(','),
    }
})