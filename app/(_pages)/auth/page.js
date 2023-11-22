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
import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  Text,
  VStack,
} from '@chakra-ui/react';
import LogoIcon from '@/app/_components/brandElements/logoIcon';

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
      <VStack
        p={'1.5rem'}
        pt={'10rem'}
        pl={{ base: null, md: '5rem' }}>
        <Box
          maxH={'3rem'}
          maxW={'3rem'}>
          <LogoIcon />
        </Box>
        <Heading
          mt={'0.5rem'}
          size={'lg'}
          mb={'0.5rem'}>
          Get started
        </Heading>
        <Auth
          supabaseClient={supabase}
          appearance={{
            theme: ThemeSupa,
          }}
          providers={['google']}
          queryParams={{
            access_type: 'offline',
            prompt: 'consent',
          }}
          onlyThirdPartyProviders
          theme='dark'
        />
      </VStack>
    </>
  );
}
