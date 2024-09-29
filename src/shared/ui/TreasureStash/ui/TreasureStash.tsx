import React from 'react'
import { useTranslation } from 'react-i18next'
import { useGetMissions, claimMissionReward } from '@shared/services/api/missions/model'
import { useModal } from '@shared/hooks'
import { initDataRaw } from '@app/stores/telegram'

import { GlitchyText } from '@shared/ui/GlitchyText'
import { ConfirmDialog } from '@/shared/ui/ConfirmDialog'
import { BlurBackdrop } from '@shared/ui/BlurBackdrop'

import ChestPng from '@shared/assets/chest.png'
import ChestWebp from '@shared/assets/chest.webp'

interface TreasureStashProps {
  string: string
}

const MISSION_SLUG = 'secret_stash'

export const TreasureStash: React.FC<TreasureStashProps> = ({ string }) => {
  const [isOpen, openModal, closeModal] = useModal()
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
        <GlitchyText onClick={handleClick}>{letter}</GlitchyText>  
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

export const ChestIcon = () => {
  const { t } = useTranslation('global');

  return (
    <BlurBackdrop variant='pink'>
      <picture>
        <source
        srcSet={ChestWebp}
        type="image/webp"
      />
        <img src={ChestPng} alt={t('chest')} width={124} height={129} />
      </picture>
    </BlurBackdrop>
  )
}