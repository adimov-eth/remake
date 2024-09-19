import { styled } from '@app/stitches.config';
import { floatingAnimation } from '@app/stitches.config';

export const Cards = styled('div', {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '0.75rem',
})

export const IllustrationWrapper = styled('div', {
    animation: `${floatingAnimation} 60s ease-in-out infinite`,
});