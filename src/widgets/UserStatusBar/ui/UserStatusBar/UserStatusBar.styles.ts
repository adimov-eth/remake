import { styled } from '@stitches/react'

export const Root = styled('div', {
  display: 'grid',
  gridTemplateColumns: '1fr auto',
  alignItems: 'center',
  padding: '1rem',
  width: '100%',
  background: 'rgba(43, 46, 69, 0.3)',
  boxShadow: '0 0.25rem 1.5rem rgba(0, 0, 0, 0.25)',
  backdropFilter: 'blur(1.5rem)',
  WebkitBackdropFilter: 'blur(1.5rem)',
})