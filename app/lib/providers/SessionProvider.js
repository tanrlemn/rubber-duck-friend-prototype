'use client';

// server
import { createBrowserClient } from '@supabase/ssr';

// hooks
import { createContext, useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';

export const SessionContext = createContext();

export function SessionProvider({ children }) {
  const pathname = usePathname();
  const router = useRouter();

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

        if (session === null && pathname !== '/auth') {
          router.push('/auth');
        }
      }
    };

    supabase.auth.onAuthStateChange(() => {
      getSession();
    });
  }, [session, supabase, router, pathname]);

  return (
    <SessionContext.Provider value={{ session }}>
      {children}
    </SessionContext.Provider>
  );
}
