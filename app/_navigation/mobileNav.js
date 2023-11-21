'use client';

// context
import { LoadingContext } from '@/app/lib/providers/LoadingProvider';

// supabase
import { createBrowserClient } from '@supabase/ssr';

// hooks
import { useRef, useContext } from 'react';
import { useRouter } from 'next/navigation';

// chakra-ui
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerOverlay,
  DrawerContent,
  Button,
  IconButton,
  useDisclosure,
  VStack,
  Flex,
  HStack,
  Text,
} from '@chakra-ui/react';
import { HamburgerIcon, EditIcon } from '@chakra-ui/icons';

// local components
import ThreadList from '../_components/threads/threadList';

export default function MobileNav() {
  const { setLoading } = useContext(LoadingContext);

  const router = useRouter();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();

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
      <Flex>
        <IconButton
          ref={btnRef}
          icon={<HamburgerIcon />}
          onClick={onOpen}
          background={'transparent'}
          color={'var(--purpleGrayAlt)'}
          _hover={{
            background: 'transparent',
          }}
        />
      </Flex>

      <Drawer
        isOpen={isOpen}
        placement='left'
        onClose={onClose}
        finalFocusRef={btnRef}>
        <DrawerOverlay />
        <DrawerContent
          background={'var(--darkPurpleGrayAlt)'}
          backdropFilter={'blur(10px) saturate(100%)'}>
          <DrawerBody
            p={0}
            overflowX={'hidden'}>
            <VStack
              align={'flex-start'}
              p={'1rem'}>
              <HStack
                background={'var(--darkPurpleGrayAlt)'}
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
                  ref={btnRef}
                  icon={<EditIcon />}
                  background={'transparent'}
                  color={'var(--lightGray)'}
                  _hover={{
                    background: 'transparent',
                  }}
                />
                <Text w={'100%'}>New conversation</Text>
              </HStack>
              <ThreadList />
            </VStack>
          </DrawerBody>
          <DrawerFooter>
            <Button onClick={handleSignOut}>Sign out</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
