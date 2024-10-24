import { useRef, type FC } from 'react';
import * as Sentry from '@sentry/react';
import { useStore } from '@nanostores/react';
import { $gameState, $connectionStatus } from '@app/stores/state';
import { $deviceTier } from '@entities/Device';

import { LowTierCoin, HighTierCoin } from '@features/ClickerCoin';

import { useClickerLogic, useMultiTouch } from '@shared/hooks';

import { ClickerCounter } from '@features/ClickerCounter';
import { ClickerEnergy } from '@features/ClickerEnergy';
import { ProgressBar } from '@shared/ui/ProgressBar';
import { Loader } from '@shared/ui/Loader';
import { MidnightClicker } from '@features/MidnightClicker';

import * as S from './Clicker.styles';


export const Clicker: FC = () => {
  const touchAreaRef = useRef<HTMLDivElement>(null);
  const gameState = useStore($gameState);
  Sentry.setContext('clicker_state', gameState); 
  const { handleTouchStart } = useClickerLogic(touchAreaRef);
  const connectionStatus = useStore($connectionStatus);

  useMultiTouch(touchAreaRef, handleTouchStart, e => {
    e.preventDefault();
  });

  const deviceTier = useStore($deviceTier);
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