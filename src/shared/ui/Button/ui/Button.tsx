import React, { ButtonHTMLAttributes } from 'react'

import * as S from './Button.styles'

export type ButtonVariantType = 'gradientOutline' | 'gradientFilled' | 'purpleGradient'

export interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariantType
    size?: 'small' | 'medium' | 'large'
    shine?: boolean
    loading?: boolean
    children: React.ReactNode
    as?: React.ElementType
}

export const Button: React.FC<IButtonProps> = ({
  variant = 'gradientFilled',
  size = 'small',
  shine = false,
  loading = false,
  type = 'button',
  children,
  as = 'button',
  ...props
}) => {
  return (
    <S.Button
        variant={variant}
        size={size}
        shine={shine}
        loading={loading}
        type={type}
        as={as}
        {...props}
    >
      {children}
    </S.Button>
  )
}
