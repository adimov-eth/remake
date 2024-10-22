import React, { ButtonHTMLAttributes } from 'react';

import * as S from './Button.styles';

export type ButtonVariantType = 'primary' | 'secondary' | 'danger' | 'ghost';
export type ButtonSizeType = 'small' | 'medium' | 'large';
export type ButtonRoundedType = 'sm' | 'md' | 'lg' | 'full';

export interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariantType;
  size?: ButtonSizeType;
  rounded?: ButtonRoundedType;
  shine?: boolean;
  outline?: boolean;
  loading?: boolean;
  wide?: boolean;
  children: React.ReactNode;
  as?: React.ElementType;
  to?: string;
}

export const Button: React.FC<IButtonProps> = ({
  variant = 'primary',
  size = 'medium',
  rounded = 'md',
  shine = false,
  loading = false,
  outline = false,
  wide = true,
  type = 'button',
  children,
  as = 'button',
  to,
  ...props
}) => {
  return (
    <S.Button
      rounded={rounded}
      variant={variant}
      size={size}
      shine={shine}
      loading={loading}
      outline={outline}
      wide={wide}
      type={type}
      {...(as && { as })}
      {...(to && { to })}
      {...props}
    >
      <S.ButtonContent>
        {children}
      </S.ButtonContent>
    </S.Button>
  );
};
