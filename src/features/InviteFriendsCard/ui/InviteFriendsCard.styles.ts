import { styled } from '@app/stitches.config';

export const Details = styled('details', {
  // pointerEvents: 'none',
});

export const DetailsSummary = styled('summary', {
  display: 'flex',
  alignItems: 'center',
  padding: '0.5rem 0.75rem',
  borderRadius: '1rem',
  border: '1px dashed rgba(87, 104, 157, 0.3)',
  backgroundColor: 'rgba(18, 22, 35, 1)',
});

export const DetailsContent = styled('div', {
  // display: 'grid',
  // gridTemplateRows: '0fr',
  // transition: 'all 0.3s ease-in-out',
  paddingTop: '1.25rem',
});

export const Image = styled('img', {
  position: 'relative',
  width: '3.75rem',
  height: '3.75rem',
});

export const Content = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  marginLeft: '0.75rem',
});

export const Title = styled('h3', {
  fontFamily: 'var(--font-pro-display)',
  fontSize: '1rem',
  fontWeight: '600',
  lineHeight: '1.25rem',
  color: '#fff',
  marginBottom: '0.625rem',
});

export const Description = styled('p', {
  display: 'inline-flex',
  alignItems: 'center',
  fontFamily: 'var(--font-pro-display)',
  fontSize: '0.875rem',
  fontWeight: '400',
  lineHeight: '1rem',
  color: 'rgba(149, 162, 197, 1)',
});

export const Reward = styled('span', {
  display: 'inline-flex',
  alignItems: 'center',
  fontFamily: 'var(--font-mono)',
  fontSize: '0.875rem',
  fontWeight: '600',
  marginRight: '0.5rem',
  color: 'rgba(255, 255, 255, 1)',
});

export const RewardIcon = styled('img', {
  width: '1.5rem',
  height: '1.5rem',
  marginRight: '0.25rem',
});

export const Button = styled('button', {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  minWidth: '2.5rem',
  minHeight: '2.5rem',
  fontFamily: 'var(--font-pro-display)',
  fontSize: '1rem',
  fontWeight: '700',
  lineHeight: '2.375rem',
  textTransform: 'uppercase',
  color: 'transparent',
  border: 'none',
  backgroundColor: 'transparent',
  backgroundImage: 'linear-gradient(90deg, #1CE7FD 0%, #365AE5 100%)',
  '-webkit-background-clip': 'text',
  'background-clip': 'text',
  marginTop: '0.5rem',
});

export const Table = styled('table', {
  width: '100%',
  borderCollapse: 'separate',
  borderSpacing: '0 0.625rem',
});

export const TableHeader = styled('th', {
  textAlign: 'left',
  fontFamily: 'var(--font-pro-display)',
  fontSize: '0.875rem',
  fontWeight: '600',
  lineHeight: '1rem',
  color: 'rgba(149, 162, 197, 1)',
  padding: '0.5rem 0.75rem',
});

export const TableData = styled('td', {
  fontFamily: 'var(--font-pro-display)',
  fontSize: '0.75rem',
  fontWeight: '600',
  lineHeight: '1rem',
  color: '#fff',
  borderTop: '1px dashed rgba(87, 104, 157, 0.3)',
  borderBottom: '1px dashed rgba(87, 104, 157, 0.3)',
  backgroundColor: 'rgba(18, 22, 35, 1)',
  padding: '0.5rem 0.75rem',
});

export const TableRow = styled('tr', {
  [`& ${TableData}`]: {
    '&:first-child': {
      borderLeft: '1px dashed rgba(87, 104, 157, 0.3)',
      borderTopLeftRadius: '1rem',
      borderBottomLeftRadius: '1rem',
    },
    '&:last-child': {
      borderRight: '1px dashed rgba(87, 104, 157, 0.3)',
      borderTopRightRadius: '1rem',
      borderBottomRightRadius: '1rem',
    },
  },
});