import { useStore } from '@nanostores/react'

import { user } from '@/stores/telegram'

import { AutoSizeText } from '@/components/Header/AutoSizeText'

import UserIcon from '@/assets/user.svg?react'

import styles from './user-logo.module.css'

export const UserLogo = () => {
  const telegramUser = useStore(user)

  return (
    <div className={styles.root}>
      <div className={styles.wrapper}>
        <UserIcon className={styles.icon} />
        <AutoSizeText className={styles.username} initialFontSize={14}>
          @
          {telegramUser
            ? telegramUser.username ||
              `${telegramUser.firstName} ${telegramUser.lastName}`
            : 'Username'}
        </AutoSizeText>
      </div>
    </div>
  )
}
