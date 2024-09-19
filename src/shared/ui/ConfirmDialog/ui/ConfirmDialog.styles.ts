import { styled } from '@app/stitches.config'
import { Button } from '@shared/ui/Button'

export const Content = styled('div', {
  width: '240px',
})
  
export const IconWrapper = styled('div', {
  marginBottom: '10px',
  textAlign: 'center',
})
  
export const Title = styled('div', {
    color: '#fff',
    textAlign: 'center',
    fontSize: '24px',
    fontStyle: 'normal',
    fontWeight: 700,
    lineHeight: '30px',
    marginBottom: '16px',
})
  
export const Description = styled('div', {
    marginBottom: '30px',
    fontSize: '16px',
    color: '#67718c',
    textAlign: 'center',
    fontStyle: 'normal',
    fontWeight: 400,
    lineHeight: '20px',
  
    variants: {
      withoutTitle: {
        true: {
          fontSize: '20px',
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
    gap: '16px',
    width: '100%',
})
  
export const ConfirmDialogButton = styled(Button, {
    color: '#fff',
    fontSize: '14px',
    fontStyle: 'normal',
    fontWeight: 590,
    display: 'flex',
    padding: '15px 16px',
    width: '96px',
    minHeight: 0,
    height: '40px',
})