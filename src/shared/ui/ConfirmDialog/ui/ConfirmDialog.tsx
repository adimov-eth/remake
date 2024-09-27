import { FC, ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { Dialog } from '@/shared/ui/Dialog'

import { Button } from '@/shared/ui/Button'
import * as S from './ConfirmDialog.styles'


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

export const ConfirmDialog: FC<ConfirmModalProps> = ({
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
      <S.Content>
        {icon && <S.IconWrapper>{icon}</S.IconWrapper>}
        {title && <S.Title>{title}</S.Title>}
        <S.Description withoutTitle={!title}>
          {description}
        </S.Description>
        <S.ButtonsWrapper>
          {enableCancelButton && (
            <Button
              variant="gradientOutline"
              onClick={onClose}
            >
              {t('cancel')}
            </Button>
          )}
          <Button
            variant="gradientFilled"
            onClick={() => {
              onButtonClick && onButtonClick()
              onClose()
            }}
          >
            {buttonText || t('confirm')}
          </Button>
        </S.ButtonsWrapper>
      </S.Content>
    </Dialog>
  )
}