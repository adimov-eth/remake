import {styled} from '@/app/stitches.config'

export const Root = styled('div', {
    background: '#14151E',
    borderRadius: '16px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '32px',
    padding: '16px',
});

export const Info = styled('div', {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
});

export const Texts = styled('div', {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
});

export const Name = styled('div', {
    fontFamily: 'var(--font-pro-display)',
    fontSize: '16px',
    fontWeight: 600,
    color: 'white',
});

export const Rank = styled('div', {
    fontFamily: 'var(--font-pro-display)',
    fontSize: '14px',
    fontWeight: 400,
    color: '#67718C',
});

export const Balance = styled('div', {
    color: 'white',
    fontFamily: 'var(--font-mono)',
    fontSize: '14px',
    fontWeight: 600,
});
