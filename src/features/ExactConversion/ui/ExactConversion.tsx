import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useModal } from '@shared/hooks';
import { useGetMissions, claimMissionReward } from '@shared/services/api/missions/model';
import { initDataRaw } from '@app/stores/telegram';

import { CongratulationsDialog } from '@features/CongratulationsDialog';

interface ExactConversionProps {
  quarks: number;
}

const MISSION_SLUG = 'exact_conversion';
const CorrectQuarks = 2048;

export const ExactConversion: React.FC<ExactConversionProps> = ({ quarks }) => {
  if (quarks !== CorrectQuarks) return null;

  const rawData = initDataRaw || '';
  const { data: missions, refetch } = useGetMissions({ enabled: !!rawData, variables: { rawData } });
  const { id, reward_quarks, progress_status, status } = missions?.find(({ slug }) => slug === MISSION_SLUG) || {};
  const isMissionAvailable = progress_status !== 'claimed_reward' && status !== 'unavailable';

  const { t } = useTranslation('global');
  const [isOpen, openModal, closeModal] = useModal();

  const handleClose = () => {
    refetch();
    closeModal();
  };

  useEffect(() => {
    if (isMissionAvailable && id) {
      claimMissionReward({ missionId: id, rawData: rawData });
      openModal();
    }
  }, [isMissionAvailable, id, rawData, openModal]);

  if (!isMissionAvailable) return null;

  return <CongratulationsDialog
    missionName={t('exact_conversion')}
    reward={reward_quarks}
    isOpen={isOpen}
    onClose={handleClose}
  />;
};