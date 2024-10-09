import React, { useEffect } from 'react';
import { useStore } from '@nanostores/react';
import { initDataRaw } from '@app/stores/telegram';
import { useAllMissions } from '@shared/services/api/missions/model';
import { $missions, $filteredAndSortedMissions, ResolvedMission } from '@app/stores/missions';

import { Loader } from '@shared/ui/Loader';
import { MissionCard } from '@widgets/MissionCard';

import * as S from './MissionsList.styles';

export const MissionsList: React.FC = () => {
  const rawData = initDataRaw || '';
  const { data: fetchedMissions = [], isLoading } = useAllMissions(rawData);
  const sortedMissions = useStore($filteredAndSortedMissions) as ResolvedMission[];

  useEffect(() => {
    if (fetchedMissions.length > 0) {
      $missions.set(fetchedMissions);
    }
  }, [fetchedMissions]);

  if (isLoading) return <Loader speed="slow" />;

  return (
    <S.List>
      {sortedMissions.map((mission: ResolvedMission) => (
        <S.ListItem key={mission.id}>
          <MissionCard {...mission} />
        </S.ListItem>
      ))}
    </S.List>
  );
};
