import { styled } from '@stitches/react';
import { Link } from '@shared/ui/Link/ui/Link';

export const Root = styled(Link, {
  display: 'flex',
  alignItems: 'center',
});

export const UserInfo = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  marginLeft: '0.625rem',
});

export const UserName = styled('span', {
  fontSize: '0.75rem',
  fontWeight: 600,
  color: '#fff',
});

export const UserRank = styled('span', {
  fontSize: '0.75rem',
  fontWeight: 500,
  color: 'rgba(81, 94, 128, 1)',
  marginTop: '0.5rem',
});