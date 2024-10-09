import { useTranslation } from 'react-i18next';
import { useModal } from '@shared/hooks';
import { useGetMissions, claimMissionReward } from '@shared/services/api/missions/model';
import { initDataRaw } from '@app/stores/telegram';

import { CongratulationsDialog } from '@features/CongratulationsDialog';

import * as S from './EasterEggHunter.styles';
import StarSecret from '@shared/assets/star-secret.svg?react';

const MISSION_SLUG = 'easter_egg_hunter';

export const EasterEggHunter = () => {
  const rawData = initDataRaw || '';
  const { data: missions, refetch } = useGetMissions({ enabled: !!rawData, variables: { rawData } });
  const { id, reward_quarks, progress_status, status } = missions?.find(({ slug }) => slug === MISSION_SLUG) || {};
  const isMissionAvailable = progress_status !== 'claimed_reward' && status !== 'unavailable';

  const { t } = useTranslation('global');
  const [isOpen, openModal, closeModal] = useModal();

  const handleClick = () => {
    claimMissionReward({ missionId: id || '', rawData: rawData });
    openModal();
  };

  const handleClose = () => {
    refetch();
    closeModal();
  };

  if (!isMissionAvailable) return null;

  return (
    <>
      <S.Button type="button" onClick={handleClick}>
        <S.Icon as={StarSecret} />
      </S.Button>
      <CongratulationsDialog
        missionName={t('easter_egg_hunter')}
        reward={reward_quarks}
        isOpen={isOpen}
        onClose={handleClose}
      />
    </>
  );
};