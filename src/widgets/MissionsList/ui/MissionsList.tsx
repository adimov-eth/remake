import { FC, Fragment, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useStore } from '@nanostores/react';
import { initDataRaw } from '@app/stores/telegram';
import { useAllMissions } from '@shared/services/api/missions/model';
import { $missions, $filteredAndSortedMissions, ResolvedMission } from '@app/stores/missions';
import { MissionType } from '@shared/services/api/missions/types';

import { Loader } from '@shared/ui/Loader';
import { MissionCard } from '@widgets/MissionCard';
import { DailyMissionCard } from '@widgets/DailyMissionCard';

import * as S from './MissionsList.styles';

type MissionCategory = {
  title: string;
  list: ResolvedMission[];
};

type MissionCategories = {
  [key in MissionType]: MissionCategory;
};


export const MissionsList: FC = () => {
  const { t } = useTranslation('global');
  const rawData = initDataRaw || '';
  const { data: fetchedMissions = [], isLoading } = useAllMissions(rawData);
  const sortedMissions = useStore($filteredAndSortedMissions) as ResolvedMission[];

  const missionCategories = useMemo(() => {
    const categories: MissionCategories = {
      'daily': { title: t('missions_list.daily'), list: [] },
      'milestone': { title: t('missions_list.milestone'), list: [] },
      'special': { title: t('missions_list.special'), list: [] },
      'social': { title: t('missions_list.social'), list: [] },
      'secret': { title: t('missions_list.secret'), list: [] },
    };

    sortedMissions.forEach((mission) => mission.mission_type && categories[mission.mission_type].list.push(mission));

    return categories;
  }, [sortedMissions, t]);

  useEffect(() => {
    if (fetchedMissions.length === 0) return;

    $missions.set(fetchedMissions);
  }, [fetchedMissions]);

  if (isLoading) return <Loader speed="slow" />;

  return (
    <>
      {Object.values(missionCategories).map((category) => (
        <MissionCategory key={category.title} category={category} />
      ))}
    </>
  );
};

const MissionCategory: FC<{ category: MissionCategory }> = ({ category }) => (
  <S.Category key={category.title}>
    <S.CategoryTitle>{category.title}</S.CategoryTitle>
    {category.list.length > 0 && (
      <S.List>
        {category.list.map((mission, idx) => (
          <Fragment key={mission.id}>
            {mission.mission_type === MissionType.DAILY && idx === 0 && (
              <S.ListItem><DailyMissionCard {...mission}/></S.ListItem>
            )}
            <S.ListItem><MissionCard {...mission}/></S.ListItem>
          </Fragment>
        ))}
      </S.List>
    )}
  </S.Category>
);