'use client';

import { createContext } from 'react';

export const SessionContext = createContext();

export function SessionProvider({ children, session }) {
  return (
    <SessionContext.Provider value={{ session }}>
      {children}
    </SessionContext.Provider>
  );
}
