import React from 'react';

// import { CrashCard } from '@features/CrashCard';
import { Clicker } from '@widgets/Clicker';

import * as S from './Home.styles';

export const HomePage: React.FC = () => {
  return (
    <S.Root>
      {/* <CrashCard /> */}
      <Clicker />
    </S.Root>
  );
};
