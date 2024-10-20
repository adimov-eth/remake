import { FC } from 'react';

import * as S from './BlurBackdrop.styles';
import { ReactNode } from 'react';

export type BlurBackdropVariant = 'pink' | 'purple' | 'blue' | 'brown' | 'red' | 'white' | 'blue' | 'orange' | 'black';
export type BlurBackdropSize = 'sm' | 'md' | 'lg';

interface BlurBackdropProps {
  variant?: BlurBackdropVariant;
  size?: BlurBackdropSize;
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