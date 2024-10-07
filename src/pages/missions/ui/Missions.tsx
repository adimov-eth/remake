 
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useStore } from '@nanostores/react';

import { $missions, $filteredAndSortedMissions, ResolvedMission } from '@app/stores/missions';
import { useAllMissions } from '@shared/services/api/missions/model';
import { initDataRaw } from '@app/stores/telegram';

import { MissionCard } from '@widgets/MissionCard';
import { Loader } from '@shared/ui/Loader';
import { Banner } from '@shared/ui/Banner';
import { Title } from '@shared/ui/Title';
import { BlurBackdrop } from '@shared/ui/BlurBackdrop';
import Preview from '@shared/assets/spaceman-run.png';

import * as S from './Missions.styles';

export const Missions: React.FC = () => {
  if (!initDataRaw) return null;
  const { data: fetchedMissions = [], isLoading } = useAllMissions(initDataRaw);
  const sortedMissions = useStore($filteredAndSortedMissions) as ResolvedMission[];

  const { t } = useTranslation('pages');

  useEffect(() => {
    if (fetchedMissions.length > 0) {
      $missions.set(fetchedMissions);
    }
  }, [fetchedMissions]);

  if (isLoading) return <Loader speed="slow" />;

  return (
    <>
      <Banner>
        <BlurBackdrop variant="purple">
          <Illustration>
            <img src={Preview} alt={t('missions.title')} width={100} height={160} />
          </Illustration>
          <Title>{t('missions.title')}</Title>
        </BlurBackdrop>
      </Banner>
      <S.MissionsContainer>
        <S.MissionCards>

          {sortedMissions.map((mission: ResolvedMission) => (
            <MissionCard key={mission.id} {...mission} />
          ))}

        </S.MissionCards>
      </S.MissionsContainer>
    </>
  );
};

interface IllustrationProps {
  children: React.ReactNode
}

const Illustration: React.FC<IllustrationProps> = ({ children }) => {
  return (
    <S.IllustrationWrapper>
      {children}
    </S.IllustrationWrapper>
  );
};
