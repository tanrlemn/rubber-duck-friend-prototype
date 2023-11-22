'use client';

// context
import { LoadingContext } from '@/app/lib/providers/LoadingProvider';

// hooks
import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  useIsMobile,
  useIsRunningStandalone,
} from '@/app/lib/hooks/useIsMobile';

// chakra-ui
import { Box, Flex, Heading, VStack } from '@chakra-ui/react';

// components
import PWAPrompt from 'react-ios-pwa-prompt';
import ReactPullToRefresh from 'react-pull-to-refresh';
import { BsThreeDots } from 'react-icons/bs';

// local components
import Logo from '../_components/brandElements/logo';
import DesktopNav from './desktopNav';
import MobileNav from './mobileNav';
import BouncingDots from '../_components/icons/bouncingDots';

export default function Navbar() {
  const { loading, setLoading } = useContext(LoadingContext);
  const isMobile = useIsMobile();
  const isRunningStandalone = useIsRunningStandalone();
  const router = useRouter();

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (document.readyState === 'complete') {
      setIsLoaded(true);
    }
  }, []);

  const handleRefresh = () => {
    setLoading(true);
    router.refresh();
  };

  return (
    <>
      {!loading && (
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

          {isMobile ? (
            <>
              {!isRunningStandalone && (
                <PWAPrompt
                  copyTitle='Install Rubber Duck Friend'
                  copyBody='Install the Rubber Duck Friend app on your iPhone for a better experience.'
                  promptOnVisit={1}
                  timesToShow={10}
                  copyClosePrompt='Close'
                  permanentlyHideOnDismiss={false}
                />
              )}
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
