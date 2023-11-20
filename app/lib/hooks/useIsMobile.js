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
