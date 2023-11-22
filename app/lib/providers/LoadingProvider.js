'use client';

import { createContext, useState, useEffect } from 'react';

// local components
import Loading from '@/app/loading';

export const LoadingContext = createContext();

export function LoadingProvider({ children }) {
  const [loading, setLoading] = useState(true);
  const [loadingInPlace, setLoadingInPlace] = useState(false);

  useEffect(() => {
    console.log('loadingInPlace', loadingInPlace);
  }, [loadingInPlace]);

  return (
    <LoadingContext.Provider
      value={{ loading, setLoading, setLoadingInPlace, loadingInPlace }}>
      {loading && <Loading />}
      {children}
    </LoadingContext.Provider>
  );
}
