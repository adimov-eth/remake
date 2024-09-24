import React from 'react'

import { formatNumber } from '@/shared/utils/formatters'
import QuarkIcon from '@shared/assets/quark.svg?react'
import StarIcon from '@shared/assets/star-gradient.svg?react'

import * as S from './BalanceDisplay.styles'

interface IBalanceDisplayProps {
  variant?: 'default' | 'ghost'
  quarks?: number
  stars?: number
  showQuarks?: boolean
  showStars?: boolean
}

export const BalanceDisplay: React.FC<IBalanceDisplayProps> = ({ 
  variant = 'default',
  quarks = 0,
  stars = 0,
  showQuarks = true,
  showStars = false,
}) => (
  <S.Root>
    {showQuarks && (
      <S.BalanceValue id="quarks" variant={variant}>
        <S.Icon as={QuarkIcon} />
        <S.Value>{formatNumber(Math.round(quarks))}</S.Value>
      </S.BalanceValue>
    )}
    {showStars && (
      <S.BalanceValue id="stars" variant={variant}>
        <S.Icon as={StarIcon} />
        <S.Value>{stars}</S.Value>
      </S.BalanceValue>
    )}
  </S.Root>
)