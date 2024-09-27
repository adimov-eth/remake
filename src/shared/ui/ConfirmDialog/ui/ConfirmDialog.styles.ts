import { styled } from '@app/stitches.config'

export const Content = styled('div', {
  maxWidth: '15rem',
})
  
export const IconWrapper = styled('div', {
  marginBottom: '0.625rem',
  textAlign: 'center',
})
  
export const Title = styled('div', {
  color: 'rgba(255, 255, 255, 1)',
  textAlign: 'center',
  fontSize: '1.5rem',
  fontStyle: 'normal',
  fontWeight: 700,
  lineHeight: '1.875rem',
})
  
export const Description = styled('div', {
  fontSize: '1rem',
  color: 'rgba(149, 164, 211, 1)',
  textAlign: 'center',
  fontStyle: 'normal',
  fontWeight: 400,
  lineHeight: '1.25rem',
  marginTop: '1rem',
  variants: {
    withoutTitle: {
      true: {
        fontSize: '1.25rem',
        fontWeight: 400,
        color: 'white',
      },
    },
  },
})
  
export const ButtonsWrapper = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '1rem',
  width: '100%',
  marginTop: '1.875rem',
})