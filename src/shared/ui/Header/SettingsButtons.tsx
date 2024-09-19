import React from 'react';
import { styled } from '@stitches/react';
import { Link } from '@/shared/ui/Link/ui/Link';
import InfoIcon from '@shared/assets/info.svg?react';
import SettingsIcon from '@shared/assets/settings.svg?react';
import { $isNew, $storieIndex } from '@app/stores/state';

const ButtonsContainer = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
});

const ButtonWrapper = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '40px',
  height: '40px',
  borderRadius: '16px',
  backgroundColor: '#1C1F30',
  backdropFilter: 'blur(24px)',
  WebkitBackdropFilter: 'blur(24px)',
  cursor: 'pointer',
});

const Icon = styled('svg', {
  width: '24px',
  height: '24px',
  '& path': {
    fill: '#fff',
  },
});

const handleInfoClick = () => {
  $isNew.set(true);
  $storieIndex.set(0);
};

export const SettingsButtons: React.FC = () => (
  <ButtonsContainer>
    <ButtonWrapper onClick={handleInfoClick}>
      <Icon as={InfoIcon} />
    </ButtonWrapper>
    <Link to="/settings">
      <ButtonWrapper>
        <Icon as={SettingsIcon} />
      </ButtonWrapper>
    </Link>
  </ButtonsContainer>
);
