import { FC, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { Dialog } from '@/shared/ui/Dialog';

import { Button } from '@/shared/ui/Button';
import * as S from './ConfirmDialog.styles';


interface ConfirmModalProps {
  isOpen: boolean
  onClose: () => void
  buttonText?: string
  onButtonClick?: () => void
  enableCancelButton?: boolean
  children?: ReactNode
}

export const ConfirmDialog: FC<ConfirmModalProps> = ({
  isOpen,
  onClose,
  buttonText,
  onButtonClick,
  enableCancelButton,
  children,
}) => {
  const { t } = useTranslation('global');

  const handleConfirm = () => {
    onButtonClick && onButtonClick();
    onClose();
  };

  return (
    <Dialog isOpen={isOpen} confirm={true} onClose={onClose}>
      <S.Content>
        {children}
        <S.ButtonsWrapper>
          {enableCancelButton && (
            <Button
              variant="primary"
              outline
              onClick={onClose}
            >
              {t('cancel')}
            </Button>
          )}
          <Button
            variant="primary"
            onClick={handleConfirm}
          >
            {buttonText || t('confirm')}
          </Button>
        </S.ButtonsWrapper>
      </S.Content>
    </Dialog>
  );
};