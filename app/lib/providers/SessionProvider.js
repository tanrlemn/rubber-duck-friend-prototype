'use client';

import { createBrowserClient } from '@supabase/ssr';
import { createContext, useEffect, useState } from 'react';

export const SessionContext = createContext();

export function SessionProvider({ children }) {
  const [session, setSession] = useState(null);

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  useEffect(() => {
    const getSession = async () => {
      if (session === null) {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        setSession(session);
      }
    };

    supabase.auth.onAuthStateChange(() => {
      getSession();
    });
  }, [session, supabase]);

  return (
    <SessionContext.Provider value={{ session }}>
      {children}
    </SessionContext.Provider>
  );
}
