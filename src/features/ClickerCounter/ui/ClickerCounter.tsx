import { type FC } from 'react'
import { useStore } from '@nanostores/react'
import { $gameState } from '@app/stores/state'
import { formatNumberGroup } from '@/shared/utils/formatters'

import * as S from './ClickerCounter.styles'


export const ClickerCounter: FC = () => {
  const clickerState = $gameState.get();

  const quarks = useStore(clickerState.quarks);

  return <S.Root>{formatNumberGroup(quarks)}</S.Root>;
}