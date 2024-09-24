import { styled } from "@app/stitches.config";

export const Root = styled('div', {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    width: '100%',
})

export const Card = styled('div', {
    position: 'relative',
    background: '#14151E80',
    padding: '1rem',
    borderRadius: '1rem',
    backdropFilter: 'blur(1.5rem)',
    WebkitBackdropFilter: 'blur(1.5rem)',
    textAlign: 'center',
    color: 'white',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 0,
})

export const CardIcon = styled('div', {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '0.625rem',
})

export const CardValue = styled('span', {
    display: 'block',
    fontFamily: 'var(--font-pro-display)',
    fontSize: '16px',
    fontWeight: 600,
    textAlign: 'center',
    marginBottom: '12px',
    color: '#ffffff !important',
})

export const CardTitle = styled('span', {
    display: 'block',
    fontFamily: 'var(--font-pro-display)',
    fontSize: '14px',
    color: '#67718C',
})

export const CardLink = styled('a', {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
    opacity: 0,
    display: 'block',
    width: '100%',
    height: '100%',
})
