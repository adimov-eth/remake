import { styled } from '@/app/stitches.config';

export const StatusIcon = styled('div', {
  flexShrink: 0,
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '1.5rem',
  height: '1.5rem',
  color: '#fff',
  variants: {
    variant: {
      success: {
        color: '#52B425',
      },
      danger: {
        color: '#971313',
      },
    },
  },
});