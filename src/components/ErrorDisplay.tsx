import React from 'react';

interface ErrorDisplayProps {
  error: string | Error;
}

export const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ error }) => {
  const errorMessage = error instanceof Error ? error.message : error;

  return (
    <div className="error-display">
      <h2>An error occurred</h2>
      <p>{errorMessage}</p>
    </div>
  );
};