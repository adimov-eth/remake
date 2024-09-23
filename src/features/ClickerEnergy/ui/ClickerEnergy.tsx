import { type FC } from 'react';
import { useStore } from '@nanostores/react';
import { useTranslation } from 'react-i18next';
import { $gameState } from '@app/stores/state';

import * as S from './ClickerEnergy.styles';

export const ClickerEnergy: FC = () => {
  const { t } = useTranslation('global');

  const clickerState = $gameState.get();
  const energy = useStore(clickerState.energy);
  const energyLimit = useStore(clickerState.energyLimit);

  return (
    <S.Root>
      <S.Inner>
        <S.Icon />
        <S.Value>
          {energy}/{energyLimit}
        </S.Value>
      </S.Inner>
      <S.Title>{t('energy')}</S.Title>
    </S.Root>
  )
}
