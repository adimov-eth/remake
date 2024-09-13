import { FC, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation, Link } from 'react-router-dom'

import Home from '@/assets/home.svg?react'
import Leaders from '@/assets/leaderboard.svg?react'
import Swap from '@/assets/swap.svg?react'
import Tasks from '@/assets/tasks.svg?react'
import Upgrades from '@/assets/upgrades.svg?react'


import { styled } from '@/core/stitches.config';

export const Navigation: FC = () => {
  const { t } = useTranslation('navigation')
  const location = useLocation()
  const [activeIndex, setActiveIndex] = useState(-1)

  const navItems = [
    {
      path: '/',
      label: t('home'),
      icon: <Home className="icon" />,
    },
    {
      path: '/accelerators',
      label: t('accelerators'),
      icon: <Upgrades className="icon" />,
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

  useEffect(() => {
    const currentIndex = navItems.findIndex(
      (item) => item.path === location.pathname
    )
    if (
      ['/', '/friends', '/accelerators', '/missions'].includes(
        location.pathname
      )
    ) {
      setActiveIndex(currentIndex)
    } else {
      setActiveIndex(-1)
    }
  }, [location.pathname])

  return (
    <NavRoot>
      <NavContainer>
        <NavGroup>
          {navItems.slice(0, 2).map((item, index) => (
            <NavItem
              as={Link}
              to={item.path}
              key={index}
              className={activeIndex === index ? 'active' : ''}
              onClick={() => setActiveIndex(index)}
            >
              <Icon>{item.icon}</Icon>
              <span>{item.label}</span>
            </NavItem>
          ))}
        </NavGroup>
        <SwapContainer>
          <SwapButton as={Link} to="/swap">
            <Icon>
              <Swap className="icon" />
            </Icon>
          </SwapButton>
        </SwapContainer>
        <NavGroup>
          {navItems.slice(2).map((item, index) => (
            <NavItem
              as={Link}
              to={item.path}
              key={index + 2}
              className={activeIndex === index + 2 ? 'active' : ''}
              onClick={() => setActiveIndex(index + 2)}
            >
              <Icon>{item.icon}</Icon>
              <span>{item.label}</span>
            </NavItem>
          ))}
        </NavGroup>
      </NavContainer>
    </NavRoot>
  )
}



export const NavRoot = styled('nav', {
  position: 'fixed',
  bottom: 0,
  left: 0,
  right: 0,
  justifyContent: 'center',
  // zIndex: 2,
  pointerEvents: 'none',
  paddingBottom: '24px',
  borderTop: '1px solid $navBorder',
  borderRadius: '32px 32px 0 0',
  background: '$navBackground',
  boxShadow: '0 4px 24px $navShadow',
  borderImageSource: 'linear-gradient(181.98deg, $navBorderGradientStart 1.46%, $navBorderGradientEnd 98.13%)',
  backdropFilter: 'blur(24px)',
  WebkitBackdropFilter: 'blur(24px)',
});

export const NavContainer = styled('div', {
  pointerEvents: 'all',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: '2vw',
  position: 'relative',
  padding: '0 2vw',
});

export const NavGroup = styled('div', {
  display: 'flex',
  justifyContent: 'space-around',
  alignItems: 'center',
  flex: 1,
});

export const NavItem = styled('a', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  height: 'auto',
  marginTop: '14px',
  flex: 'none',

  span: {
    fontSize: '2.5vw',
    textAlign: 'center',
    color: '$textInactive',
  },

  '&.active': {
    span: {
      color: '$textActive',
    },
    '.icon path': {
      fill: 'white',
    },
  },
});

export const Icon = styled('div', {
  minWidth: '7vw !important',
  minHeight: '7vw !important',
});

export const SwapContainer = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flex: '0 0 auto',
});

export const SwapButton = styled('a', {
  background: 'linear-gradient(90deg, $swapGradientStart 0%, $swapGradientEnd 100%)',
  minWidth: '17vw',
  minHeight: '17vw',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});