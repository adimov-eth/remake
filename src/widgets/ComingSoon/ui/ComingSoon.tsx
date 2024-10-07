import { useTranslation } from 'react-i18next';

import { Loader } from '@shared/ui/Loader';

import * as S from './ComingSoon.styles';

export const ComingSoon = () => {
  const { t } = useTranslation('global');

  return (
    <S.Root>
      <S.Title>{t('coming_soon')}</S.Title>
      <Loader speed="slow" />
    </S.Root>
  );
};
