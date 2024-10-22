import { styled } from '@app/stitches.config';
import { Link } from '@shared/ui/Link';

export const Nav = styled('nav', {
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
  maxWidth: '30rem',
  width: '100%',
});

export const NavList = styled('ul', {
  position: 'relative',
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '1.25rem',
  paddingTop: '0.125rem',
  paddingBottom: '0.125rem',
  listStyle: 'none',
  padding: 0,
  margin: 0,
});

export const NavListItem = styled('li', {
  position: 'relative',
});

export const NavListItemBadge = styled('span', {
  position: 'absolute',
  top: '0.1875rem',
  right: '0.1875rem',
});

export const NavLink = styled(Link, {
  display: 'inline-flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  minWidth: '2.5rem',
  minHeight: '2.5rem',
  // padding: '0.625rem',
  color: '#5D6275',
  variants: {
    active: {
      true: {
        color: '#EBEBEB',
      },
      false: {
        color: '#5D6275',
      },
    },
  },
});

export const NavLinkText = styled('span', {
  fontSize: '0.75rem',
  fontWeight: '400',
  marginTop: '0.3125rem',
});

export const Icon = styled('div', {
  width: '1.75rem',
  height: '1.75rem',
});

export const SwapButton = styled(Link, {
  background: 'linear-gradient(90deg, #1CE7FD 0%, #365AE5 100%)',
  minWidth: '4.375rem',
  minHeight: '4.375rem',
  borderRadius: '9999px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#fff',
});