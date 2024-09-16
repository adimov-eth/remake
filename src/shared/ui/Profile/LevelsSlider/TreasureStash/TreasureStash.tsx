import React, { useState, useEffect, useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import cn from 'classnames'

import ConfirmDialog from '@/shared/ui/ConfirmDialog'

import { initDataRaw } from '@app/stores/telegram'

import styles from './TreasureStash.module.css'

import { useGetMissions, claimMissionReward } from '@shared/services/api/missions/model'
import { useModal } from '@shared/hooks'
import ChestIcon from '@shared/ui/Chest/Chest'

interface TreasureStashProps {
  string: string
}

const missionSlug = 'secret_stash'

export const TreasureStash: React.FC<TreasureStashProps> = ({ string }) => {
  const [isOpen, openModal, closeModal] = useModal()
  const [isGlitching, setIsGlitching] = useState(false)
  const rawData = initDataRaw || ''
  const { t } = useTranslation('global')

  const { data, refetch } = useGetMissions({
    enabled: !!rawData,
    variables: { rawData },
  })

  const treasureMission = data?.find(({ slug }) => slug === missionSlug)
  const { id, reward_quarks, progress_status, status } = treasureMission || {}

  const handleClick = () => {
    claimMissionReward({ missionId: id || '', rawData: rawData })
    openModal()
  }

  const handleClose = () => {
    refetch()
    closeModal()
  }

  const applyGlitchEffect = useCallback(() => {
    console.log('Applying glitch effect')
    setIsGlitching(true)
    setTimeout(() => {
      console.log('Removing glitch effect')
      setIsGlitching(false)
    }, 3000)
  }, [])

  useEffect(() => {
    console.log('Setting up glitch effect')
    let scheduleTimeoutId: number | undefined

    const scheduleNextGlitch = () => {
      const minDelay = 7000 // 7 seconds
      const maxDelay = 30000 // 30 seconds
      const delay =
        Math.floor(Math.random() * (maxDelay - minDelay + 1)) + minDelay

      console.log(`Scheduling next glitch in ${delay}ms`)
      scheduleTimeoutId = setTimeout(() => {
        applyGlitchEffect()
        scheduleNextGlitch() // Schedule the next glitch
      }, delay) as unknown as number
    }

    scheduleNextGlitch() // Start the initial glitch cycle

    return () => {
      console.log('Cleaning up glitch effect')
      clearTimeout(scheduleTimeoutId)
    }
  }, [applyGlitchEffect])

  const isShowMission =
    treasureMission &&
    progress_status !== 'claimed_reward' &&
    status !== 'unavailable'

  // TODO: How insert "Black Hole" from translates?

  return (
    <>
      {isShowMission ? (
        <>
          Black H
          <div
            className={cn(styles.screen, { [styles.glitch]: isGlitching })}
            onClick={handleClick}
          >
            <div className={cn(styles.clock)}>
              <span>o</span>
            </div>
          </div>
          le
          <ConfirmDialog
            onClose={handleClose}
            isOpen={isOpen}
            description={t('secret_stash', { reward_quarks: reward_quarks })}
            title={t('congratulations')}
            icon={<ChestIcon />}
          />
        </>
      ) : (
        string
      )}
    </>
  )
}

export default TreasureStash
