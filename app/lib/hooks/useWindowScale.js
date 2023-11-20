'use client';

// hooks
import { useSyncExternalStore } from 'react';

export function useWindowScale() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

function subscribe(callback) {
  const mqString = `(resolution: ${window.devicePixelRatio}dppx)`;
  const media = matchMedia(mqString);

  media.addEventListener('change', callback);
  return () => media.removeEventListener('change', callback);
}

function getSnapshot() {
  return window.devicePixelRatio;
}

function getServerSnapshot() {
  return true;
}
