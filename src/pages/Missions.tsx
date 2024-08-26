import { FC, useEffect } from 'react'
import PropTypes from 'prop-types'
import { styled, keyframes } from '@/core/styles/stitches.config';
import { useStore } from '@nanostores/react'
import {Page, Banner, Content, Gradient, Title} from '@/components/Page'

import Friends1 from '@/assets/friends1.png'
import Friends2 from '@/assets/friends2.png'

import { $missions, $resolvedMissions } from '@/stores/missions'
import { useAllMissions } from '@/services/api/missions/model'
import { MissionCard } from "@/components/Missions/MissionCard/MissionCard"
import { Loader } from '@/components/Loader/Loader'

import { initDataRaw } from '@/stores/telegram'


export const Missions: FC = () => {

  if (!initDataRaw) return null
  const { data: fetchedMissions = [], isLoading } = useAllMissions(initDataRaw)
  const sortedMissions = useStore($resolvedMissions)

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
            <img src={Friends1} alt="Friends1" width={103} height={143}/>
            <img src={Friends2} alt="Friends2" width={76} height={100}/>
          </Illustration>
        </Banner>
        <Title>Missions</Title>
        <Content>
          <MissionsContainer>
            <MissionCards>

              {sortedMissions.map((mission) => (
                <MissionCard key={mission.id} {...mission} />
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


const floatClose = keyframes({
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

const floatFar = keyframes({
  '0%, 100%': { transform: 'translate(0, 0) rotate(0deg)' },
  '10%': { transform: 'translate(5px, -2px) rotate(2deg)' },
  '20%': { transform: 'translate(0px, 3px) rotate(-1deg)' },
  '30%': { transform: 'translate(5px, 0px) rotate(2deg)' },
  '40%': { transform: 'translate(-3px, -7px) rotate(-1deg)' },
  '50%': { transform: 'translate(2px, 8px) rotate(1deg)' },
  '60%': { transform: 'translate(-6px, 2px) rotate(-2deg)' },
  '70%': { transform: 'translate(5px, -5px) rotate(1deg)' },
  '80%': { transform: 'translate(0px, 4px) rotate(-1deg)' },
  '90%': { transform: 'translate(6px, 0px) rotate(2deg)' },
});


const IllustrationWrapper = styled('div', {
  height: '160px',
  width: '148px',
  position: 'relative',
  '& img': {
      position: 'absolute',
      top: '0',
      left: '0',
  },
  '&:nth-child(1)': {
    left: '-5px',
    zIndex: 2,
    animation: `${floatClose} 60s ease-in-out infinite`,
  },
  '&:nth-child(2)': {
    top: '20px',
    left: '55px',
    opacity: 0.9,
    zIndex: 1,
    animation: `${floatFar} 60s ease-in-out infinite`,
  },
});

const Illustration: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <IllustrationWrapper>
      {children}
    </IllustrationWrapper>
  );
};

Illustration.propTypes = {
  children: PropTypes.node.isRequired,
};