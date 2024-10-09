import * as S from './Label.styles';

export interface ILabelProps extends React.HTMLAttributes<HTMLSpanElement | HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'ghost'
    size?: 'small' | 'medium' | 'large'
    as?: 'span' | 'button'
    type?: 'button'
    children: React.ReactNode | string
}

export const Label = ({
  variant = 'primary',
  size = 'medium',
  children,
  type = 'button',
  as = 'span',
  ...props
}: ILabelProps) => {
  return (
    <S.Root
      variant={variant}
      size={size}
      as={as}
      {...(as === 'button' ? { type } : {})}
      {...props}
    >
      {children}
    </S.Root>
  );
};