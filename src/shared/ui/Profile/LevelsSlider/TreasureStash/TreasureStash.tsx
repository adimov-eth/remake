import React, { useState, useEffect, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useGetMissions, claimMissionReward } from '@shared/services/api/missions/model'
import { useModal } from '@shared/hooks'
import { initDataRaw } from '@app/stores/telegram'

import { GlitchyText } from '@shared/ui/GlitchyText'
import { ConfirmDialog } from '@/shared/ui/ConfirmDialog'
import ChestIcon from '@shared/ui/Chest/Chest'

// import cn from 'classnames'
// import styles from './TreasureStash.module.css'

interface TreasureStashProps {
  string: string
}

const MISSION_SLUG = 'secret_stash'
// const GLITCH_MIN_DELAY = 7000
// const GLITCH_MAX_DELAY = 30000
// const GLITCH_DURATION = 3000

export const TreasureStash: React.FC<TreasureStashProps> = ({ string }) => {
  const [isOpen, openModal, closeModal] = useModal()
  // const [isGlitching, setIsGlitching] = useState(false)
  const { t } = useTranslation('global')
  const rawData = initDataRaw || ''

  const { data: missions, refetch } = useGetMissions({
    enabled: !!rawData,
    variables: { rawData },
  })

  const foundMission = missions?.find(({ slug }) => slug === MISSION_SLUG)
  const { id, reward_quarks, progress_status, status } = foundMission || {}

  const handleClick = () => {
    if (!id) return;

    claimMissionReward({ missionId: id || '', rawData: rawData })
    openModal()
  }

  const handleClose = () => {
    refetch()
    closeModal()
  }

  // TODO fix animation

  // const applyGlitchEffect = useCallback(() => {
  //   console.log('Applying glitch effect')

  //   setIsGlitching(true)
  //   setTimeout(() => {
  //     console.log('Removing glitch effect')

  //     setIsGlitching(false)
  //   }, GLITCH_DURATION)
  // }, [])

  // useEffect(() => {
  //   console.log('Setting up glitch effect');

  //   const applyGlitchWithInterval = () => {
  //     const delay = Math.floor(Math.random() * (GLITCH_MAX_DELAY - GLITCH_MIN_DELAY + 1)) + GLITCH_MIN_DELAY;
  //     console.log(`Scheduling next glitch in ${delay}ms`)
  //     applyGlitchEffect();
  //     return delay;
  //   }

  //   const intervalId = setInterval(applyGlitchWithInterval, applyGlitchWithInterval());

  //   return () => {
  //     console.log('Cleaning up glitch effect');
  //     clearInterval(intervalId);
  //   }
  // }, [applyGlitchEffect])

  const isMissionAvailable =
    foundMission &&
    progress_status !== 'claimed_reward' &&
    status !== 'unavailable'

  if (!isMissionAvailable) return string;

  const renderTextWithGlitch = (text: string, wordNumber: number, letterNumber: number) => {
    const words = text.split(' ');
    const wordIndex = wordNumber - 1;
    const letterIndex = letterNumber - 1;
  
    if (wordIndex < 0 || wordIndex >= words.length) return null;
  
    const before = words.slice(0, wordIndex).join(' ') + (wordIndex > 0 ? ' ' : '');
    const word = words[wordIndex];
    const after = (wordIndex < words.length - 1 ? ' ' : '') + words.slice(wordIndex + 1).join(' ');
  
    if (letterIndex < 0 || letterIndex >= word.length) return null;
  
    const beforeLetter = word.slice(0, letterIndex);
    const letter = word[letterIndex];
    const afterLetter = word.slice(letterIndex + 1);
  
    return (
      <>
        {before}{beforeLetter}
        <GlitchyText onClick={handleClick} >{letter}</GlitchyText>  
        {afterLetter}{after}
      </>
    )
  }

  const textWithGlitch = renderTextWithGlitch(string, 2, 2)

  return (
    <>
        {textWithGlitch}
        <ConfirmDialog
          onClose={handleClose}
          isOpen={isOpen}
          description={t('secret_stash', { reward_quarks: reward_quarks })}
          title={t('congratulations')}
          icon={<ChestIcon />}
      />
    </>
  )
}