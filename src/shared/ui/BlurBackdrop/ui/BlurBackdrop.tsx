import { FC } from 'react';

import * as S from './BlurBackdrop.styles';
import { ReactNode } from 'react';

interface BlurBackdropProps {
  variant?: 'pink' | 'purple' | 'blue';
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
}

export const BlurBackdrop: FC<BlurBackdropProps> = ({ 
  children, 
  variant = 'blue',
  size = 'lg',
}) => {
  return (
    <S.BlurBackdrop variant={variant} size={size}>
      <S.BlurBackdropContent>
        {children}
      </S.BlurBackdropContent>
    </S.BlurBackdrop>
  );
};