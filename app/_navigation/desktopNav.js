'use client';

// context
import { LoadingContext } from '@/app/lib/providers/LoadingProvider';
import { SessionContext } from '@/app/lib/providers/SessionProvider';

// supabase
import { createBrowserClient } from '@supabase/ssr';

// hooks
import { useContext } from 'react';
import { useRouter } from 'next/navigation';

// chakra-ui
import {
  HStack,
  Link,
  Button,
  Flex,
  Box,
  IconButton,
  Text,
} from '@chakra-ui/react';

// local components
import Logo from '../_components/brandElements/logo';
import ThreadList from '../_components/threads/threadList';
import { EditIcon } from '@chakra-ui/icons';

export default function DesktopNav() {
  const { setLoading } = useContext(LoadingContext);
  const { session } = useContext(SessionContext);

  const router = useRouter();

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  const handleSignOut = async () => {
    setLoading(true);
    console.log('sign out');

    localStorage.removeItem('threads');

    await supabase.auth.signOut();

    router.push('/auth');
  };
  return (
    <>
      <Flex
        justify={'space-between'}
        zIndex={1000}
        background={'var(--darkerPurpleGrayAlt)'}
        direction={'column'}
        color={'inherit'}
        backdropFilter={'blur(10px) saturate(100%)'}
        position={'relative'}
        top={'0'}
        w={'25%'}
        maxW={'25%'}
        minW={'25%'}
        h={'100vh'}
        overflowY={'scroll'}
        p={'0 1rem'}
        borderRight={'1px solid var(--darkPurpleGrayAlt, #B397BF)'}>
        <Flex
          pt={'1rem'}
          pb={'1rem'}
          borderBottom={'1px solid var(--darkPurpleGrayAlt, #B397BF)'}
          w={'100%'}>
          <Logo
            isDesktop
            color={'var(--purpleGrayAlt)'}
          />
        </Flex>
        {session !== null && (
          <>
            <Flex
              flexGrow={1}
              direction={'column'}
              w={'100%'}>
              <HStack
                background={'var(--darkerPurpleGrayAlt)'}
                _hover={{
                  background: 'var(--darkPurpleGrayAlt)',
                }}
                mb={'1.5rem'}
                borderBottom={'1px solid var(--darkPurpleGray)'}
                pb={'1rem'}
                pt={'1rem'}
                minW={'100%'}
                cursor={'pointer'}
                position={'sticky'}
                top={0}
                onClick={() => {
                  router.push('/threads/new');
                  onClose();
                }}>
                <IconButton
                  icon={<EditIcon />}
                  background={'transparent'}
                  color={'var(--lightGray)'}
                  _hover={{
                    background: 'transparent',
                  }}
                />
                <Text w={'100%'}>New conversation</Text>
              </HStack>
              <ThreadList isDesktop />
            </Flex>
            <Button
              m={'1rem 0 2rem 0'}
              p={'1rem'}
              position={'relative'}
              onClick={handleSignOut}>
              Sign out
            </Button>
          </>
        )}
      </Flex>
    </>
  );
}
