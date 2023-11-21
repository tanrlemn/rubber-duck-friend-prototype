'use client';

// context
import { SessionContext } from '../lib/providers/SessionProvider';
import { LoadingContext } from '../lib/providers/LoadingProvider';

// supabase
import { createBrowserClient } from '@supabase/ssr';

// hooks
import { useRef, useState, useEffect, useContext } from 'react';
import { usePathname, useRouter } from 'next/navigation';

// chakra-ui
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  IconButton,
  useDisclosure,
  Link,
  VStack,
  Heading,
  Flex,
  Box,
  HStack,
  Text,
} from '@chakra-ui/react';
import { HamburgerIcon, EditIcon } from '@chakra-ui/icons';

export default function MobileNav() {
  const { setLoading } = useContext(LoadingContext);
  const { session } = useContext(SessionContext);
  const pathname = usePathname();

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  const router = useRouter();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();

  const handleSignOut = async () => {
    setLoading(true);
    await supabase.auth.signOut();

    router.refresh();
    router.push('/auth');

    console.log('sign out');
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
        placement='right'
        onClose={onClose}
        finalFocusRef={btnRef}>
        <DrawerOverlay />
        <DrawerContent
          background={'var(--darkPurpleGrayAlt)'}
          backdropFilter={'blur(10px) saturate(100%)'}>
          <DrawerCloseButton />
          <DrawerHeader>
            <Box h={'4rem'}></Box>
          </DrawerHeader>

          <DrawerBody>
            <VStack align={'flex-start'}>
              <HStack
                cursor={'pointer'}
                onClick={() => {
                  router.push('/threads/new');
                  onClose();
                }}>
                <IconButton
                  ref={btnRef}
                  icon={<EditIcon />}
                  onClick={onOpen}
                  background={'transparent'}
                  color={'var(--lightGray)'}
                  _hover={{
                    background: 'transparent',
                  }}
                />
                <Text w={'100%'}>New conversation</Text>
              </HStack>
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
