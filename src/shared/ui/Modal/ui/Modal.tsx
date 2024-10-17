import { ReactNode, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import CloseIcon from '@shared/assets/close.svg?react';

import * as S from './Modal.styles';

export const Modal = ({
  open,
  onClose,
  children,
}: {
  open: boolean
  onClose: () => void
  children: ReactNode
}) => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (open) {
      setAnimate(true);
    } else {
      setTimeout(() => setAnimate(false), 50);
    }
  }, [open]);

  const modalContent = (
    <S.ModalRoot open={animate}>
      <S.Overlay onClick={onClose} />
      <S.Inner slideDown={!open}>
        <S.Close>
          <CloseIcon onClick={onClose} />
        </S.Close>
        <S.Scroll>{children}</S.Scroll>
      </S.Inner>
    </S.ModalRoot>
  );

  return createPortal(
    modalContent,
    document.body
  );
};