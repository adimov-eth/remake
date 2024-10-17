import React from 'react';
import { useTranslation } from 'react-i18next';
import { useStore } from '@nanostores/react';
import { $locale } from '@app/stores/state';
import { useNavigate } from 'react-router-dom';

import { RadioGroup } from '@shared/ui/RadioGroup';
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
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  const handleLanguageChange = (newLocale: string) => {
    $locale.set(newLocale as 'en' | 'ru');
  };

  // const handleDeleteAccount = () => {
  //   console.log('Delete account');
  // };

  return (
    <S.Root>
      <S.TopArea>
        <S.BackButton 
          as={Button} 
          variant="ghost" 
          size="small" 
          wide={false}
          onClick={handleBack}
        >
          <S.BackIcon>
            <ArrowIcon />
          </S.BackIcon>
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
      </S.Card>
      {/* <Button variant="danger" size="large">{t('settings.delete_account')}</Button> */}
    </S.Root>
  );
};
