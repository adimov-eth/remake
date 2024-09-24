import { styled } from '@app/stitches.config'

export const Title = styled('div', {
    fontFamily: 'var(--font-pro-display)',
    fontSize: '28px',
    fontWeight: '600',
    textAlign: 'center',
    color: '#fff',
    marginBottom: '30px',
})

export const Description = styled('div', {
    fontFamily: 'var(--font-pro-display)',
    fontSize: '15px',
    textAlign: 'center',
    color: '#95A2C5',
    marginBottom: '32px',
})

export const Rewards = styled('div', {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '9px',
    marginBottom: '40px',
})