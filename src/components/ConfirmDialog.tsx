import { FC, ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { styled } from '@/core/stitches.config'
import { Button } from '@/components/Button'
import { Dialog } from '@/components/Dialog'

// Styled components

const Content = styled('div', {
  width: '240px',
})

const IconWrapper = styled('div', {
  marginBottom: '10px',
  textAlign: 'center',
})

const Title = styled('div', {
  color: '#fff',
  textAlign: 'center',
  fontSize: '24px',
  fontStyle: 'normal',
  fontWeight: 700,
  lineHeight: '30px',
  marginBottom: '16px',
})

const Description = styled('div', {
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

const ButtonsWrapper = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '16px',
  width: '100%',
})

const StyledButton = styled(Button, {
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

interface ConfirmModalProps {
  isOpen: boolean
  onClose: () => void
  icon?: ReactNode
  title?: string
  description: string
  buttonText?: string
  onButtonClick?: () => void
  enableCancelButton?: boolean
}

const ConfirmDialog: FC<ConfirmModalProps> = ({
  isOpen,
  onClose,
  icon,
  title,
  description,
  buttonText,
  onButtonClick,
  enableCancelButton,
}) => {
  const { t } = useTranslation('global');

  return (
    <Dialog isOpen={isOpen} confirm={true} onClose={onClose}>
      <Content>
        {icon && <IconWrapper>{icon}</IconWrapper>}
        {title && <Title>{title}</Title>}
        <Description withoutTitle={!title}>
          {description}
        </Description>
        <ButtonsWrapper>
          {enableCancelButton && (
            <StyledButton
              variant="gradientOutline"
              onClick={onClose}
            >
              {t('cancel')}
            </StyledButton>
          )}
          <StyledButton
            variant="gradientFilled"
            onClick={() => {
              onButtonClick && onButtonClick()
              onClose()
            }}
          >
            {buttonText || t('confirm')}
          </StyledButton>
        </ButtonsWrapper>
      </Content>
    </Dialog>
  )
}

export default ConfirmDialog;