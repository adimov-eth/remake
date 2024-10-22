import { styled, shineAnimation } from '@app/stitches.config';

export const Card = styled('div', {
  position: 'relative',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  background: '#14151E',
  borderRadius: '1rem',
  padding: '1rem',
  width: '100%',
  variants: {
    variant: {
      default: {},
      active: {
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: '-100%',
          width: '100%',
          height: '100%',
          background: 'linear-gradient(120deg, transparent, rgba(255, 255, 255, 0.2), transparent)',
          animation: `${shineAnimation} 4s ease-in-out infinite`,
        },
      },
      disabled: {
        opacity: 0.5,
        pointerEvents: 'none',
      },
    },
  },
});

export const Info = styled('div', {
  display: 'flex',
  alignItems: 'center',
});

export const Content = styled('div', {
  textAlign: 'left',
  marginLeft: '1rem',
  marginRight: '0.625rem',
});

export const Title = styled('div', {
  fontSize: '1rem',
  fontWeight: '600',
  color: '#fff',
});

export const Description = styled('div', {
  fontSize: '0.875rem',
  fontWeight: '400',
  lineHeight: '1rem',
  color: 'rgba(121, 128, 172, 1)',
  marginTop: '0.5rem'
});
