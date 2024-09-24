import { useStore } from '@nanostores/react'
import { $user } from '@app/stores/state'

import * as S from './UserLogo.styles'

export const UserLogo = () => {
  const telegramUser = useStore($user)

  return (
    <S.UserLogoRoot>
      <S.UserLogoWrapper>
        <S.UserLogoIcon />
        <S.UserLogoUsername initialFontSize={14}>
          @
          {telegramUser
            ? telegramUser.username ||
              `${telegramUser.firstName} ${telegramUser.lastName}`
            : 'Username'}
        </S.UserLogoUsername>
      </S.UserLogoWrapper>
    </S.UserLogoRoot>
  )
}
