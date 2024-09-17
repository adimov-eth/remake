import { useStore } from '@nanostores/react'

import { $user } from '@app/stores/state'

import { AutoSizeText } from '@/shared/ui/Header/AutoSizeText'

import { UserIcon } from '@/shared/assets/icons'

import styles from './user-logo.module.css'

export const UserLogo = () => {
  const telegramUser = useStore($user)

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
