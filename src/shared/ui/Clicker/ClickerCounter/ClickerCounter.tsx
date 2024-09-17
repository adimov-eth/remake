import { type FC } from 'react'

import { useStore } from '@nanostores/react'

import { $gameState } from '@app/stores/state'

import { formatNumberGroup } from '@/shared/utils/formatters'

import styles from './clicker-counter.module.css'

const ClickerCounter: FC = () => {
  const clickerState = $gameState.get()

  const quarks = useStore(clickerState.quarks)

  return <div className={styles.root}>{formatNumberGroup(quarks)}</div>
}

export default ClickerCounter
