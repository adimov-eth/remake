import { styled, shineAnimation } from '@/app/stitches.config';

export const StatusIcon = styled('div', {
  flexShrink: 0,
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '1.5rem',
  height: '1.5rem',
  color: '#fff',
});

export const Card = styled('div', {
  position: 'relative',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  background: '#14151E',
  borderRadius: '1rem',
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
        [`& ${StatusIcon}`]: {
          color: '#fff',
        },
      },
      claimed_reward: {
        opacity: 0.5,
        pointerEvents: 'none',
        [`& ${StatusIcon}`]: {
          color: '#52B425',
        },
      },
      overdue: {
        opacity: 0.5,
        pointerEvents: 'none',
        [`& ${StatusIcon}`]: {
          color: '#971313',
        },
      },
      participated_once: {
        opacity: 0.5,
        pointerEvents: 'none',
        [`& ${StatusIcon}`]: {
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
});

export const Content = styled('div', {
  margin: '0 0.625rem'
});

export const Title = styled('div', {
  fontFamily: 'var(--font-pro-display)',
  fontSize: '1rem',
  fontWeight: '600',
  color: '#fff',
});

export const Description = styled('div', {
  fontFamily: 'var(--font-pro-display)',
  fontSize: '0.875rem',
  fontWeight: '400',
  lineHeight: '1rem',
  color: 'rgba(121, 128, 172, 1)',
  marginTop: '0.5rem'
});

export const MissionIcon = styled('div', {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '0.625rem',
  borderRadius: '1rem',
  background: 'rgba(28, 31, 48, 1)',
  minWidth: '2.5rem',
  minHeight: '2.5rem',
});