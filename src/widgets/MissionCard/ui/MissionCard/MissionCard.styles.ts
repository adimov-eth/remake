import { styled, shineAnimation } from '@/app/stitches.config';

import { CloseIcon as CloseIconSVG } from '@shared/assets/icons';

export const Card = styled('div', {
  position: 'relative',
  background: '$cardBackground',
  borderRadius: '$small',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: '$5',
  padding: '$4',

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
      },
      complete: {
        position: 'relative',
      },
      claimed_reward: {
        opacity: 0.5,
        pointerEvents: 'none',
      },
      overdue: {
        opacity: 0.5,
        pointerEvents: 'none',
      },
      available: {},
      unavailable: {
        display: 'none',
      },
      participated_once: {
        opacity: 0.5,
        pointerEvents: 'none',
      },
    },
  },
});

export const Info = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '$4',
});

export const Texts = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$2',
});

export const Title = styled('div', {
  fontFamily: '$proDisplay',
  fontSize: '$large',
  fontWeight: '$semiBold',
  color: '$white',
});

export const Reward = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '$1',
});

export const Open = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '36px',
  height: '36px',
  borderRadius: '$medium',
  background: '$navBackground',
});

export const CompleteRight = styled('div', {
  background: '$navBackground',
  boxShadow: '0px 0px 17px 0px $colors$swapGradientEnd',
  padding: '14px',
  fontFamily: '$proDisplay',
  fontSize: '$small',
  fontWeight: '$medium',
  borderRadius: '$medium',
  color: '$white',
});

export const CloseIcon = styled(CloseIconSVG, {
  '& path': {
    fill: '$red',
  },
});
