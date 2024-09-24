import { FC, ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { Dialog } from '@/shared/ui/Dialog'

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
            <S.ConfirmDialogButton
              variant="gradientOutline"
              onClick={onClose}
            >
              {t('cancel')}
            </S.ConfirmDialogButton>
          )}
          <S.ConfirmDialogButton
            variant="gradientFilled"
            onClick={() => {
              onButtonClick && onButtonClick()
              onClose()
            }}
          >
            {buttonText || t('confirm')}
          </S.ConfirmDialogButton>
        </S.ButtonsWrapper>
      </S.Content>
    </Dialog>
  )
}