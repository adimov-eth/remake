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

export const LoaderText = styled('div', {
  fontFamily: 'var(--font-pro-display)',
  fontSize: '0.875rem',
  fontWeight: '600',
  color: '#fff',
});