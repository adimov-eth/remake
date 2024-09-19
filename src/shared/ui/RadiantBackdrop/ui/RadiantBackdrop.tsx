import * as S from './RadiantBackdrop.styles'
import { ReactNode } from 'react'

interface RadiantBackdropProps {
    children: ReactNode;
    variant: 'pink' | 'purple' | 'blue';
}

export const RadiantBackdrop = ({ children, variant }: RadiantBackdropProps) => {
    return <S.RadiantGradient variant={variant}>{children}</S.RadiantGradient>
}