import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useStore } from '@nanostores/react';
import { transport, $gameState } from '@app/stores/state';

import { formatNumberGroup, toRoman } from '@/shared/utils/formatters';
import { purpleMoonPng } from '@shared/assets';
import acceleratorIcons from '@shared/assets/accelerators';
import { SerializedUpgrade } from '@shared/services/websocket/clicker';
import { AchievementNotification } from '@shared/ui/Notification';
import { ConfirmDialog } from '@shared/ui/ConfirmDialog';
import { BalanceDisplay } from '@features/BalanceDisplay';

import * as S from './AcceleratorCard.styles';

interface IAcceleratorCard {
  disabled: boolean;
  slug: string;
  name: string;
  tier: number; // >0
  description: string;
  price: number;
  currency: 'QRK' | 'STR';
};

export const AcceleratorCard: React.FC<IAcceleratorCard> = ({ 
  disabled, 
  slug, 
  name, 
  tier, 
  description, 
  price, 
  currency,
}) => {
  const { t } = useTranslation('global');

  if (disabled) slug = 'locked';

  const gameState = useStore($gameState);
  const currentBalance = gameState?.quarks.get() ?? 0;
  
  const [dialogState, setDialogState] = useState({
    notEnoughQuarks: false,
    confirmUpgrade: false,
  });

  useEffect(() => {
    if (!gameState) return;

    const handleUpgradeChange = (
      newUpgrades: readonly SerializedUpgrade[],
      oldUpgrades: readonly SerializedUpgrade[]
    ) => {
      const isNewUpgrade = (upgrade: SerializedUpgrade) =>
        upgrade.slug === slug && upgrade.tier > tier;
      const wasUpgraded = newUpgrades.some(isNewUpgrade) && !oldUpgrades.some(isNewUpgrade);

      if (wasUpgraded) {
        AchievementNotification(`${name} activated`);
      }
    };

    const unsubscribe = gameState.upgrades.listen(handleUpgradeChange);

    return unsubscribe;
  }, [slug, tier, name, gameState?.upgrades]);

  const handlePurchaseClick = () => {
    if (currentBalance < price) {
      setDialogState(prev => ({ ...prev, notEnoughQuarks: true }));
      return;
    }
    setDialogState(prev => ({ ...prev, confirmUpgrade: true }));
  };

  const toggleDialog = (dialogType: 'notEnoughQuarks' | 'confirmUpgrade') => {
    setDialogState(prev => ({ ...prev, [dialogType]: !prev[dialogType] }));
  };

  const confirmUpgrade = () => {
    if (currentBalance < price) {
      return;
    }
    if (!disabled) {
      transport.upgrade(slug);
    }
    setDialogState(prev => ({ ...prev, confirmUpgrade: false }));
  };

  const imagePath = acceleratorIcons[slug as keyof typeof acceleratorIcons];
  const isShowQuarks = price > 0;

  return (
    <S.Card disabled={disabled} onClick={handlePurchaseClick}>
      <S.Icon>
        <img src={imagePath} width="48" height="48" />
      </S.Icon>
      <S.Title>{name}</S.Title>
      <S.Tier>{toRoman(tier)}</S.Tier>
      <S.Description>{description}</S.Description>
      <S.Divider />
      <BalanceDisplay
        quarks={price}
        showQuarks={isShowQuarks}
        variant="ghost"
      />
      <ConfirmDialog
        title={t('sorry')}
        description={t('not_enough_quarks', { quarks: formatNumberGroup(price - currentBalance) })}
        icon={
          <div>
            <img src={purpleMoonPng} width={94} height={94} />
          </div>
        }
        onButtonClick={() => toggleDialog('notEnoughQuarks')}
        isOpen={dialogState.notEnoughQuarks}
        onClose={() => setDialogState(prev => ({ ...prev, notEnoughQuarks: false }))}
      />
      <ConfirmDialog
        description={t('are_you_sure', { 
          name: name, 
          price: formatNumberGroup(price),
          currency: currency,
        })}
        buttonText={t('yes')}
        onButtonClick={confirmUpgrade}
        isOpen={dialogState.confirmUpgrade}
        onClose={() => setDialogState(prev => ({ ...prev, confirmUpgrade: false }))}
        enableCancelButton
      />
    </S.Card>
  );
};