import React, { useEffect, useState } from 'react'
import { styled, keyframes } from "@/core/stitches.config"

type DialogProps = {
  isOpen: boolean
  confirm?: boolean
  children: React.ReactNode
  className?: string
  onClose: () => void
}

const fadeIn = keyframes({
  '0%': { opacity: 0 },
  '100%': { opacity: 1 },
})

const fadeOut = keyframes({
  '0%': { opacity: 1 },
  '100%': { opacity: 0 },
})

const modalOpen = keyframes({
  '0%': { opacity: 0, transform: 'scale(0.8)' },
  '100%': { opacity: 1, transform: 'scale(1)' },
})

const modalClose = keyframes({
  '0%': { opacity: 1, transform: 'scale(1)' },
  '100%': { opacity: 0, transform: 'scale(0.8)' },
})

const ModalOverlay = styled('div', {
  position: 'fixed',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 228,
  opacity: 0,
  animation: `${fadeIn} 0.3s forwards`,
  borderRadius: '16px',
  border: '1px solid rgba(255, 255, 255, 0.02)',
  background: 'rgba(43, 46, 69, 0.3)',
  boxShadow: '0px 4px 24px 0px rgba(0, 0, 0, 0.25)',
  backdropFilter: 'blur(12px)',

  variants: {
    fadeOut: {
      true: {
        animation: `${fadeOut} 0.3s forwards`,
      }
    }
  }
})

const ModalContent = styled('div', {
  background: 'rgba(43, 46, 69, 0.3)',
  boxShadow: '0px 4px 24px 0px rgba(0, 0, 0, 0.25)',
  backdropFilter: 'blur(12px)',
  WebkitBackdropFilter: 'blur(12px)',
  border: '1px solid rgba(255, 255, 255, 0.02)',
  padding: '16px',
  borderRadius: '16px',
  width: '300px',
  color: '#ffffff',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  zIndex: 50,
  opacity: 0,
  animation: `${modalOpen} 0.3s forwards`,

  variants: {
    fadeOut: {
      true: {
        animation: `${modalClose} 0.3s forwards`,
      }
    },
    confirm: {
      true: {
        padding: '30px',
        width: '300px !important',
        fontFamily: 'var(--font-pro-display)',
      }
    }
  }
})

export const Dialog: React.FC<DialogProps> = ({
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

  return (
    visible && (
      <ModalOverlay
        className={'overlay'}
        fadeOut={!isOpen}
        onClick={onClose}
        onAnimationEnd={handleAnimationEnd}
      >
        <ModalContent
          confirm={confirm}
          fadeOut={!isOpen}
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </ModalContent>
      </ModalOverlay>
    )
  )
}
