import { SwapForm } from '@widgets/SwapForm';
import { EasterEggHunter } from '@features/EasterEggHunter';

import * as S from './Swap.styles';

export const Swap = () => {
  return (
    <S.Root>
      <SwapForm />
      <S.Star>
        <EasterEggHunter />
      </S.Star>
    </S.Root>
  );
};
