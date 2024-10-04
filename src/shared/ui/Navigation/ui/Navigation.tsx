import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

import Home from '@shared/assets/home.svg?react';
import Leaders from '@shared/assets/leaderboard.svg?react';
import Swap from '@shared/assets/swap-currency.svg?react';
import Tasks from '@shared/assets/tasks.svg?react';
import Upgrades from '@shared/assets/upgrades.svg?react';


import * as S from './Navigation.styles';

const navRoutes = [
  {
    path: '/',
    label: 'home',
    icon: <Home />,
  },
  {
    path: '/accelerators',
    label: 'boosts',
    icon: <Upgrades />,
  },
  {
    path: '/swap',
    label: 'swap',
    icon: <Swap />,
  },
  {
    path: '/missions',
    label: 'missions',
    icon: <Tasks />,
  },
  {
    path: '/friends',
    label: 'friends',
    icon: <Leaders />,
  },
];

export const Navigation: FC = () => {
  const { t } = useTranslation('navigation');
  const location = useLocation();

  return (
    <S.Nav>
      <S.NavList>
        {navRoutes.map(({ path, label, icon }, idx) => {
          return <S.NavListItem key={idx}>{
            path === '/swap'
              ? <S.SwapButton to="/swap"><S.Icon as={Swap} /></S.SwapButton>
              : <S.NavLink to={path} active={location.pathname === path}>
                <S.Icon>{icon}</S.Icon>
                <S.NavLinkText>{t(label)}</S.NavLinkText>
              </S.NavLink>
          }</S.NavListItem>;
        })}
      </S.NavList>
    </S.Nav>
  );
};