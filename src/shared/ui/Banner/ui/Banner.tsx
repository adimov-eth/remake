import React, { ReactNode } from 'react';
import * as S from './Banner.styles';

interface BannerProps {
  children: ReactNode
}

export const Banner: React.FC<BannerProps> = ({ children }) => {
  return <S.Banner>{children}</S.Banner>;
};