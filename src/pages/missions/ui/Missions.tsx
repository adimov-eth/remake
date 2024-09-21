/* eslint-disable react/prop-types */
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next';
import { useStore } from '@nanostores/react'

import { $missions, $filteredAndSortedMissions, ResolvedMission } from '@app/stores/missions'
import { useAllMissions } from '@shared/services/api/missions/model'
import { initDataRaw } from '@app/stores/telegram'

import { Loader } from '@shared/ui/Loader'
import { MissionCard } from "@shared/ui/MissionCard"
import { Page } from '@shared/ui/Page';
import { Banner } from '@shared/ui/Banner';
import { Content } from '@shared/ui/Content';
import { Title } from '@shared/ui/Title';
import { BlurBackdrop } from '@shared/ui/BlurBackdrop'
import MissionsIcon from '@shared/assets/cosmo.webp'

import * as S from './Missions.styles'

export const Missions: React.FC = () => {
  if (!initDataRaw) return null
  const { data: fetchedMissions = [], isLoading } = useAllMissions(initDataRaw)
  const sortedMissions = useStore($filteredAndSortedMissions) as ResolvedMission[]

  const { t } = useTranslation('pages');

  useEffect(() => {
    if (fetchedMissions.length > 0) {
      $missions.set(fetchedMissions)
    }
  }, [fetchedMissions])

  if (isLoading) return <Loader speed="slow" />

  return (
    <Page>
        <Banner>
          <BlurBackdrop variant="purple">
            <Illustration>
              <img src={MissionsIcon} alt={t('missions.title')} width={146} height={160}/>
            </Illustration>
            <Title>{t('missions.title')}</Title>
          </BlurBackdrop>
        </Banner>
        <Content>
          <S.MissionsContainer>
            <S.MissionCards>

              {sortedMissions.map((mission: ResolvedMission) => (
                <MissionCard key={mission.id} mission={mission} />
              ))}

            </S.MissionCards>
          </S.MissionsContainer>
        </Content>
    </Page>
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
