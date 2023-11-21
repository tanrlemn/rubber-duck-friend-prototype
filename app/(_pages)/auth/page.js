'use client';

// context
import { LoadingContext } from '@/app/lib/providers/LoadingProvider';
import { SessionContext } from '@/app/lib/providers/SessionProvider';

// supabase
import { createBrowserClient } from '@supabase/ssr';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';

// hooks
import { useContext, useEffect } from 'react';

// chakra-ui
import { Box, Button, Heading, Input } from '@chakra-ui/react';

export default function AuthUI() {
  const { setLoading } = useContext(LoadingContext);
  const { session } = useContext(SessionContext);

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  useEffect(() => {
    setLoading(false);
  }, [session, setLoading, supabase]);

  return (
    <>
      <Box
        p={'1.5rem'}
        pl={{ base: null, md: '5rem' }}>
        <Heading
          mb={'1rem'}
          mt={'2rem'}>
          Sign in
        </Heading>
        <Auth
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          providers={['google']}
          queryParams={{
            access_type: 'offline',
            prompt: 'consent',
          }}
          onlyThirdPartyProviders
          theme='dark'
        />
      </Box>
    </>
  );
}
