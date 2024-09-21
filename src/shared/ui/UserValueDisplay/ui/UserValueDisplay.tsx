import React from 'react'

import { formatNumber } from '@/shared/utils/formatters'
import QuarkIcon from '@shared/assets/quark.svg?react'
import StarIcon from '@shared/assets/star-gradient.svg?react'

import * as S from './UserValueDisplay.styles'

interface UserValueDisplayProps {
  quarks: number
  stars: number
  showQuarks: boolean
}

export const UserValueDisplay: React.FC<ValueDisplayProps> = ({ quarks, stars, showQuarks }) => (
  <S.ValuesContainer>
    {showQuarks && (
      <S.BlockWrapper id="quarks">
        <S.Icon as={QuarkIcon} />
        <S.Value>{formatNumber(Math.round(quarks))}</S.Value>
      </S.BlockWrapper>
    )}
    <S.BlockWrapper id="stars">
      <S.Icon as={StarIcon} />
      <S.Value>{stars}</S.Value>
    </S.BlockWrapper>
  </S.ValuesContainer>
)