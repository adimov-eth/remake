import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';

import { useStore } from '@nanostores/react'
import cn from 'classnames'

import { ClickerProgressBar } from '@/components/Clicker/ClickerProgressBar/ClickerProgressBar'

import { $gameState, $level } from '@/stores/state'

import { formatNumberGroup } from '@/utils/formatters'

import { LEVELS } from '@/services/websocket/clicker'

import ArrowIcon from '@/assets/arrow.svg'

import styles from './levels-slider.module.css'
import TreasureStash from './TreasureStash/TreasureStash'

export const LevelsSlider = () => {
  const clickerState = $gameState.get()
  // TODO fix this hotfix
  const currentLevel = useStore($level)
  const { name: currentLevelName } = useStore(clickerState.levelDef)
  const quarks = useStore(clickerState.quarks)
  const [selectedLevel, setSelectedLevel] = useState<number>(0)
  const { t } = useTranslation('global');

  useEffect(() => {
    setSelectedLevel(currentLevel)
  }, [currentLevelName])

  const handlePrevClick = () => {
    if (selectedLevel > 1) {
      setSelectedLevel((prev) => prev - 1)
    }
  }

  const handleNextClick = () => {
    if (selectedLevel < LEVELS.length) {
      setSelectedLevel((prev) => prev + 1)
    }
  }

  const selectedLevelDef = LEVELS[selectedLevel - 1] || 0
  const { name } = selectedLevelDef


  return (
    <div className={styles.root}>
      <div className={styles.levelWrapper}>
        <button
          className={styles.arrow}
          onClick={handlePrevClick}
          disabled={selectedLevel === 1}
        >
          <img
            src={ArrowIcon}
            className={cn(styles.arrowIcon, styles.arrowIconLeft)}
            alt={t('previous')}
          />
        </button>
        <div className={styles.level}>
          <div className={styles.levelName}>
            {name === 'Black Hole' ? <TreasureStash string={name} /> : name}
          </div>
          <div
            className={styles.quarksToUpgrade}
          >{`${formatNumberGroup(quarks)}/${formatNumberGroup(selectedLevelDef.quarksToUpgrade)}`}</div>
        </div>
        <button
          className={styles.arrow}
          onClick={handleNextClick}
          disabled={selectedLevel === LEVELS.length}
        >
          <img src={ArrowIcon} className={styles.arrowIcon} alt={t('next')} />
        </button>
      </div>
      <ClickerProgressBar
        levelProgress={(quarks / selectedLevelDef.quarksToUpgrade) * 100}
      />
    </div>
  )
}
