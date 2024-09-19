import { styled } from '@app/stitches.config';

export const Nav = styled('nav', {
  position: 'fixed',
  bottom: 0,
  left: 0,
  right: 0,
  display: 'flex',
  justifyContent: 'center',
  paddingTop: '0.25rem',
  paddingLeft: '0.75rem',
  paddingRight: '0.75rem',
  paddingBottom: '1.75rem',
  borderTop: '1px solid $navBorder',
  borderRadius: '32px 32px 0 0',
  background: '$navBackground',
  boxShadow: '0 4px 24px $navShadow',
  borderImageSource: 'linear-gradient(181.98deg, $navBorderGradientStart 1.46%, $navBorderGradientEnd 98.13%)',
  backdropFilter: 'blur(24px)',
  WebkitBackdropFilter: 'blur(24px)',
});

export const NavList = styled('ul', {
    position: 'relative',
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: '0.125rem',
    paddingBottom: '0.125rem',
    listStyle: 'none',
});

export const NavListItem = styled('li', {});

export const NavLink = styled('a', {
    display: 'inline-flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    color: '$textInactive',
    width: '4.375rem',
    height: '4.375rem',
    padding: '0.625rem',

    '&.active': {
        color: '$textActive',
    },
});

export const NavLinkText = styled('span', {
    fontSize: '0.75rem',
    fontWeight: '400',
    marginTop: '0.3125rem',
})

export const Icon = styled('div', {
  width: '1.75rem',
  height: '1.75rem',
});

export const SwapButton = styled('a', {
  background: 'linear-gradient(90deg, $swapGradientStart 0%, $swapGradientEnd 100%)',
  minWidth: '4.375rem',
  minHeight: '4.375rem',
  borderRadius: '9999px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#fff',
});