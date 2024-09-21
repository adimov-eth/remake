import React from 'react';

import { Link } from '@/shared/ui/Link/ui/Link';
import InfoIcon from '@shared/assets/info.svg?react';
import SettingsIcon from '@shared/assets/settings.svg?react';
import { $isNew, $storieIndex } from '@app/stores/state';

import * as S from './SettingsButtons.styles'

const handleInfoClick = () => {
  $isNew.set(true);
  $storieIndex.set(0);
};

export const SettingsButtons: React.FC = () => (
  <S.ButtonsContainer>
    <S.ButtonWrapper onClick={handleInfoClick}>
      <S.Icon as={InfoIcon} />
    </S.ButtonWrapper>
    <Link to="/settings">
      <S.ButtonWrapper>
        <S.Icon as={SettingsIcon} />
      </S.ButtonWrapper>
    </Link>
  </S.ButtonsContainer>
);
