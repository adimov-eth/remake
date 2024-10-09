import { useTranslation } from 'react-i18next';
import { ConfirmDialog } from '@/shared/ui/ConfirmDialog';
import { BlurBackdrop } from '@shared/ui/BlurBackdrop';

import * as S from './CongratulationsDialog.styles';
import ChestPng from '@shared/assets/chest.png';
import ChestWebp from '@shared/assets/chest.webp';


interface CongratulationsDialogProps {
  reward: number | undefined;
  missionName: string;
  isOpen: boolean;
  onClose: () => void;
}

export const CongratulationsDialog = ({
  reward,
  missionName,
  isOpen,
  onClose,
}: CongratulationsDialogProps) => {
  const { t } = useTranslation('global');

  return (
    <ConfirmDialog
      onClose={onClose}
      isOpen={isOpen}
    >
      <S.ConfirmContent>
        <BlurBackdrop variant='pink'>
          <picture>
            <source
              srcSet={ChestWebp}
              type="image/webp"
            />
            <img src={ChestPng} alt={t('chest')} width={124} height={129} />
          </picture>
        </BlurBackdrop>
        <S.ConfirmTitle>{t('congratulations')}</S.ConfirmTitle>
        <S.ConfirmDescription>{t('secret_mission_completed', { reward_quarks: reward, mission_name: missionName })}</S.ConfirmDescription>
      </S.ConfirmContent>
    </ConfirmDialog>
  );
};
