import { styled } from '@app/stitches.config';
import { floatingAnimation } from '@app/stitches.config';

export const Cards = styled('div', {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    columnGap: '0.75rem',
    rowGap: '1rem',
})

export const IllustrationWrapper = styled('div', {
    animation: `${floatingAnimation} 60s ease-in-out infinite`,
});