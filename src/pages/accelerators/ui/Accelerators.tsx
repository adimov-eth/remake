import React from 'react';
import { useTranslation } from 'react-i18next';
import { useStore } from '@nanostores/react'
import { $accelerators } from '@app/stores/state'

import { Page } from '@shared/ui/Page';
import { Banner } from '@shared/ui/Banner';
import { Content } from '@shared/ui/Content';
import { Title } from '@shared/ui/Title';
import { BlurBackdrop } from '@shared/ui/BlurBackdrop';
import { AcceleratorCard } from '@features/AcceleratorCard';

import Rocket from "@shared/assets/accelerators.png"
import * as S from './Accelerators.styles';

export const Accelerators: React.FC = () => {
    const { t } = useTranslation('pages');

    const accelerators = useStore($accelerators)

    return (
        <Page>
            <Banner>
                <BlurBackdrop variant="pink">
                    <Illustration image={Rocket} />
                    <Title>{t('accelerators.title')}</Title>
                </BlurBackdrop>
            </Banner>
        
            <Content>
                <S.Cards>
                    {accelerators.map((card, i) => (
                        <AcceleratorCard key={i} {...card} currency={"QRK"}/>
                    ))}
                </S.Cards>
            </Content>
        </Page>
    );
};

const Illustration: React.FC<{ image: string }> = ({ image }) => {
    const { t } = useTranslation('pages');

    return (
        <S.IllustrationWrapper>
            <img src={image} alt={t('accelerators.title')} width="145" height="160" />
        </S.IllustrationWrapper>
    );
}