import { styled, shineAnimation } from '@/app/stitches.config';

export const CardIcon = styled('div', {
  display: 'block',
  width: '1.5rem',
  height: '1.5rem',
});

export const Card = styled('div', {
  position: 'relative',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  background: '#14151E',
  borderRadius: '$small',
  padding: '1rem',

  variants: {
    status: {
      in_progress: {
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
        [`& ${CardIcon}`]: {
          color: '#fff',
        },
      },
      claimed_reward: {
        opacity: 0.5,
        pointerEvents: 'none',
        [`& ${CardIcon}`]: {
          color: '#52B425',
        },
      },
      overdue: {
        opacity: 0.5,
        pointerEvents: 'none',
        [`& ${CardIcon}`]: {
          color: '#971313',
        },
      },
      participated_once: {
        opacity: 0.5,
        pointerEvents: 'none',
        [`& ${CardIcon}`]: {
          color: '#971313',
        },
      },
      available: {},
      unavailable: {
        display: 'none',
      },
      not_started: {},
      complete: {},
    },
  },
});

export const Info = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '1rem',
});

export const Content = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '0.625rem',
});

export const Title = styled('div', {
  fontFamily: 'var(--font-pro-display)',
  fontSize: '1rem',
  fontWeight: '600',
  color: '$white',
});

export const LabelAvailable = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '2.25rem',
  height: '2.25rem',
  borderRadius: '$medium',
  background: '$navBackground',
});

export const LabelComplete = styled('div', {
  background: '$navBackground',
  boxShadow: '0px 0px 17px 0px $colors $swapGradientEnd',
  padding: '0.875rem',
  fontFamily: 'var(--font-pro-display)',
  fontSize: '0.875rem',
  fontWeight: '500',
  borderRadius: '$medium',
  color: '$white',
});
