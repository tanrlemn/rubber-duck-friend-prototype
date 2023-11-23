'use client';

// hooks
import { createContext, useEffect, useState } from 'react';

export const AudioConsentContext = createContext();

export function AudioConsentProvider({ children }) {
  const [audioConsent, setAudioConsent] = useState(false);
  const [isConsentDialogOpen, setConsentDialogOpen] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('userAudioConsent');
    if (consent !== null) {
      setAudioConsent(consent === 'true');
    } else {
      setConsentDialogOpen(true);
    }
  }, []);

  const value = {
    audioConsent,
    isConsentDialogOpen,
    setConsentDialogOpen,
    enableAudio: () => {
      localStorage.setItem('userAudioConsent', 'true');
      setAudioConsent(true);
    },
    denyAudio: () => {
      localStorage.setItem('userAudioConsent', 'false');
      setAudioConsent(false);
    },
  };

  return (
    <AudioConsentContext.Provider value={value}>
      {children}
    </AudioConsentContext.Provider>
  );
}
