import { useRef, type FC } from 'react'

import { useStore } from '@nanostores/react'

import SimplifiedClickerCoin from '@/components/Clicker/ClickerCoin/ClickCoinSimplified/ClickerCoinSimplified'
import Coin from '@/components/Clicker/ClickerCoin/ClickerCoin'
import ClickerCounter from '@/components/Clicker/ClickerCounter/ClickerCounter'
import { ClickerEnergy } from '@/components/Clicker/ClickerEnergy/ClickerEnergy'
import { ClickerProgressBar } from '@/components/Clicker/ClickerProgressBar/ClickerProgressBar'

import useDeviceTier from '@/hooks/useDeviceTier'

import { transport, $gameState } from '@/stores/state'

import styles from './clicker.module.css'

import { useClickNotification, useMultiTouch } from '@/hooks'

const Clicker: FC = () => {
  const { notifyUser } = useClickNotification('')
  const touchAreaRef = useRef<HTMLDivElement>(null)
  const clickerState = $gameState.get()
  const quarksPerClick = clickerState.quarksPerClick.get()

  
  const levelProgress = useStore(clickerState.levelProgress)

  const handleIncrement = () => {
    transport.click()
    notifyUser()
  }

  const handleTouchStart = (event: TouchEvent) => {
    const currentEnergy = clickerState.energy.get()
    if (currentEnergy < quarksPerClick) {
      return
    }

    if (touchAreaRef.current) {
      const touchAreaRect = touchAreaRef.current.getBoundingClientRect()
      Array.from(event.touches).forEach((touch) => {
        const isTouchInArea =
          touch.clientX >= touchAreaRect.left &&
          touch.clientX <= touchAreaRect.right &&
          touch.clientY >= touchAreaRect.top &&
          touch.clientY <= touchAreaRect.bottom
        if (isTouchInArea) {
          handleIncrement()
        }
      })
    }
  }

  useMultiTouch(touchAreaRef, handleTouchStart, (e) => {
    e.preventDefault()
  })

  const deviceTier = useDeviceTier()

  return (
    <div className={styles.root}>
      <ClickerCounter />
      <ClickerProgressBar levelProgress={levelProgress} />
      <div className={styles.touchAreaWrapper}>
        <div ref={touchAreaRef} className={styles.touchArea}>
          {deviceTier === 'low' ? (
            <SimplifiedClickerCoin touchAreaRef={touchAreaRef} />
          ) : (
            <Coin touchAreaRef={touchAreaRef} />
          )}
        </div>
      </div>
      <ClickerEnergy />
    </div>
  )
}

export default Clicker
