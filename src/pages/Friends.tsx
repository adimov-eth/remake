import React from 'react';
import { styled, keyframes } from '@/core/stitches.config';
import { Page, Banner, Content, Gradient, Title } from '@/components/Page';
import FriendsList from '@/components/FriendsList';
import { friends1, friends2 } from '@/assets';
import { useTranslation } from 'react-i18next';

const Friends: React.FC = () => {
  const { t } = useTranslation('pages');

  return (
    <Page>
    <Banner>
      <Gradient color="blue" />
      <Illustration>
        <FriendImage src={friends2} alt={t('friends.title')} position="close" />
        <FriendImage src={friends1} alt={t('friends.title')} position="far" />
      </Illustration>
    </Banner>
    <Title>{t('friends.title')}</Title>
    <Content>
      <FriendsList />
    </Content>
    </Page>
  );
};

export default Friends;

// Animations
const floatClose = keyframes({
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

const floatFar = keyframes({
  '0%, 100%': { transform: 'translate(0, 0) rotate(0deg)' },
  '10%': { transform: 'translate(5px, -2px) rotate(2deg)' },
  '20%': { transform: 'translate(0px, 3px) rotate(-1deg)' },
  '30%': { transform: 'translate(5px, 0px) rotate(2deg)' },
  '40%': { transform: 'translate(-3px, -7px) rotate(-1deg)' },
  '50%': { transform: 'translate(2px, 8px) rotate(1deg)' },
  '60%': { transform: 'translate(-6px, 2px) rotate(-2deg)' },
  '70%': { transform: 'translate(5px, -5px) rotate(1deg)' },
  '80%': { transform: 'translate(0px, 4px) rotate(-1deg)' },
  '90%': { transform: 'translate(6px, 0px) rotate(2deg)' },
});

// Styled Components
const Illustration = styled('div', {
  height: '160px',
  width: '148px',
  position: 'relative',
});

const FriendImage = styled('img', {
  position: 'absolute',
  top: 0,
  left: 0,
  zIndex: 1,
  variants: {
    position: {
      close: {
        animation: `${floatClose} 60s ease-in-out infinite`,
        zIndex: 2,
        width: '103px',
        height: '143px',
        left: '-5px',
      },
      far: {
        width: '76px',
        height: '100px',
        top: '20px',
        left: '55px',
        opacity: 0.9,
        animation: `${floatFar} 45s ease-in-out infinite`,
      },
    },
  },
});
