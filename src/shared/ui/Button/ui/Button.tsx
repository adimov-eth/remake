import React, { ButtonHTMLAttributes } from 'react'

import * as S from './Button.styles'

type ButtonVariant = 'gradientOutline' | 'gradientFilled' | 'purpleGradient'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant: ButtonVariant
    children: React.ReactNode
}

export const Button: React.FC<ButtonProps> = ({
  variant,
  children,
  ...props
}) => {
  return (
    <S.Button
      variant={variant}
      {...props}
    >
      {children}
    </S.Button>
  )
}
