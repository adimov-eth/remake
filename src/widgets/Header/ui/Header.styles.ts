import { styled } from '@app/stitches.config';

export const Header = styled('header', {
    paddingTop: '0.25rem',
    paddingLeft: '0.75rem',
    paddingRight: '0.75rem',
    paddingBottom: '1.75rem',
    borderTop: '1px solid $navBorder',
    borderRadius: '2rem 2rem 0 0',
    background: '$navBackground',
    boxShadow: '0 0.25rem 1.5rem $navShadow',
    borderImageSource: 'linear-gradient(181.98deg, $navBorderGradientStart 1.46%, $navBorderGradientEnd 98.13%)',
    backdropFilter: 'blur(1.5rem)',
    WebkitBackdropFilter: 'blur(1.5rem)',
});