import { IndexPage } from '@/features/game/IndexPage/IndexPage'
import { TONConnectPage } from '@/features/user/TONConnectPage/TONConnectPage'

export const routes = [
  { path: '/', Component: IndexPage },
  { path: '/user/profile', Component: TONConnectPage, title: 'User Profile' },
]