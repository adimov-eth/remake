import { styled } from '@app/stitches.config';
import { progressBarAnimation } from '@app/stitches.config';

export const AvatarWrapper = styled('div', {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'visible',
    position: 'relative',
  });
  
export const AvatarContainer = styled('div', {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    backgroundColor: '$background',
    borderRadius: '40%',
    position: 'relative',
});
  
export const ProfileImage = styled('img', {
    objectFit: 'cover',
    borderRadius: '40%',
});
  
export const ProgressBar = styled('div', {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: '40%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    animation: `${progressBarAnimation} 2s ease-out forwards`,
});
  
export const ProgressBarInner = styled('div', {
    backgroundColor: 'transparent',
    borderRadius: '40%',
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
    fontFamily: '$proDisplay',
    fontSize: '10px',
    fontWeight: 500,
    borderRadius: '3px',
    padding: '3px',
    color: 'white',
});