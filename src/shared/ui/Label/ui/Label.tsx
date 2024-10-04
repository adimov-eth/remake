import * as S from './Label.styles';

export interface ILabelProps {
    variant?: 'primary' | 'secondary' | 'ghost'
    size?: 'small' | 'medium' | 'large'
    as?: 'span' | 'button'
    type?: 'button' | 'submit' | 'reset'
    onClick?: () => void
    children: React.ReactNode
    props?: React.HTMLAttributes<HTMLButtonElement | HTMLSpanElement>
}

export const Label = ({
    variant = 'primary',
    size = 'medium',
    children,
    as = 'span',
    type = 'button',
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