import { useRef, type FC, useMemo, useCallback } from 'react';
import { useStore } from '@nanostores/react';
import { transport, $gameState, $connectionStatus } from '@app/stores/state';

import { LowTierCoin, HighTierCoin } from '@features/ClickerCoin';

import { useClickNotification, useMultiTouch, useDeviceTier } from '@shared/hooks';

import { ClickerCounter } from '@features/ClickerCounter';
import { ClickerEnergy } from '@features/ClickerEnergy';
import { ProgressBar } from '@shared/ui/ProgressBar';
import { Loader } from '@shared/ui/Loader';
import { MidnightClicker } from '@features/MidnightClicker';

import * as S from './Clicker.styles';

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

export const Clicker: FC = () => {
  const touchAreaRef = useRef<HTMLDivElement>(null);
  const gameState = useStore($gameState);
  const { handleTouchStart } = useClickerLogic(touchAreaRef);
  const connectionStatus = useStore($connectionStatus);

  useMultiTouch(touchAreaRef, handleTouchStart, e => {
    e.preventDefault();
  });

  const deviceTier = useDeviceTier();
  const levelProgress = useStore(gameState?.levelProgress);
  
  if (connectionStatus !== 'online') return <S.Root><Loader speed="fast" /></S.Root>;

  return (
    <S.Root>
      <S.TopArea>
        <ClickerCounter />
        <ProgressBar levelProgress={levelProgress} />
      </S.TopArea>
      <S.MiddleArea>
        <S.TouchArea ref={touchAreaRef}>
          {deviceTier === 'low' ? (
            <LowTierCoin touchAreaRef={touchAreaRef} />
          ) : (
            <HighTierCoin touchAreaRef={touchAreaRef} />
          )}
          <MidnightClicker />
        </S.TouchArea>
      </S.MiddleArea>
      <S.BottomArea>
        <ClickerEnergy />
      </S.BottomArea>
    </S.Root>
  );
};