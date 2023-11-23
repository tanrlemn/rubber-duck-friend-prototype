'use client';

// hooks
import { createContext, useState } from 'react';

export const AudioConsentContext = createContext();

export function AudioConsentProvider({ children }) {
  const [audioConsent, setAudioConsent] = useState(null);
  const [deniedConsent, setDeniedConsent] = useState(false);

  return (
    <AudioConsentContext.Provider
      value={{
        audioConsent,
        setAudioConsent,
        deniedConsent,
        setDeniedConsent,
      }}>
      {children}
    </AudioConsentContext.Provider>
  );
}
