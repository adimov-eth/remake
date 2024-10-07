import React from 'react';
import { useTranslation } from 'react-i18next';

import AppQR from '@shared/assets/qr/app.svg';

import * as S from './WebBlocker.styles';

export const WebBlocker: React.FC = () => {
  const { t } = useTranslation('global');
  const text = t('play_on_mobile');
  const tgUsername = t('telegram_username');
  const tgLinkPostfix = '/app';
  const tgLink = `https://t.me/${tgUsername}${tgLinkPostfix}`;

  return (
    <S.Container>
      <S.Text>{text}</S.Text>
      <S.QRCodeLink href={tgLink}>
        <S.QRCode>
          <img src={AppQR} alt={t('qr_code')} />
        </S.QRCode>
      </S.QRCodeLink>
      <S.Text as="a" href={tgLink}>
        @{tgUsername}
      </S.Text>
    </S.Container>
  );
};