 
import React from 'react';
import { useTranslation } from 'react-i18next';

import { MissionsList } from '@widgets/MissionsList';
import { Banner } from '@shared/ui/Banner';
import { Title } from '@shared/ui/Title';
import { BlurBackdrop } from '@shared/ui/BlurBackdrop';
import Preview from '@shared/assets/spaceman-run.png';

import * as S from './Missions.styles';

export const MissionsPage: React.FC = () => {
  const { t } = useTranslation('pages');

  return (
    <>
      <Banner>
        <BlurBackdrop variant="purple">
          <S.IllustrationWrapper>
            <img src={Preview} alt={t('missions.title')} width={100} height={160} />
          </S.IllustrationWrapper>
          <Title>{t('missions.title')}</Title>
        </BlurBackdrop>
      </Banner>
      <MissionsList />
    </>
  );
};