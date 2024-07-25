import React from 'react';

export const ErrorHandler = (error: unknown): React.ReactNode => {
  let errorMessage = 'Ett okänt fel inträffade';

  if (error && typeof error === 'object') {
    if ('status' in error && 'data' in error) {
      errorMessage = `Error ${error.status}: ${
        error.data || 'Ett okänt fel inträffade'
      }`;
    } else if ('message' in error) {
      errorMessage = (error as { message?: string }).message || errorMessage;
    }
  }

  return <p>Error: {errorMessage}</p>;
};
