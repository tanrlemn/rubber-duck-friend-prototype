'use client';

// context
import { LoadingContext } from '@/app/lib/providers/LoadingProvider';
import { AudioConsentContext } from '../lib/providers/AudioConsentProvider';

// hooks
import { useContext, useRef } from 'react';
import { useRouter } from 'next/navigation';
import usePWA from 'react-pwa-install-prompt';
import { useIsMobile } from '@/app/lib/hooks/useIsMobile';

// chakra-ui
import {
  Box,
  Flex,
  Heading,
  VStack,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useToast,
  Button,
  useDisclosure,
} from '@chakra-ui/react';

// components

import ReactPullToRefresh from 'react-pull-to-refresh';
import { BsThreeDots } from 'react-icons/bs';

// local components
import Logo from '../_components/brandElements/logo';
import DesktopNav from './desktopNav';
import MobileNav from './mobileNav';
import BouncingDots from '../_components/icons/bouncingDots';

export default function Navbar() {
  const { loading, setLoading } = useContext(LoadingContext);
  const { enableAudio, denyAudio, isConsentDialogOpen, setConsentDialogOpen } =
    useContext(AudioConsentContext);

  const { onClose } = useDisclosure();
  const cancelRef = useRef();

  const isMobile = useIsMobile();
  const router = useRouter();
  const { isStandalone, isInstallPromptSupported, promptInstall } = usePWA();

  const toast = useToast();

  const handleEnableAudio = () => {
    enableAudio();
    setConsentDialogOpen(false);
    onClose();
    toast({
      title: 'Audio enabled.',
      description: "You'll now hear responses to your questions.",
      status: 'success',
      duration: 5000,
      isClosable: true,
    });
  };

  const handleDenyAudio = () => {
    denyAudio();
    setConsentDialogOpen(false);
    onClose();
    toast({
      title: 'Audio disabled.',
      description: "You'll no longer hear responses to your questions.",
      status: 'warning',
      duration: 5000,
      isClosable: true,
    });
  };

  const handleRefresh = () => {
    setLoading(true);
    router.refresh();
  };

  const onClickInstall = async () => {
    const didInstall = await promptInstall();
    if (didInstall) {
      console.log('User accepted install prompt');
    }
  };

  const renderInstallButton = () => {
    if (isInstallPromptSupported && isStandalone)
      return <button onClick={onClickInstall}>Prompt PWA Install</button>;
    return null;
  };

  return (
    <>
      {!loading && (
        <>
          {isConsentDialogOpen && (
            <AlertDialog
              isOpen={isConsentDialogOpen}
              leastDestructiveRef={cancelRef}
              onClose={onClose}>
              <AlertDialogOverlay>
                <AlertDialogContent
                  p={'2rem 0 1rem 0'}
                  top={'20%'}
                  backdropFilter={'blur(9px)'}
                  background={'var(--darkGray)'}
                  m={'1rem'}>
                  <AlertDialogHeader
                    fontSize='2xl'
                    pb={'0.3rem'}
                    fontWeight='bold'>
                    Hear responses?
                  </AlertDialogHeader>

                  <AlertDialogBody mb={'1rem'}>
                    This app uses audio to play responses to your questions. If
                    you do not consent to audio, you can still use the app, but
                    you will not hear any responses. Do you want to enable
                    audio?
                  </AlertDialogBody>

                  <AlertDialogFooter>
                    <Button
                      ref={cancelRef}
                      onClick={handleDenyAudio}>
                      No thanks
                    </Button>
                    <Button
                      colorScheme='green'
                      onClick={handleEnableAudio}
                      ml={3}>
                      Enable
                    </Button>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialogOverlay>
            </AlertDialog>
          )}

          {isMobile ? (
            <>
              <Box
                position={'fixed'}
                w={'100%'}
                top={0}>
                <ReactPullToRefresh onRefresh={handleRefresh}>
                  <VStack
                    p={'1rem 1rem 0 1rem'}
                    background={'var(--darkerPurpleGrayAlt90)'}
                    color={'var(--purpleGray)'}
                    position={'fixed'}
                    zIndex={1000}
                    top={0}
                    transform={'translateY(-82%)'}
                    minH={'70vh'}
                    minW={'100%'}
                    justify={'flex-end'}
                    align={'center'}>
                    <VStack
                      pb={'1rem'}
                      minW={'100%'}
                      justify={'flex-start'}
                      align={'center'}>
                      <BouncingDots />
                      <Heading size={'sm'}>Pull down to refresh</Heading>
                    </VStack>
                    <BsThreeDots />
                  </VStack>
                </ReactPullToRefresh>
              </Box>
              {renderInstallButton()}
              <Flex
                zIndex={1000}
                background={'var(--darkPurpleGrayAlt90)'}
                color={'inherit'}
                backdropFilter={'blur(10px) saturate(100%)'}
                position={'fixed'}
                top={'0'}
                w={'100%'}
                p={'1rem'}
                borderBottom={'1px solid var(--darkPurpleGrayAlt, #B397BF)'}>
                <Flex
                  w={'100%'}
                  align={'center'}
                  justify={{ base: 'space-between', md: 'center' }}>
                  {!loading && isMobile ? <MobileNav /> : <DesktopNav />}
                  <Logo color={'var(--purpleGrayAlt)'} />
                </Flex>
              </Flex>
            </>
          ) : (
            <DesktopNav />
          )}
        </>
      )}
    </>
  );
}
