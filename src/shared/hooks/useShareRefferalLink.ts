import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { useStore } from '@nanostores/react';
import { useUtils } from '@telegram-apps/sdk-react';

import { $user } from '@app/stores/state';

const APP_URL = import.meta.env.VITE_APP_URL;

const useShareRefferalLink = (text = '') => {
  const { t } = useTranslation('global');
  const telegramUser = useStore($user);
  const utils = useUtils();

  const buildShareUrl = useCallback(() => {
    if (telegramUser) return `${APP_URL}?startapp=refid${telegramUser.id}`;
  }, [telegramUser]);

  const handleShare = useCallback(() => {
    const botStartUrlWithRefId = buildShareUrl();
    const encodedText = encodeURIComponent(text || t('join_me'));
    const shareUrl = `https://t.me/share/url?url=${botStartUrlWithRefId}&text=${encodedText}`;
    utils.openTelegramLink(shareUrl);
  }, [buildShareUrl, utils, t, text]);

  return {
    handleShare,
    buildShareUrl,
  };
};

export default useShareRefferalLink;
