'use client';

// hooks
import { useSyncExternalStore } from 'react';

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
