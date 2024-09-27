import { Button, IButtonProps } from '@shared/ui/Button';
import * as S from './Story.styles'

interface IStoryProps {
    title?: React.ReactNode | string;
    description?: React.ReactNode | string;
    children?: React.ReactNode;
    style?: React.CSSProperties;
    justify?: 'start' | 'center';
}

export const StoryHeader: React.FC<IStoryProps> = ({
    title = '',
    description = '',
    children = null,
    justify = 'start',
    ...props
}) => {
    return (
        <S.Root justify={justify} {...props}>
            {title && <S.Title>{title}</S.Title>}
            {description && <S.Description>{description}</S.Description>}
            {children}
        </S.Root >
    );
};

export const StorySeeMore: React.FC<IButtonProps> = ({
    variant = 'gradientFilled',
    size = 'medium',
    shine = true,
    children = null,
    as = 'span',
    ...props
}) => {
    return (
        <Button style={{ position: 'relative', zIndex: 2, margin: '0 1rem' }} {...props} as={as} variant={variant} size={size} shine={shine}>{children}</Button>
    );
}
