import { useTranslation } from 'react-i18next';
import { useCopyToClipboard } from 'usehooks-ts';
import { useShareRefferalLink, useClickNotification } from '@shared/hooks';
import { SuccessNotification, ErrorNotification } from '@shared/ui/Notification';

import { Button } from '@shared/ui/Button';

import * as S from './InviteFriendsPanel.styles';
import LinkIcon from '@shared/assets/link.svg?react';
import UsersIcon from '@shared/assets/users.svg?react';

export const InviteFriendsPanel = () => {
  const { t } = useTranslation('global');
  const { notifyUser } = useClickNotification('');
  const { handleShare, buildShareUrl } = useShareRefferalLink();
  const [, copy] = useCopyToClipboard();
  const refUrl = buildShareUrl() || '';

  const handleCopy = (text: string) => () => {
    copy(text)
      .then(() => {
        SuccessNotification(t('copied_to_clipboard'));
        notifyUser();
      })
      .catch(() => {
        ErrorNotification(t('failed_to_copy'));
      });
  };

  return (
    <S.Root>
      <Button onClick={handleShare}><S.ButtonIcon as={UsersIcon} /><span>{t('invite_friends')}</span></Button>
      <Button onClick={handleCopy(refUrl)}><S.Icon as={LinkIcon} /></Button>
    </S.Root>
  );
};
