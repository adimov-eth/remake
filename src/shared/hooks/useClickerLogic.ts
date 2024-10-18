import { useMemo, useCallback } from 'react';
import { useStore } from '@nanostores/react';
import { transport, $gameState } from '@app/stores/state';
import { useClickNotification } from '@shared/hooks';


export const useClickerLogic = (touchAreaRef: React.RefObject<HTMLDivElement>) => {
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