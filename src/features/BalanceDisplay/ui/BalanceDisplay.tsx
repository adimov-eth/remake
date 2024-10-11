import React from 'react';

import { formatNumber } from '@/shared/utils/formatters';
import { Label, ILabelProps } from '@shared/ui/Label';

import * as S from './BalanceDisplay.styles';
import QuarkIcon from '@shared/assets/quark.svg?react';
import StarIcon from '@shared/assets/star-gradient.svg?react';

interface IBalanceDisplayProps extends Omit<ILabelProps, 'children'> {
  quarks?: number
  stars?: number
  showQuarks?: boolean
  showStars?: boolean
}

export const BalanceDisplay: React.FC<IBalanceDisplayProps> = ({
  variant = 'secondary',
  size = 'large',
  quarks = 0,
  stars = 0,
  showQuarks = true,
  showStars = false,
}) => (
  <S.Root>
    {showQuarks && (
      <Label id="quarks" variant={variant} size={size}>
        <S.Icon as={QuarkIcon} />
        {formatNumber(Math.round(quarks))}
      </Label>
    )}
    {showStars && (
      <Label id="stars" variant={variant} size={size}>
        <S.Icon as={StarIcon} />
        {stars}
      </Label>
    )}
  </S.Root>
);