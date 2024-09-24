import { styled } from '@stitches/react'

export const Root = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '0.25rem',
})

export const BalanceValue = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '0.3125rem',
  width: 'max-content',
  height: '2.5rem',
  padding: '0.5rem',
  borderRadius: '1rem',
  backgroundColor: '#1C1F30',
  backdropFilter: 'blur(1.5rem)',
  WebkitBackdropFilter: 'blur(1.5rem)',
  color: '#fff',
  variants: {
    variant: {
      default: {
        backgroundColor: '#1C1F30',
      },
      ghost: {
        backgroundColor: 'transparent',
      },
    },
  },
})

export const Icon = styled('svg', {
  width: '1.5rem',
  height: '1.5rem',
})

export const Value = styled('div', {
  fontFamily: 'var(--font-mono)',
  fontSize: '0.875rem',
  fontWeight: 600,
  paddingRight: '0.25rem',
})