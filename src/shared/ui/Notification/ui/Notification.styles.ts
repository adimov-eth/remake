import { styled, keyframes } from '@stitches/react';
import { notificationBg } from '@shared/assets';

export const Notification = styled('div', {
  '--notification-icon-color': '#fff',
  '--notification-padding': '0.5625rem',

  display: 'flex',
  alignItems: 'center',
  borderRadius: '1.25rem',
  backgroundColor: 'var(--notification-background)',

  variants: {
    type: {
      achievement: {
        '--notification-background': '#5853f9',
        '--notification-icon-background': '#836eff',
      },
      info: {
        '--notification-background': '#6ab3f3',
        '--notification-icon-background': '#418fcc',
      },
      error: {
        '--notification-background': '#971313',
        '--notification-icon-background': '#B53A3A',
      },
      success: {
        '--notification-background': '#2B7409',
        '--notification-icon-background': '#4CAF50',
      },
    }
  }
});

export const NotificationIcon = styled('div', {
  flexShrink: 0,
  width: '2.625rem',
  height: '2.625rem',
  borderRadius: '9999px',
  display: 'inline-flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: 'var(--notification-padding)',
  color: 'var(--notification-icon-color)',
  backgroundColor: 'var(--notification-icon-background)',
});

export const slideInAnimation = keyframes({
  '0%': {
    maxWidth: '0px',
    opacity: '0',
  },
  '100%': {
    maxWidth: '20rem',
    opacity: '1',
  },
});

export const slideOutAnimation = keyframes({
  '0%': {
    maxWidth: '18.75rem',
    opacity: '1',
  },
  '100%': {
    maxWidth: '0px',
    opacity: '0',
  },
});

export const NotificationMessage = styled('div', {
  display: 'flex',
  alignItems: 'center',
  maxWidth: '0',
  opacity: 0,
  animation: `${slideInAnimation} 0.5s ease-out forwards, ${slideOutAnimation} 0.5s ease-in 2.5s forwards`,
  whiteSpace: 'nowrap',
  backgroundImage: `url(${notificationBg})`,
  backgroundPosition: 'center',
  backgroundSize: 'cover',
});

export const NotificationMessageText = styled('div', {
  padding: 'var(--notification-padding) 1rem var(--notification-padding) var(--notification-padding)',
  fontSize: '1rem',
  fontWeight: '400',
  color: '#fff',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
});