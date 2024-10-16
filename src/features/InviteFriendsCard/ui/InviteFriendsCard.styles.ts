import { styled } from '@app/stitches.config';
import { quarkPng } from '@shared/assets';

export const Root = styled('div', {
});

export const Details = styled('details', {
  // pointerEvents: 'none',
  '&::marker': {
    display: 'none',
  },
  '&::-webkit-details-marker': {
    display: 'none',
  },
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

export const ImageWrapper = styled('div', {
  position: 'relative',
  width: '3.75rem',
  height: '3.75rem',
  '&::before': {
    content: '""',
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    borderRadius: '9999px',
    filter: 'blur(0.5rem)',
    backgroundColor: 'rgba(127, 74, 186, 0.85)',
    zIndex: 0,
  },
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
  fontFamily: 'var(--font-pro-display)',
  fontSize: '0.875rem',
  fontWeight: '400',
  lineHeight: '1.5rem',
  color: 'rgba(149, 162, 197, 1)',
  '& > * + *': {
    marginLeft: '0.5rem',
    lineHeight: '1.5rem',
  }
});

export const Reward = styled('span', {
  display: 'inline-flex',
  alignItems: 'center',
  fontFamily: 'var(--font-mono)',
  fontSize: '0.875rem',
  fontWeight: '600',
  color: 'rgba(255, 255, 255, 1)',
  paddingLeft: '1.75rem',
  backgroundImage: `url(${quarkPng})`,
  backgroundSize: '1.5rem',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'left center',
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
  textShadow: '0px 0px 20px rgba(39, 176, 244, 0.80)',
  color: 'transparent',
  border: 'none',
  backgroundColor: 'transparent',
  backgroundImage: 'linear-gradient(90deg, #1CE7FD 0%, #365AE5 100%)',
  backgroundClip: 'text',
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
  fontSize: '0.75rem',
  fontWeight: '400',
  lineHeight: '1rem',
  color: 'rgba(112, 126, 170, 1)',
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
  padding: '0.75rem 1rem',
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