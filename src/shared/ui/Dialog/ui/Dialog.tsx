import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'

import * as S from './Dialog.styles'

interface IDialogProps {
  isOpen: boolean
  confirm?: boolean
  children: React.ReactNode
  className?: string
  onClose: () => void
}

export const Dialog: React.FC<IDialogProps> = ({
  isOpen,
  children,
  onClose,
  confirm = false,
}) => {
  const [visible, setVisible] = useState(isOpen)

  useEffect(() => {
    if (isOpen) {
      setVisible(true)
    }
  }, [isOpen])

  const handleAnimationEnd = () => {
    if (!isOpen) {
      setVisible(false)
    }
  }

  const modalContent = visible && (
    <S.ModalOverlay
      className={'overlay'}
      fadeOut={!isOpen}
      onClick={onClose}
      onAnimationEnd={handleAnimationEnd}
    >
      <S.ModalContent
        confirm={confirm}
        fadeOut={!isOpen}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </S.ModalContent>
    </S.ModalOverlay>
  )

  return ReactDOM.createPortal(
    modalContent,
    document.body
  )
}