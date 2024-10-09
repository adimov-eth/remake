import React from 'react';
import { useStore } from '@nanostores/react';
import { $accelerators } from '@app/stores/state';

import { AcceleratorCard } from '@features/AcceleratorCard';

import * as S from './AcceleratorsList.styles';

export const AcceleratorsList: React.FC = () => {
  const accelerators = useStore($accelerators);

  return (
    <S.AcceleratorsList>
      {accelerators.map((card, i) => (
        <S.AcceleratorsListItem key={i}>
          <AcceleratorCard {...card} currency={'QRK'} />
        </S.AcceleratorsListItem>
      ))}
    </S.AcceleratorsList>
  );
};
