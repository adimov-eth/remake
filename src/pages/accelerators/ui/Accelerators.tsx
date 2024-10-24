import React from 'react';
import { useTranslation } from 'react-i18next';

import { Banner } from '@shared/ui/Banner';
import { Title } from '@shared/ui/Title';
import { BlurBackdrop } from '@shared/ui/BlurBackdrop';
import { AcceleratorsList } from '@widgets/AcceleratorsList';

import * as S from './Accelerators.styles';
import Rocket from '@shared/assets/rocket.png';

export const AcceleratorsPage: React.FC = () => {
  const { t } = useTranslation('pages');

  return (
    <>
      <Banner>
        <BlurBackdrop variant="pink">
          <S.IllustrationWrapper>
            <img src={Rocket} alt={t('accelerators.title')} width="145" height="160" />
          </S.IllustrationWrapper>
          <Title>{t('accelerators.title')}</Title>
        </BlurBackdrop>
      </Banner>
      <AcceleratorsList />
    </>
  );
};