import { useRef, type FC, useMemo, useCallback } from 'react';
import { useStore } from '@nanostores/react';

import SimplifiedClickerCoin from '@/shared/ui/Clicker/ClickerCoin/ClickCoinSimplified/ClickerCoinSimplified';
import Coin from '@/shared/ui/Clicker/ClickerCoin/ClickerCoin';
import ClickerCounter from '@/shared/ui/Clicker/ClickerCounter/ClickerCounter';
import { ClickerEnergy } from '@/shared/ui/Clicker/ClickerEnergy/ClickerEnergy';
import { ClickerProgressBar } from '@/shared/ui/Clicker/ClickerProgressBar/ClickerProgressBar';
import { Loader } from '@/shared/ui/Loader/Loader';
import useDeviceTier from '@/shared/hooks/useDeviceTier';
import { useClickNotification, useMultiTouch } from '@/shared/hooks';

import { transport, $gameState, $connectionStatus } from '@app/stores/state';

import styles from './clicker.module.css';

const useClickerLogic = (touchAreaRef: React.RefObject<HTMLDivElement>) => {
  const { notifyUser } = useClickNotification('');
  const gameState = useStore($gameState);

  const quarksPerClick = useMemo(() => gameState?.quarksPerClick.get() ?? 0, [gameState]);

  const handleIncrement = useCallback(() => {
    transport.click();
    notifyUser();
  }, [notifyUser]);

  const handleTouchStart = useCallback(
    (event: TouchEvent) => {
      const currentEnergy = gameState?.energy.get() ?? 0;
      if (currentEnergy < quarksPerClick) {
        return;
      }

      if (touchAreaRef.current) {
        const touchAreaRect = touchAreaRef.current.getBoundingClientRect();
        Array.from(event.touches).forEach(touch => {
          const isTouchInArea =
            touch.clientX >= touchAreaRect.left &&
            touch.clientX <= touchAreaRect.right &&
            touch.clientY >= touchAreaRect.top &&
            touch.clientY <= touchAreaRect.bottom;
          if (isTouchInArea) {
            handleIncrement();
          }
        });
      }
    },
    [gameState, quarksPerClick, handleIncrement]
  );

  return { handleTouchStart };
};

const Clicker: FC = () => {
  const touchAreaRef = useRef<HTMLDivElement>(null);
  const gameState = useStore($gameState);
  const { handleTouchStart } = useClickerLogic(touchAreaRef);
  const connectionStatus = useStore($connectionStatus);
  useMultiTouch(touchAreaRef, handleTouchStart, e => {
    e.preventDefault();
  });

  const deviceTier = useDeviceTier();
  const levelProgress = gameState?.levelProgress.get() ?? 0;

  if (connectionStatus !== 'online') return <Loader speed="fast" />;
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
  );
};

export default Clicker;
