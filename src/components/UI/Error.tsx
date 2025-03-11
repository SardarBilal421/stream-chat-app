import React from 'react';

interface ErrorProps {
  error: string | null;
  reset: () => void;
}

export const Error: React.FC<ErrorProps> = ({ error, reset }) => {
  if (!error) {
    return null;
  }

  return (
    <div className="error-container">
      <h2>Something went wrong!</h2>
      <button onClick={reset}>Try again</button>
    </div>
  );
}; 