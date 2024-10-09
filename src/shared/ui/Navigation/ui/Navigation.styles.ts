import { styled } from '@app/stitches.config';
import { Link } from '@shared/ui/Link';

export const Nav = styled('nav', {
  display: 'flex',
  justifyContent: 'center',
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
  width: '4.375rem',
  height: '4.375rem',
  padding: '0.625rem',
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