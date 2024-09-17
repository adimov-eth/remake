import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { styled } from '@app/stitches.config';
import { formatNumberGroup, toRoman } from '@/shared/utils/formatters';
import acceleratorIcons from '@shared/assets/accelerators';
import currencyIcons from '@shared/assets/currency';
import { purpleMoonPng } from '@shared/assets';
import ConfirmDialog from '@shared/ui/ConfirmDialog';
import { useStore } from '@nanostores/react';
import { transport, $gameState } from '@app/stores/state';
import { AchievementNotification } from '@shared/ui/Notification';
import { SerializedUpgrade } from '@shared/services/websocket/clicker';

// import { Loader } from "@/components/Loader/Loader"

type Card = {
  disabled: boolean;
  slug: string;
  name: string;
  tier: number; // >0
  description: string;
  price: number;
  currency: 'QRK' | 'STR';
};

const Card: React.FC<Card> = ({ disabled, slug, name, tier, description, price, currency }) => {
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

  return (
    <$Card disabled={disabled} onClick={handlePurchaseClick}>
      <Icon image={slug} />
      <Title>{name}</Title>
      <Tier>{toRoman(tier)}</Tier>
      <Description>{description}</Description>
      <Divider />
      <Price>
        <CurrencyIcon currency={currency} />
        <Value price={price} />
      </Price>
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
    </$Card>
  );
};

export default Card;

const $Icon = styled('div', {
  background: '#1C1F30',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '48px',
  height: '48px',
  borderRadius: '16px',
  marginBottom: '10px',
});

const Icon: React.FC<{ image: string | null }> = ({ image }) => {
  const imagePath = acceleratorIcons[image as keyof typeof acceleratorIcons];
  return (
    <$Icon>
      <img src={imagePath} alt={image || 'Unknown'} width="48" height="48" />
    </$Icon>
  );
};

const Title = styled('div', {
  fontFamily: '$proDisplay',
  fontSize: '16px',
  lineHeight: 1,
  fontWeight: 600,
  textAlign: 'center',
  color: 'white',
});

const Tier = styled('div', {
  fontFamily: '$proDisplay',
  fontSize: '12px',
  lineHeight: 1,
  minHeight: '12px',
  fontWeight: 400,
  color: '#67718C',
  textAlign: 'center',
  margin: '4px auto 12px auto',
});

const Description = styled('div', {
  fontFamily: '$proDisplay',
  fontSize: '14px',
  fontWeight: 400,
  minHeight: '48px',
  color: '#67718C',
  textAlign: 'center',
});

const Divider = styled('div', {
  width: '100%',
  height: '1px',
  backgroundColor: '$grey200',
  margin: '16px 0',
});

const Price = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  gap: '8px',
});

const $Value = styled('div', {
  fontFamily: '$mono',
  fontSize: '14px',
  fontWeight: '500',
  color: '$textActive',
});

const Value: React.FC<{ price: number }> = ({ price }) => {
  return <$Value>{formatNumberGroup(price)}</$Value>;
};

//Todo move modals to portal
const $Card = styled('div', {
  backgroundColor: '#14151E',
  borderRadius: '16px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '24px 16px 16px 16px',

  //   background: 'rgba(43, 46, 69, 0.3)',
  //   boxShadow: '0 4px 24px rgba(0, 0, 0, 0.25)',
  //   backdropFilter: 'blur(24px)',

  variants: {
    disabled: {
      true: {
        opacity: 0.5,
        pointerEvents: 'none',
      },
    },
  },
});

const $CurrencyIcon = styled('div', {
  width: '16px',
  height: '16px',
  backgroundColor: '$gray-200',
});

const CurrencyIcon: React.FC<{ currency: 'QRK' | 'STR' }> = ({ currency }) => {
  const imagePath = currencyIcons[currency as keyof typeof currencyIcons];
  return (
    <$CurrencyIcon>
      <img src={imagePath} alt={currency} width="16" height="16" />
    </$CurrencyIcon>
  );
};
