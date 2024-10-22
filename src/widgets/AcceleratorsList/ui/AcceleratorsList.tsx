import React, { useEffect, useState } from 'react';
import { useStore } from '@nanostores/react';
import { $accelerators, $gameState } from '@app/stores/state';

import { AcceleratorCard } from '@features/AcceleratorCard';

import * as S from './AcceleratorsList.styles';
import { UpgradeDefinition, upgradeEffectUser, UPGRADES } from '@shared/services/websocket/clicker';
interface AcceleratorCardData {
  disabled: boolean;
  slug: string;
  name: string;
  tier: number; // >0
  description: string;
  price: number;
}

export const AcceleratorsList: React.FC = () => {
  const accelerators = useStore($accelerators);
  const [cards, setCards] = useState<AcceleratorCardData[]>([]);
  const gameState = useStore($gameState)
  const currentAccelerators = useStore(gameState.upgrades)
  console.log('accelerators | current', [accelerators, currentAccelerators]);

  useEffect(() => {
    if (!gameState || !accelerators) {
      return;
    }

    const updatedCards: AcceleratorCardData[] = accelerators.map((accelerator) => {
      const upgradeDef = UPGRADES[accelerator.slug] as UpgradeDefinition
      const upgradeUserData: upgradeEffectUser = {
        energyLimit: gameState.energyLimit.get(),
        quarksPerClick: gameState.quarksPerClick.get(),
        quarks: gameState.quarks.get(),
        level: gameState.level.get(),
        energy: gameState.energy.get(),
        lastFreeRechargeAt: gameState.lastFreeRechargeAt.get(),
        paidRechargesToday: gameState.paidRechargesToday.get(),
        lastPaidRechargeResetAt: gameState.lastPaidRechargeResetAt.get(),
        megaClickExpiresAt: gameState.megaClickExpiresAt.get(),
    
      }
      const currentAccelerator = currentAccelerators.find(
        (current) => current.slug === accelerator.slug
      );
      const currentTier = currentAccelerator?.tier || 0;
      return {
        ...accelerator,
        price: upgradeDef.price(upgradeUserData, currentTier + 1),
        disabled: !upgradeDef.isEnabled(upgradeUserData),
        tier: currentTier,

      };
    });
    console.log('updatedCards', updatedCards);
    setCards(updatedCards);
  }, [accelerators, currentAccelerators]);



  return (
    <S.AcceleratorsList>
      {cards.map((card, i) => (
        <S.AcceleratorsListItem key={i}>
          <AcceleratorCard {...card} currency={'QRK'} />
        </S.AcceleratorsListItem>
      ))}
    </S.AcceleratorsList>
  );
};
