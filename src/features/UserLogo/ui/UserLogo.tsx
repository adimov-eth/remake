import { useStore } from '@nanostores/react';
import { $user } from '@app/stores/state';

import * as S from './UserLogo.styles';
import { UserIcon } from '@shared/assets/icons';

export const UserLogo = () => {
  const telegramUser = useStore($user);

  const username = telegramUser
    ? telegramUser.username ||
      `${telegramUser.firstName} ${telegramUser.lastName}`
    : 'Username';

  return (
    <S.UserLogoRoot>
      <S.UserLogoWrapper>
        <S.UserLogoIcon as={UserIcon} />
        <S.UserLogoUsername>
          @{username}
        </S.UserLogoUsername>
      </S.UserLogoWrapper>
    </S.UserLogoRoot>
  );
};
