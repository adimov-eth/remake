import { FC } from 'react';

import * as S from './Loader.styles';

interface LoaderProps {
  speed: 'fast' | 'slow'
}

export const Loader: FC<LoaderProps> = ({ speed = 'fast' }) => (
  <S.Root> 
    <S.Loader speed={speed}></S.Loader>
  </S.Root>
);
