import { FC, useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useStore } from '@nanostores/react';
import { $level } from '@app/stores/state';
import { LEVELS } from '@shared/services/websocket/clicker';

import { BlurBackdrop } from '@shared/ui/BlurBackdrop';
import { ConfirmDialog } from '@shared/ui/ConfirmDialog';

import * as S from './LevelUpModal.styles';

// TODO переделать это после рефакторинга логики кликера

export const LevelUpModal: FC = () => {
  const { t } = useTranslation('global');
  const currentLevel = useStore($level);
  const previousLevel = useRef<number>(0);
  const [isVisible, setIsVisible] = useState(false);
  const idx = Math.min(Math.max(currentLevel - 1, 0), LEVELS.length - 1);
  const { icon, name } = LEVELS[idx];

  useEffect(() => {
    if (currentLevel > 0 && currentLevel > previousLevel.current) {
      if (previousLevel.current > 0) {
        setIsVisible(true);
      }
      previousLevel.current = currentLevel;
    }
  }, [currentLevel]);

  const handleClose = () => {
    setIsVisible(false);
  };

  return (
    <ConfirmDialog
      isOpen={isVisible}
      onClose={handleClose}
    >
      <S.ConfirmContent>
        <BlurBackdrop variant={icon.variant} size="md">
          <S.ConfirmImgWrapper>
            <S.ConfirmImg src={icon.src} width={icon.width} height={icon.height}/>
          </S.ConfirmImgWrapper>
        </BlurBackdrop>
        <S.ConfirmTitle>{t('congratulations')}</S.ConfirmTitle>
        <S.ConfirmDescription>{t('you_reached_level', { rank: t(name) })}</S.ConfirmDescription>
      </S.ConfirmContent>
    </ConfirmDialog>
  );
};
