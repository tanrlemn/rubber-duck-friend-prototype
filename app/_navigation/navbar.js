'use client';

// context
import { LoadingContext } from '@/app/lib/providers/LoadingProvider';
import { AudioConsentContext } from '../lib/providers/AudioConsentProvider';

// hooks
import { useContext } from 'react';
import { useRouter } from 'next/navigation';
import usePWA from 'react-pwa-install-prompt';
import { useIsMobile } from '@/app/lib/hooks/useIsMobile';

// chakra-ui
import { Box, Flex, Heading, VStack } from '@chakra-ui/react';

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
  const { audioConsent, setAudioConsent, deniedConsent, setDeniedConsent } =
    useContext(AudioConsentContext);

  const isMobile = useIsMobile();
  const router = useRouter();
  const { isStandalone, isInstallPromptSupported, promptInstall } = usePWA();

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
                    transform={'translateY(-79%)'}
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
