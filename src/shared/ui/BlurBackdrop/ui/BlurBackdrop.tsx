import * as S from './BlurBackdrop.styles';
import { ReactNode } from 'react';

interface BlurBackdropProps {
    children: ReactNode;
    variant: 'pink' | 'purple' | 'blue';
}

export const BlurBackdrop = ({ children, variant }: BlurBackdropProps) => {
  return (
    <S.BlurBackdrop variant={variant}>
      <S.BlurBackdropContent>
        {children}
      </S.BlurBackdropContent>
    </S.BlurBackdrop>
  );
};