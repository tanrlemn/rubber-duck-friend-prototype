'use client';

// hooks
import { createContext, useEffect, useState } from 'react';

export const ThreadContext = createContext();

export function ThreadProvider({ children }) {
  const [threadMessages, setThreadMessages] = useState(null);

  useEffect(() => {
    console.log('new message received, reloading thread');
  }, [threadMessages]);

  return (
    <ThreadContext.Provider value={{ threadMessages, setThreadMessages }}>
      {children}
    </ThreadContext.Provider>
  );
}
