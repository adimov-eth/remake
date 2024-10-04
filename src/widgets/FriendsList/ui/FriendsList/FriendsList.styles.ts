import { styled } from '@stitches/react';

export const Root = styled('div', {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    fontFamily: 'var(--font-pro-display)',
    color: '#fff',
});

export const Title = styled('div', {
    fontSize: '1rem',
    fontWeight: 600,
});

export const Description = styled('div', {
    fontSize: '0.75rem',
    fontWeight: 400,
    letterSpacing: '0.015rem',
    margin: '0.625rem 0'
});

export const Card = styled('div', {
    display: 'grid',
    gridTemplateColumns: '1fr auto',
    alignItems: 'center',
    padding: '0.625rem 1rem',
    gap: '1rem',
    borderRadius: '1rem',
    background: '#14151E',
});

export const CardContent = styled('div', {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
    overflow: 'hidden',
});

export const CardLabel = styled('span', {
    display: 'inline-block',
    color: '#fff',
    fontSize: '1rem',
    fontWeight: 600,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
});

export const CardDescription = styled('div', {
    color: '#67718C',
    fontSize: '0.875rem',
    fontWeight: 400,
    lineHeight: '1rem',
});

export const Container = styled('div', {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
});

export const CopyIcon = styled('div', {
    width: '1.75rem',
    height: '1.75rem',
    color: 'rgba(89, 92, 122, 1)',
});