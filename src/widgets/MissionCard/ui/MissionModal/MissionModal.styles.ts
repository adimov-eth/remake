import { styled } from '@app/stitches.config';
import { quarkPng } from '@shared/assets';
import { starPng } from '@shared/assets';

export const Content = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

export const Title = styled('div', {
  fontFamily: 'var(--font-pro-display)',
  fontSize: '1.75rem',
  fontWeight: 600,
  textAlign: 'center',
  color: '#fff',
  marginTop: '1.875rem',
  marginBottom: '1.5rem',
});

export const Description = styled('div', {
  fontFamily: 'var(--font-pro-display)',
  fontSize: '1rem',
  lineHeight: '1.25rem',
  textAlign: 'center',
  color: 'rgba(149, 162, 197, 1)',
  marginBottom: '1.875rem',
});

export const Reward = styled('span', {
  display: 'inline-flex',
  alignItems: 'center',
  fontFamily: 'var(--font-mono)',
  fontSize: '3rem',
  fontWeight: 600,
  lineHeight: '3.75rem',
  color: '#fff',
  marginBottom: '1.875rem',
  paddingLeft: '4.375rem',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'left center',
  backgroundSize: '3.75rem',
  variants: {
    variant: {
      quark: {
        backgroundImage: `url(${quarkPng})`,
      },
      star: {
        backgroundImage: `url(${starPng})`,
      },
    },
  },
  defaultVariants: {
    variant: 'quark',
  },
});