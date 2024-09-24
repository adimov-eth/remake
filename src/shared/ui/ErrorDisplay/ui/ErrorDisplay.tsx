import React from 'react';
import { useTranslation } from 'react-i18next';

import * as S from './ErrorDisplay.styles'

interface ErrorDisplayProps {
  title?: string;
  error: Error | string | unknown;
}

export const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ title, error }) => {
  const { t } = useTranslation('global');
  let errorMessage = '';

  switch (true) {
    case error instanceof Error:
      errorMessage = error.message;
      break;
    case typeof error === 'string':
      errorMessage = error;
      break;
    default:
      errorMessage = JSON.stringify(error);
  }

  return (
    <S.ErrorDisplay>
      <S.ErrorDisplayTitle>{title || t('error')}</S.ErrorDisplayTitle>
      <S.ErrorDisplayMessage>{errorMessage}</S.ErrorDisplayMessage>
    </S.ErrorDisplay>
  );
};