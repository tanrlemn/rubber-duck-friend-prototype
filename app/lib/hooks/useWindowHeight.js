'use client';

// hooks
import { useSyncExternalStore, useEffect, useState } from 'react';

export function useWindowHeight() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

function subscribe(callback) {
  window.addEventListener('resize', callback);
  return () => window.removeEventListener('resize', callback);
}

function getSnapshot() {
  return window.innerHeight;
}

function getServerSnapshot() {
  return true;
}

export function useWindowHeightScroll() {
  const windowHeight = useWindowHeight();
  const [newWindowHeight, setNewWindowHeight] = useState(windowHeight);

  useEffect(() => {
    const handleResize = () => {
      if (newWindowHeight > windowHeight) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [windowHeight, newWindowHeight]);

  return { setNewWindowHeight, newWindowHeight, windowHeight };
}
