import { styled } from '@/app/stitches.config';

export const Root = styled('div', {
  background: '#14151E',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: '0.625rem',
  borderRadius: '1rem',
  padding: '1rem',
  minWidth: 0,
});

export const Info = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '0.625rem',
  minWidth: 0,
  flex: 1,
});

export const Content = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '0.75rem',
  minWidth: 0,
  flex: 1,
});

export const Name = styled('div', {
  fontFamily: 'var(--font-pro-display)',
  fontSize: '1rem',
  fontWeight: 600,
  color: '#fff',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  minWidth: 0,
});

export const Rank = styled('div', {
  fontFamily: 'var(--font-pro-display)',
  fontSize: '0.875rem',
  fontWeight: 400,
  color: '#67718C',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  minWidth: 0,
});

export const Balance = styled('div', {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.5rem',
  fontFamily: 'var(--font-mono)',
  fontSize: '0.875rem',
  fontWeight: 600,
  color: '#fff',
  flexShrink: 0,
});

export const BalanceIcon = styled('div', {
  width: '1.5rem',
  height: '1.5rem',
  flexShrink: 0,
});