import { styled } from '@stitches/react';
import { quarkPng } from '@shared/assets';
import { starPng } from '@shared/assets';

export const Root = styled('div', {
  display: 'inline-flex',
  alignItems: 'center',
  '> * + *': {
    marginLeft: '0.375rem',
  },
});

export const LabelContent = styled('span', {
  paddingLeft: '1.75rem',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'left center',
  backgroundSize: '1.5rem',
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