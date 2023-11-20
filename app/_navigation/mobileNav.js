'use client';

// supabase
// import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

// context
// import { SessionContext } from '../lib/providers/SessionProvider';
import { LoadingContext } from '../lib/providers/LoadingProvider';

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
} from '@chakra-ui/react';
import { HamburgerIcon, EditIcon } from '@chakra-ui/icons';

// local components
import { routeList } from './routeList';

export default function MobileNav() {
  // const supabase = createClientComponentClient();

  const router = useRouter();

  const { setLoading } = useContext(LoadingContext);
  // const { session } = useContext(SessionContext);
  const pathname = usePathname();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();

  const handleSignOut = async () => {
    // setLoading(true);
    // await supabase.auth.signOut();

    // router.refresh();
    // router.push('/auth');

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
              {/* {routeList.map((route) => (
                <Link
                  mb={'1rem'}
                  key={route.path}
                  href={route.path}>
                  <Heading
                    size={'md'}
                    fontWeight={500}>
                    {route.title}
                  </Heading>
                </Link>
              ))} */}
              <Link
                w={'100%'}
                onClick={() => {
                  onClose();
                }}>
                <Heading
                  mt={'1rem'}
                  mb={'2rem'}
                  borderTop={'1px solid var(--darkPurpleGray)'}
                  pt={'2rem'}
                  size={'md'}
                  fontWeight={500}>
                  + New Message
                </Heading>
              </Link>
              {/* <Button onClick={handleSignOut}>Sign out</Button> */}
            </VStack>
          </DrawerBody>

          <DrawerFooter>
            <Button
              variant='outline'
              mr={3}
              onClick={onClose}>
              Close menu
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
