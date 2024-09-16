import React from 'react';
import { useTranslation } from 'react-i18next';

interface ErrorDisplayProps {
  error: string | Error;
}

export const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ error }) => {
  const { t } = useTranslation('global');
  const errorMessage = error instanceof Error ? error.message : error;

  return (
    <div className="error-display">
      <h2>{t('error')}</h2>
      <p>{errorMessage}</p>
    </div>
  );
};