import React from 'react';
import { useTranslation } from 'react-i18next';
import { useStore } from '@nanostores/react';
import { $locale, $isVibrationEnabled } from '@app/stores/state';
import { useNavigate } from 'react-router-dom';

import { RadioGroup } from '@shared/ui/RadioGroup';
import { Switch } from '@shared/ui/Switch';
import { Button } from '@shared/ui/Button';
import { ArrowIcon } from '@shared/assets/icons';

import * as S from './Settings.styles';


const languageOptions = [
  { value: 'en', label: 'EN', id: 'language-en' },
  { value: 'ru', label: 'RU', id: 'language-ru' },
];

export const Settings: React.FC = () => {
  const { t } = useTranslation('pages');
  const locale = useStore($locale);
  const isVibrationEnabled = useStore($isVibrationEnabled);
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
          <Switch 
            id="vibration" 
            checked={isVibrationEnabled}
            onChange={handleVibrationChange} 
          />
        </S.CardItem>
      </S.Card>
      {/* <Button variant="danger" size="large">{t('settings.delete_account')}</Button> */}
    </S.Root>
  );
};
