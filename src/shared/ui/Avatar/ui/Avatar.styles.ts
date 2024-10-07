import { styled } from '@app/stitches.config';
import { progressBarAnimation } from '@app/stitches.config';

export const AvatarWrapper = styled('div', {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'visible',
    position: 'relative',
    borderRadius: '1rem',
});

export const AvatarContainer = styled('div', {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    backgroundColor: 'rgba(28, 31, 48, 1)',
    borderRadius: '1rem',
    position: 'relative',
});

export const ProfileImage = styled('img', {
    objectFit: 'cover',
    borderRadius: '1rem',
});

export const ProgressBar = styled('div', {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: '1rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    animation: `${progressBarAnimation} 2s ease-out forwards`,
});

export const ProgressBarInner = styled('div', {
    backgroundColor: 'transparent',
    borderRadius: '1rem',
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxSizing: 'border-box',
});

export const TimeDisplay = styled('div', {
    position: 'absolute',
    bottom: '0px',
    right: '-6px',
    fontFamily: 'var(--font-pro-display)',
    fontSize: '10px',
    fontWeight: 500,
    borderRadius: '3px',
    padding: '3px',
    color: '#fff',
});