import { type FC } from 'react'

import { useStore } from '@nanostores/react'
import { useTranslation } from 'react-i18next'

import { $gameState } from '@/stores/state'

import EnergyIcon from '@/assets/energy.svg?react'

import styles from './energy.module.css'

export const ClickerEnergy: FC = () => {
  const { t } = useTranslation('global')

  const clickerState = $gameState.get()
  const energy = useStore(clickerState.energy)
  const energyLimit = useStore(clickerState.energyLimit)
  return (
    <div className={styles.root}>
      <div className={styles.valueContainer}>
        <EnergyIcon className={styles.icon} />
        <span className={styles.value}>
          {energy}/{energyLimit}
        </span>
      </div>
      <span className={styles.title}>{t('energy')}</span>
    </div>
  )
}
