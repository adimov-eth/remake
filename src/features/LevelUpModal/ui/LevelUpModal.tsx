import { FC, useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useStore } from '@nanostores/react';
import { $level } from '@app/stores/state';
import { LEVELS } from '@shared/services/websocket/clicker';

import { BlurBackdrop, BlurBackdropVariant } from '@shared/ui/BlurBackdrop';
import { ConfirmDialog } from '@shared/ui/ConfirmDialog';

import * as S from './LevelUpModal.styles';

import { 
  protostar, 
  brownDwarf, 
  redDwarf, 
  whiteDwarf, 
  redGiant, 
  blueGiant, 
  supergiant, 
  neutronStar, 
  supernova, 
  blackHole,
} from '@shared/assets';

type LevelIcon = {
  src: string;
  width: number;
  height: number;
  variant: BlurBackdropVariant;
};

const levelIcons: LevelIcon[] = [
  {
    src: protostar,
    width: 178,
    height: 120,
    variant: 'blue',
  },
  {
    src: brownDwarf,
    width: 134,
    height: 134,
    variant: 'brown',
  },
  {
    src: redDwarf,
    width: 134,
    height: 134,
    variant: 'red',
  },
  {
    src: whiteDwarf,
    width: 134,
    height: 134,
    variant: 'white',
  },
  {
    src: redGiant,
    width: 143,
    height: 120,
    variant: 'red',
  },
  {
    src: blueGiant,
    width: 143,
    height: 120,
    variant: 'blue',
  },
  {
    src: supergiant,
    width: 160,
    height: 130,
    variant: 'blue',
  },
  {
    src: neutronStar,
    width: 160,
    height: 160,
    variant: 'orange',
  },
  {
    src: supernova,
    width: 134,
    height: 134,
    variant: 'pink',
  },
  {
    src: blackHole,
    width: 240,
    height: 240,
    variant: 'black',
  },
];

// TODO переделать это после рефакторинга логики кликера

export const LevelUpModal: FC = () => {
  const { t } = useTranslation('global');
  const currentLevel = useStore($level);
  const previousLevel = useRef<number>();
  const [isVisible, setIsVisible] = useState(false);
  const idx = Math.min(Math.max(currentLevel - 1, 0), LEVELS.length - 1);
  const levelIcon = levelIcons[idx];
  const levelName = LEVELS[currentLevel].name;

  useEffect(() => {
    if (!currentLevel) return;

    if (previousLevel.current && currentLevel !== previousLevel.current) setIsVisible(true);

    previousLevel.current = currentLevel;
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
        <BlurBackdrop variant={levelIcon.variant} size="md">
          <S.ConfirmImgWrapper>
            <S.ConfirmImg src={levelIcon.src} width={levelIcon.width} height={levelIcon.height}/>
          </S.ConfirmImgWrapper>
        </BlurBackdrop>
        <S.ConfirmTitle>{t('congratulations')}</S.ConfirmTitle>
        <S.ConfirmDescription>{t('you_reached_level', { rank: t(levelName) })}</S.ConfirmDescription>
      </S.ConfirmContent>
    </ConfirmDialog>
  );
};
