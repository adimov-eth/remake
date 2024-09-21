import { styled } from '@stitches/react'

export const ValuesContainer = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
})

export const BlockWrapper = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '5px',
  width: 'max-content',
  height: '40px',
  padding: '8px',
  borderRadius: '16px',
  backgroundColor: '#1C1F30',
  backdropFilter: 'blur(24px)',
  WebkitBackdropFilter: 'blur(24px)',
  color: 'white',
})

export const Value = styled('div', {
  fontFamily: 'var(--font-mono)',
  fontSize: '14px',
  fontWeight: 600,
  paddingRight: '4px',
})

export const Icon = styled('svg', {
  width: '24px',
  height: '24px',
})