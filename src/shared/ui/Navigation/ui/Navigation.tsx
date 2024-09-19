import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'

import Home from '@shared/assets/home.svg?react'
import Leaders from '@shared/assets/leaderboard.svg?react'
import Swap from '@shared/assets/swap.svg?react'
import Tasks from '@shared/assets/tasks.svg?react'
import Upgrades from '@shared/assets/upgrades.svg?react'
import { Link } from '@/shared/ui/Link/ui/Link'

import * as S from './Navigation.styles'

export const Navigation: FC = () => {
  const { t } = useTranslation('navigation')
  const location = useLocation()

  const navItems = [
    {
      path: '/',
      label: t('home'),
      icon: <Home className="icon" />,
    },
    {
      path: '/accelerators',
      label: t('boosts'),
      icon: <Upgrades className="icon" />,
    },
    {
      path: '/swap',
      label: t('swap'),
      icon: <Swap className="icon" />,
    },
    {
      path: '/missions',
      label: t('missions'),
      icon: <Tasks className="icon" />,
    },
    {
      path: '/friends',
      label: t('friends'),
      icon: <Leaders className="icon" />,
    },
  ]

  return (
    <S.Nav>
      <S.NavList>
        {navItems.map(({ path, label, icon }, index) => {
          return <S.NavListItem key={index}>{
            path === '/swap' 
              ? <S.SwapButton as={Link} to="/swap"><S.Icon><Swap className="icon" /></S.Icon></S.SwapButton>
              : <S.NavLink as={Link} to={path} className={location.pathname === path ? 'active' : ''}>
                    <S.Icon>{icon}</S.Icon>
                    <S.NavLinkText>{label}</S.NavLinkText>
                </S.NavLink>
          }</S.NavListItem>
        })}
      </S.NavList>
    </S.Nav>
  )
}