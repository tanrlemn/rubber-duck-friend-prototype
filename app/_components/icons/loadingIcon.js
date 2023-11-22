'use client';

// context
import { LoadingContext } from '@/app/lib/providers/LoadingProvider';

// hooks
import { useEffect, useState, useContext } from 'react';

// local components
import BetaIcon from './betaIcon';

export default function LoadingIcon() {
  const { loadingInPlace } = useContext(LoadingContext);

  const [extraLoading, setExtraLoading] = useState(true);

  useEffect(() => {
    const timeout = Math.random() * 1000;

    !loadingInPlace &&
      setTimeout(() => {
        setExtraLoading(false);
      }, timeout);
  }, [loadingInPlace]);

  return <>{extraLoading && <BetaIcon />}</>;
}
