import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useStore } from '@nanostores/react';
import { transport, $gameState } from '@app/stores/state';

import { formatNumberGroup } from '@/shared/utils/formatters';
import { purpleMoonPng } from '@shared/assets';
import { SerializedUpgrade } from '@shared/services/websocket/clicker';
import { AchievementNotification } from '@shared/ui/Notification';
import { ConfirmDialog } from '@shared/ui/ConfirmDialog';
import { BalanceDisplay } from '@features/BalanceDisplay';

import * as S from './AcceleratorCard.styles';
import acceleratorIcons from '@shared/assets/accelerators';

interface IAcceleratorCard {
  disabled: boolean;
  slug: string;
  name: string;
  tier: number; // >0
  description: string;
  price: number;
  currency: 'QRK' | 'STR';
}

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
    if (currentBalance < price) return;
    if (!disabled) transport.upgrade(slug);

    setDialogState(prev => ({ ...prev, confirmUpgrade: false }));
  };

  const imagePath = acceleratorIcons[slug as keyof typeof acceleratorIcons];
  const isShowQuarks = price > 0;

  return (
    <S.Card type="button" disabled={disabled} onClick={handlePurchaseClick}>
      <S.Icon><img src={imagePath} width="30" height="30" /></S.Icon>
      <S.Content>
        <S.Title>{name}</S.Title>
        <S.Description>{description}</S.Description>
        <S.Price>
          <BalanceDisplay variant="ghost" quarks={price} showQuarks={isShowQuarks} />
        </S.Price>
      </S.Content>
      <ConfirmDialog
        onButtonClick={() => toggleDialog('notEnoughQuarks')}
        isOpen={dialogState.notEnoughQuarks}
        onClose={() => setDialogState(prev => ({ ...prev, notEnoughQuarks: false }))}
      >
        <S.ConfirmContent>
          <S.ConfirmImg><img src={purpleMoonPng} width={140} height={140} /></S.ConfirmImg>
          <S.ConfirmTitle>{t('sorry')}</S.ConfirmTitle>
          <S.ConfirmDescription>{t('not_enough_quarks', { quarks: formatNumberGroup(price - currentBalance) })}</S.ConfirmDescription>
        </S.ConfirmContent>
      </ConfirmDialog>
      <ConfirmDialog
        buttonText={t('yes')}
        onButtonClick={confirmUpgrade}
        isOpen={dialogState.confirmUpgrade}
        onClose={() => setDialogState(prev => ({ ...prev, confirmUpgrade: false }))}
        enableCancelButton
      >
        <S.ConfirmContent>
          <S.ConfirmImg><img src={imagePath} width="40" height="40" /></S.ConfirmImg>
          <S.ConfirmTitle>{name}</S.ConfirmTitle>
          <S.ConfirmDescription>{description}</S.ConfirmDescription>
          <S.ConfirmFooter>{t('are_you_sure', { name, price: formatNumberGroup(price), currency })}</S.ConfirmFooter>
        </S.ConfirmContent>
      </ConfirmDialog>
    </S.Card>
  );
};