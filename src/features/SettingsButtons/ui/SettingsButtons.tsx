import React from 'react';

import { Link } from '@shared/ui/Link';
import { Button } from '@shared/ui/Button';
// import InfoIcon from '@shared/assets/info.svg?react';
import SettingsIcon from '@shared/assets/settings.svg?react';
// import { $isNew, $storieIndex } from '@app/stores/state';

import * as S from './SettingsButtons.styles';

// const handleInfoClick = () => {
//   $isNew.set(true);
//   $storieIndex.set(0);
// };

export const SettingsButtons: React.FC = () => (
  <S.Root>
    {/* <Button 
      variant='secondary' 
      onClick={handleInfoClick}
    >
      <S.Icon as={InfoIcon} />
    </Button> */}
    <Button 
      variant='secondary'
      as={Link} 
      to="/settings"
    >
      <S.Icon as={SettingsIcon} />
    </Button>
  </S.Root>
);
