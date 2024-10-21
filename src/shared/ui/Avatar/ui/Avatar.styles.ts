import { styled } from '@app/stitches.config';
import { progressBarAnimation } from '@app/stitches.config';

export const AvatarWrapper = styled('div', {
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  overflow: 'visible',
  borderRadius: '1rem',
});

export const AvatarContainer = styled('div', {
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  overflow: 'hidden',
  backgroundColor: 'rgba(28, 31, 48, 1)',
  borderRadius: '1rem',
  // border: '3px solid rgb(20, 21, 30)',
});

export const ProfileImage = styled('img', {
  objectFit: 'cover',
  borderRadius: '1rem',
});

export const ProgressBar = styled('div', {
  position: 'absolute',
  width: '100%',
  height: '100%',
  borderRadius: '1.1875rem', // border-radius + border-Width
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  animation: `${progressBarAnimation} 2s ease-out forwards`,
});

export const ProgressBarInner = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  height: '100%',
  borderRadius: '1rem',
  backgroundColor: 'transparent',
});

export const TimeDisplay = styled('div', {
  position: 'absolute',
  bottom: '0',
  right: '-0.375rem',
  fontSize: '0.625rem',
  fontWeight: 500,
  lineHeight: 1,
  borderRadius: '0.1875rem',
  padding: '0.1875rem',
  color: '#fff',
});