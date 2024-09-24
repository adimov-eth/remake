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

// TODO Вынести в отдельный вариант кнопки

export const SettingsButtons: React.FC = () => (
  <S.Root>
    <S.Button type="button" onClick={handleInfoClick}>
      <S.Icon as={InfoIcon} />
    </S.Button>
    <S.Button as={Link} to="/settings">
      <S.Icon as={SettingsIcon} />
    </S.Button>
  </S.Root>
);
