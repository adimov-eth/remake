import React from 'react';
import { useTranslation } from 'react-i18next';

import {star,quark, swapCurrency} from '@/assets';


import { styled } from '@/core/stitches.config';
import { StoryContainer, Content, Title, Description, Button, StoryContentProps } from './BaseStory';

import { $locale } from '@/stores/state';

type SwapAndStakeStoryProps = Omit<StoryContentProps, 'story'>;

export const SwapAndStakeStory: React.FC<SwapAndStakeStoryProps> = ({ action }) => {
  const { t } = useTranslation('onboarding', { useSuspense: false, lng: $locale.get() });

  const title = t('swapAndStake.title', 'Swap and Stake');
  const description = t('swapAndStake.description', 'Swap your Quarks for rare Stars on the Swap page. Use our dual token system to maximize your rewards and advance quickly in TON Stars. Remember to stake your Stars, You will surely need them later!');
  const buttonText = t('swapAndStake.nextButton', 'Next');

  return (
    <Container>
      <Content>
        <Title>{title}</Title>
        <Description>{description}</Description>
        <SwapInterface>
          <Frame>
            <FrameTitle>Sell</FrameTitle>
            <AmountFrame>
              <Amount>29840,56</Amount>
              <CurrencyFrame>
                <MaxButton>Max</MaxButton>
                <Currency>
                  <QuarkIcon></QuarkIcon>
                  <CurrencyName>QRK</CurrencyName>
                </Currency>
              </CurrencyFrame>
            </AmountFrame>
          </Frame>
          <SwapIcon></SwapIcon>
          <Frame>
            <FrameTitle>Buy</FrameTitle>
            <AmountFrame>
              <Amount>42,3</Amount>
              <CurrencyFrame>
                <MaxButton>Max</MaxButton>
                <Currency>
                  <StarIcon></StarIcon>
                  <CurrencyName>STR</CurrencyName>
                </Currency>
              </CurrencyFrame>
            </AmountFrame>
          </Frame>
        </SwapInterface>
        <Button onClick={() => action('next')}>
          {buttonText}
        </Button>
      </Content>
    </Container>
    );
};


const Container = styled(StoryContainer, {
  backgroundColor: 'rgba(11, 12, 20, 0.25)',
})



export const SwapInterface = styled('div', {
  position: 'absolute',
  left: '5%',
  bottom: '20%',
  width: '90%',
  height: '202px',
});

const Frame = styled('div', {
  width: '100%',
  height: '96px',
  backgroundColor: 'rgba(13, 15, 32, 0.9)',
  borderRadius: '10px',
  marginBottom: '10px',
  padding: '20px 16px',
});


export const FrameTitle = styled('div', {
  fontFamily: 'SF Pro, sans-serif',
  fontWeight: 400,
  fontSize: '16px',
  color: 'rgba(255, 255, 255, 1)',
  textAlign: 'left',
});

export const AmountFrame = styled('div', {
  display: 'flex',
  fontFamily: 'SF Pro, sans-serif',
  fontWeight: 400,
  justifyContent: 'space-between',
  alignItems: 'center',
  marginTop: '10px',
});

export const Amount = styled('span', {
  fontFamily: 'SF Pro, sans-serif',
  fontSize: '24px',
  color: 'rgba(255, 255, 255, 1)',
});

export const CurrencyFrame = styled('div', {
  display: 'flex',
  alignItems: 'center',
});

export const MaxButton = styled('button', {
  width: '42px',
  height: '22px',
  backgroundColor: 'rgba(46, 85, 251, 1)',
  borderRadius: '5px',
  fontFamily: 'SF Pro Display, sans-serif',
  fontSize: '12px',
  color: 'rgba(255, 255, 255, 1)',
  border: 'none',
  cursor: 'pointer',
  marginRight: '6px',
});

export const Currency = styled('div', {
  display: 'flex',
  alignItems: 'center',
  backgroundColor: 'rgba(28, 31, 48, 1)',
  borderRadius: '12px',
  padding: '5px 10px',
});

const Icon = styled('div', {
  width: '18px',
  height: '18px',
  marginRight: '4px',
});

export const QuarkIcon = styled(Icon, {
  background: `url(${quark}) no-repeat center center`,
  borderRadius: '50%',
});

export const StarIcon = styled(Icon, {
  background: `url(${star}) no-repeat center center`,
  backgroundSize: 'contain',
});

export const CurrencyName = styled('span', {
  fontFamily: 'SF Pro Display, sans-serif',
  fontSize: '12px',
  color: 'rgba(255, 255, 255, 1)',
});

export const SwapIcon = styled('div', {
  position: 'absolute',
  left: '50%',
  top: '50%',
  transform: 'translate(-50%, -50%)',
  width: '40px',
  height: '40px',
  backgroundColor: 'rgba(255, 255, 255, 1)',
  mask: `url(${swapCurrency}) no-repeat center / contain`,
});

// export const Button = styled('button', {
//   position: 'absolute',
//   left: '5%',
//   bottom: '5%',
//   width: '90%',
//   height: '54px',
//   background: 'linear-gradient(0deg, rgba(28, 231, 253, 1) 0%, rgba(54, 90, 229, 1) 100%)',
//   borderRadius: '14px',
//   boxShadow: '0px 0px 15px rgba(42, 158, 241, 1)',
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'center',
//   border: 'none',
//   cursor: 'pointer',
// });

// export const ButtonText = styled('span', {
//   fontFamily: 'SF Pro Display, sans-serif',
//   fontWeight: 'bold',
//   fontSize: '19px',
//   color: 'rgba(255, 255, 255, 1)',
// });