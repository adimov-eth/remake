import React from 'react';
import * as S from './Title.styles';

interface TitleProps {
  children: React.ReactNode
}

export const Title: React.FC<TitleProps> = ({ children }) => {
  return <S.Title>{children}</S.Title>;
};