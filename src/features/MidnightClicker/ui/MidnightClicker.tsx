import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useModal } from '@shared/hooks';
import { useGetMissions, claimMissionReward } from '@shared/services/api/missions/model';
import { initDataRaw } from '@app/stores/telegram';

import { CongratulationsDialog } from '@features/CongratulationsDialog';
import { TimeSlotViewer } from '@shared/ui/TimeSlotViewer';
import * as S from './MidnightClicker.styles';

const MISSION_SLUG = 'midnight_clicker';

export const MidnightClicker: React.FC = () => {
  const { t } = useTranslation('global');
  const [isOpen, openModal, closeModal] = useModal();
  const rawData = initDataRaw || '';
  const { data: missions, refetch } = useGetMissions({ enabled: !!rawData, variables: { rawData } });
  const [isMissionAvailable, setIsMissionAvailable] = useState(false);
  const [missionData, setMissionData] = useState<{ id: string; reward_quarks: number } | null>(null);

  useEffect(() => {
    const mission = missions?.find(({ slug }) => slug === MISSION_SLUG);
    if (mission) {
      setIsMissionAvailable(mission.progress_status !== 'claimed_reward' && mission.status !== 'unavailable');
      setMissionData({ id: mission.id, reward_quarks: mission.reward_quarks });
    }
  }, [missions]);

  const handleClick = () => {
    if (missionData) {
      claimMissionReward({ missionId: missionData.id, rawData: rawData });
      openModal();
    }
  };

  const handleClose = () => {
    refetch();
    closeModal();
    setIsMissionAvailable(false);
  };

  if (!isMissionAvailable) return null;

  return (
    <TimeSlotViewer>
      <S.Button type="button" onClick={handleClick} />
      <CongratulationsDialog
        missionName={t('midnight_clicker')}
        reward={missionData?.reward_quarks}
        isOpen={isOpen}
        onClose={handleClose}
      />
    </TimeSlotViewer>
  );
};