'use client';

// hooks
import { useEffect, useState } from 'react';
import { useWindowWidth } from './useWindowWidth';

export function useIsMobile() {
  const windowWidth = useWindowWidth();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(windowWidth < 768);
  }, [windowWidth]);

  return isMobile;
}

export function useIsRunningStandalone() {
  const [isRunningStandalone, setIsRunningStandalone] = useState(false);

  useEffect(() => {
    const checkIfRunningStandalone = () => {
      if (window.matchMedia('(display-mode: standalone)').matches) {
        return true;
      }
      return false;
    };

    setIsRunningStandalone(checkIfRunningStandalone());
  }, []);

  return isRunningStandalone;
}
