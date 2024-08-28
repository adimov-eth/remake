import React from 'react'
import { styled } from '@/core/stitches.config'

type ButtonVariant = 'gradientOutline' | 'gradientFilled' | 'purpleGradient'

interface ButtonProps {
  variant: ButtonVariant
  className?: string
  children: React.ReactNode
  disabled?: boolean
  onClick?: () => void
}

const StyledButton = styled('button', {
  position: 'relative',
  border: 'none',
  width: '100%',
  minHeight: '54px',
  borderRadius: '14px',
  fontSize: '14px',
  fontWeight: 600,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',

  variants: {
    variant: {
      gradientOutline: {
        color: '#1CE7FD',
        background: 'transparent',
        fontFamily: 'var(--font-pro-display)',
        '&::before': {
          content: '""',
          position: 'absolute',
          inset: 0,
          borderRadius: '14px',
          padding: '3px',
          background: 'linear-gradient(90deg, #1CE7FD 0%, #365AE5 100%)',
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
        },
      },
      gradientFilled: {
        background: 'linear-gradient(90deg, #1CE7FD 0%, #365AE5 100%)',
        color: 'white',
        fontFamily: 'var(--font-pro)',
      },
      purpleGradient: {
        background: 'linear-gradient(88.72deg, #264DD0 0%, #5931AE 102.05%)',
        color: 'white',
        fontFamily: 'var(--font-pro-display)',
      },
    },
  },
})

export const Button: React.FC<ButtonProps> = ({
  variant,
  className,
  children,
  onClick,
  disabled,
}) => {
  return (
    <StyledButton
      variant={variant}
      className={className}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </StyledButton>
  )
}
