import { styled } from '@/app/stitches.config';
import { floatingAnimation } from '@app/stitches.config';

export const MissionsContainer = styled('div', {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
});

export const MissionCards = styled('div', {
    display: 'flex',
    flexDirection: 'column',
    gap: '$3',
});

export const IllustrationWrapper = styled('div', {
    height: '160px',
    width: '148px',
    position: 'relative',
    animation: `${floatingAnimation} 60s ease-in-out infinite`,
    '& img': {
        position: 'absolute',
        top: '0',
        left: '0',
    }
});