import React from 'react';
import { useTranslation } from 'react-i18next';

import * as S from './ErrorDisplay.styles'

interface ErrorDisplayProps {
  error: string | Error;
}

export const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ error }) => {
  const { t } = useTranslation('global');
  const errorMessage = error instanceof Error ? error.message : error;

  return (
    <S.ErrorDisplay>
      <S.ErrorDisplayTitle>{t('error')}</S.ErrorDisplayTitle>
      <S.ErrorDisplayMessage>{errorMessage}</S.ErrorDisplayMessage>
    </S.ErrorDisplay>
  );
};