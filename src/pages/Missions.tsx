/* eslint-disable react/prop-types */
import { FC, useEffect } from 'react'
import { styled, keyframes } from '@/core/stitches.config';
import { useStore } from '@nanostores/react'
import {Page, Banner, Content, Gradient, Title} from '@/components/Page'

import MissionsIcon from '@/assets/cosmo.webp'

import { $missions, $filteredAndSortedMissions, ResolvedMission } from '@/stores/missions'
import { useAllMissions } from '@/services/api/missions/model'
import { MissionCard } from "@/components/Missions/MissionCard"
import { Loader } from '@/components/Loader/Loader'


import { initDataRaw } from '@/stores/telegram'



export const Missions: FC = () => {

  if (!initDataRaw) return null
  const { data: fetchedMissions = [], isLoading } = useAllMissions(initDataRaw)
  const sortedMissions = useStore($filteredAndSortedMissions) as ResolvedMission[]

  useEffect(() => {
    if (fetchedMissions.length > 0) {
      $missions.set(fetchedMissions)
    }
  }, [fetchedMissions])

  if (isLoading) {
    return (
      <>
        <Loader speed="slow" />
      </>
    )
  }

  return (
    <Page>
        <Banner>
          <Gradient color="purple"/>
          <Illustration>
            <img src={MissionsIcon} alt="Missions" width={146} height={160}/>
          </Illustration>
        </Banner>
        <Title>Missions</Title>
        <Content>
          <MissionsContainer>
            <MissionCards>

              {sortedMissions.map((mission: ResolvedMission) => (
                <MissionCard key={mission.id} mission={mission} />
              ))}

            </MissionCards>
          </MissionsContainer>
        </Content>
    </Page>
  );
};

export default Missions;


export const MissionsContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
});

export const MissionCards = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$3',
});


const floating = keyframes({
  '0%, 100%': { transform: 'translate(0, 0) rotate(0deg)' },
  '10%': { transform: 'translate(15px, -10px) rotate(5deg)' },
  '20%': { transform: 'translate(-10px, 15px) rotate(-3deg)' },
  '30%': { transform: 'translate(20px, 5px) rotate(4deg)' },
  '40%': { transform: 'translate(-15px, -20px) rotate(-2deg)' },
  '50%': { transform: 'translate(10px, 20px) rotate(3deg)' },
  '60%': { transform: 'translate(-20px, 10px) rotate(-4deg)' },
  '70%': { transform: 'translate(15px, -15px) rotate(2deg)' },
  '80%': { transform: 'translate(-5px, 15px) rotate(-3deg)' },
  '90%': { transform: 'translate(20px, -5px) rotate(4deg)' },
});


const IllustrationWrapper = styled('div', {
  height: '160px',
  width: '148px',
  position: 'relative',
  animation: `${floating} 60s ease-in-out infinite`,
  '& img': {
      position: 'absolute',
      top: '0',
      left: '0',
  }
});

interface IllustrationProps {
  children: React.ReactNode
}



const Illustration: React.FC<IllustrationProps> = ({ children }) => {
  return (
    <IllustrationWrapper>
      {children}
    </IllustrationWrapper>
  );
};
