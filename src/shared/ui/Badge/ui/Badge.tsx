import React from 'react';
import * as S from './Badge.styles';

interface IBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode | string;
}

export const Badge: React.FC<IBadgeProps> = ({ children, ...props }) => {
  return <S.Badge {...props}>{children}</S.Badge>;
};