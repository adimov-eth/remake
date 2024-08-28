import type { ComponentType, JSX } from 'react'

import Accelerators from '@/pages/Accelerators'
import Friends from '@/pages/Friends'
import Home from '@/pages/Home'
import Missions  from '@/pages/Missions'
import Profile from '@/pages/Profile'
import Settings from "@/pages/Settings"
import SwapPage from '@/pages/Swap'
import Onboarding from '@/components/Stories/OnboardingStories'

interface Route {
  path: string
  Component: ComponentType
  title?: string
  icon?: JSX.Element
}

export const routes: Route[] = [
  { path: '/', Component: Home },
  { path: '/friends', Component: Friends },
  { path: '/accelerators', Component: Accelerators },
  { path: '/missions', Component: Missions },
  { path: '/swap', Component: SwapPage },
  { path: '/profile', Component: Profile },
  { path: '/settings', Component: Settings },
  { path: '/onboarding', Component: Onboarding },
]
