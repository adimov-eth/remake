import React from 'react';
import { useTranslation } from 'react-i18next';
import { useStore } from '@nanostores/react';
import { $locale, $isVibrationEnabled } from '@app/stores/state';
import { $deviceTier, setDeviceTier, DeviceTier } from '@entities/Device';
import { useNavigate } from 'react-router-dom';

import { RadioGroup } from '@shared/ui/RadioGroup';
// import { Switch } from '@shared/ui/Switch';
import { Button } from '@shared/ui/Button';
import { ArrowIcon } from '@shared/assets/icons';

import * as S from './Settings.styles';


const languageOptions = [
  { value: 'en', label: 'EN', id: 'language-en' },
  { value: 'ru', label: 'RU', id: 'language-ru' },
];

const vibrationOptions = [
  { value: 'on', label: 'ON', id: 'vibration-on' },
  { value: 'off', label: 'OFF', id: 'vibration-off' },
];

const deviceTierOptions = [
  { value: 'low', label: 'Coin', id: 'device-tier-low' },
  { value: 'high', label: 'Quark', id: 'device-tier-high' },
];

export const SettingsPage: React.FC = () => {
  const { t } = useTranslation('pages');
  const locale = useStore($locale);
  const isVibrationEnabled = useStore($isVibrationEnabled);
  const deviceTier = useStore($deviceTier);
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  const handleLanguageChange = (newLocale: string) => {
    $locale.set(newLocale as 'en' | 'ru');
  };

  const handleVibrationChange = () => {
    $isVibrationEnabled.set(!isVibrationEnabled);
  };

  const handleDeviceTierChange = (newTier: string) => {
    setDeviceTier(newTier as DeviceTier);
  };

  // const handleDeleteAccount = () => {
  //   console.log('Delete account');
  // };

  return (
    <S.Root>
      <S.TopArea>
        <S.BackButton>
          <Button  
            variant="ghost" 
            size="small" 
            wide={false}
            onClick={handleBack}
          >
            <S.BackIcon>
              <ArrowIcon />
            </S.BackIcon>
          </Button>
        </S.BackButton>
        <S.Title>{t('settings.title')}</S.Title>
      </S.TopArea>
      <S.Card>
        <S.CardItem>
          <S.Label>{t('settings.language')}</S.Label>
          <RadioGroup
            options={languageOptions}
            selectedValue={locale}
            onChange={handleLanguageChange}
            name="language"
          />
        </S.CardItem>
        <S.CardItem>
          <S.Label>{t('settings.vibration')}</S.Label>
          <RadioGroup
            options={vibrationOptions}
            selectedValue={isVibrationEnabled ? 'on' : 'off'}
            onChange={handleVibrationChange}
            name="vibration"
          />
        </S.CardItem>
        <S.CardItem>
          <S.Label>{t('settings.clickable_object')}</S.Label>
          <RadioGroup
            options={deviceTierOptions}
            selectedValue={deviceTier}
            onChange={handleDeviceTierChange}
            name="device-tier"
          />
        </S.CardItem>
      </S.Card>
      {/* <Button variant="danger" size="large">{t('settings.delete_account')}</Button> */}
    </S.Root>
  );
};
