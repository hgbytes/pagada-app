import React, { createContext, useState, useCallback } from 'react';

/**
 * Global Loading Context
 * Provides loading state management across the entire app
 */
export const LoadingContext = createContext();

export const LoadingProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);

  const startLoading = useCallback(() => {
    setIsLoading(true);
  }, []);

  const stopLoading = useCallback(() => {
    setIsLoading(false);
  }, []);

  return (
    <LoadingContext.Provider value={{ isLoading, startLoading, stopLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};

/**
 * Custom hook to use the Loading context
 * Usage: const { isLoading, startLoading, stopLoading } = useLoading();
 */
export const useLoading = () => {
  const context = React.useContext(LoadingContext);
  if (!context) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
};
