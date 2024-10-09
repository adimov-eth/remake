import React from 'react';
import { useTranslation } from 'react-i18next';
import { useStore } from '@nanostores/react';
import { $accelerators } from '@app/stores/state';

import { Banner } from '@shared/ui/Banner';
import { Title } from '@shared/ui/Title';
import { BlurBackdrop } from '@shared/ui/BlurBackdrop';
import { AcceleratorCard } from '@features/AcceleratorCard';

import * as S from './Accelerators.styles';
import Rocket from '@shared/assets/rocket.png';

export const Accelerators: React.FC = () => {
  const { t } = useTranslation('pages');

  const accelerators = useStore($accelerators);

  return (
    <>
      <Banner>
        <BlurBackdrop variant="pink">
          <Illustration image={Rocket} />
          <Title>{t('accelerators.title')}</Title>
        </BlurBackdrop>
      </Banner>
      <S.Cards>
        {accelerators.map((card, i) => (
          <AcceleratorCard key={i} {...card} currency={'QRK'} />
        ))}
      </S.Cards>
    </>
  );
};

const Illustration: React.FC<{ image: string }> = ({ image }) => {
  const { t } = useTranslation('pages');

  return (
    <S.IllustrationWrapper>
      <img src={image} alt={t('accelerators.title')} width="145" height="160" />
    </S.IllustrationWrapper>
  );
};