import React, { ButtonHTMLAttributes } from 'react'

import * as S from './Button.styles'

export type ButtonVariantType = 'primary'

export interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariantType
    size?: 'small' | 'medium' | 'large'
    shine?: boolean
    outline?: boolean
    loading?: boolean
    children: React.ReactNode
    as?: React.ElementType
}

export const Button: React.FC<IButtonProps> = ({
  variant = 'primary',
  size = 'medium',
  shine = false,
  loading = false,
  outline = false,
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
        outline={outline}
        type={type}
        as={as}
        {...props}
    >
      <S.ButtonContent>
        {children}
      </S.ButtonContent>
    </S.Button>
  )
}
