import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { useStore } from '@nanostores/react';
import { useUtils } from '@telegram-apps/sdk-react';

import { $user } from '@app/stores/state';

const APP_URL = import.meta.env.VITE_APP_URL;

const useShareRefferalLink = (text = '') => {
  const utils = useUtils();
  const telegramUser = useStore($user);
  const buildShareUrl = useCallback(() => {
    if (!telegramUser) return;
    return `${APP_URL}?startapp=refid${telegramUser.id}`;
  }, [telegramUser]);
  const { t } = useTranslation('global');

  const handleShare = useCallback(() => {
    const botStartUrlWithRefId = buildShareUrl();
    const shareUrl = `https://t.me/share/url?url=${botStartUrlWithRefId}&text=${text || t('join_me')}`;
    utils.openTelegramLink(shareUrl);
  }, [telegramUser, utils]);

  return {
    handleShare,
    buildShareUrl,
  };
};

export default useShareRefferalLink;
