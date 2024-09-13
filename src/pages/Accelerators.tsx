import React from 'react';
import { styled, keyframes } from '@/core/stitches.config';
import Rocket from "@/assets/accelerators.png"
import { useTranslation } from 'react-i18next';

import { Page, Banner, Content, Gradient, Title } from '@/components/Page';    
import Card from '@/components/AcceleratorCard';

import { useStore } from '@nanostores/react'
import { $accelerators } from '@/stores/state'

const Accelerators: React.FC = () => {
    const { t } = useTranslation('pages');

    const accelerators = useStore($accelerators)

    return (
        <Page>
            <Banner>
                <Gradient color="pink"/>
                <Illustration image={Rocket} />
            </Banner>
        
            <Title>{t('accelerators.title')}</Title>
            <Content>
                <Cards>
                    {accelerators.map((card, i) => (
                            <Card key={i} {...card} currency={"QRK"}/>
                        ))}
                    </Cards>
            </Content>
        </Page>
    );
};
  
export default Accelerators;


const Cards = styled('div', {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '12px',
})

const floating = keyframes({
    '0%, 100%': { transform: 'translate(0, 0) rotate(0deg)' },
    '10%': { transform: 'translate(15px, -10px) rotate(5deg)' },
    '20%': { transform: 'translate(-10px, 15px) rotate(-3deg)' },
    '30%': { transform: 'translate(20px, 5px) rotate(4deg)' },
    '40%': { transform: 'translate(-15px, -20px) rotate(-2deg)' },
    '50%': { transform: 'translate(10px, 20px) rotate(3deg)' },
    '60%': { transform: 'translate(-20px, 10px) rotate(-4deg)' },
    '70%': { transform: 'translate(15px, -15px) rotate(2deg)' },
    '80%': { transform: 'translate(-5px, 15px) rotate(-3deg)' },
    '90%': { transform: 'translate(20px, -5px) rotate(4deg)' },
  });

const IllustrationWrapper = styled('div', {
    height: '160px',
    width: '148px',
    position: 'relative',
    animation: `${floating} 60s ease-in-out infinite`,
    '& img': {
        position: 'absolute',
        top: '0',
        left: '0',
    }
});

const Illustration: React.FC<{ image: string }> = ({ image }) => {
    const { t } = useTranslation('pages');

    return (
        <IllustrationWrapper>
            <img src={image} alt={t('accelerators.title')} width="146" height="160" />
        </IllustrationWrapper>
    );
}