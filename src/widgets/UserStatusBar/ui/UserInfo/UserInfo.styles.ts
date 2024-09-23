import { styled } from '@stitches/react';
import { Link } from '@shared/ui/Link/ui/Link';
import { AutoSizeText } from '@shared/ui/AutoSizeText';

export const UserLink = styled(Link, {
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
});

export const UserInfoWrapper = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
});

export const UserName = styled(AutoSizeText, {
  fontFamily: 'var(--font-pro)',
  fontSize: '12px',
  fontWeight: 590,
  color: 'white',
});

export const UserRank = styled('div', {
  fontFamily: 'var(--font-pro)',
  fontSize: '12px',
  fontWeight: 590,
  color: '#3B4660',
});