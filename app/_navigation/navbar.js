'use client';

// context
import { LoadingContext } from '@/app/lib/providers/LoadingProvider';
import { SessionContext } from '@/app/lib/providers/SessionProvider';

// hooks
import { useContext, useEffect } from 'react';
import { useIsMobile } from '@/app/lib/hooks/useIsMobile';

// chakra-ui
import { Flex } from '@chakra-ui/react';

// local components
import Logo from '../_components/brandElements/logo';
import DesktopNav from './desktopNav';
import MobileNav from './mobileNav';

export default function Navbar() {
  const { session } = useContext(SessionContext);

  const { loading, setLoading } = useContext(LoadingContext);
  const isMobile = useIsMobile();

  useEffect(() => {
    setLoading(false);
  }, [setLoading, isMobile, session]);

  const handleSignOut = async () => {
    setLoading(true);
    router.push('/auth');

    await supabase.auth.signOut();

    console.log('sign out');
  };

  return (
    <Flex
      zIndex={1000}
      background={'var(--darkerPurpleGrayAlt)'}
      color={'inherit'}
      backdropFilter={'blur(10px) saturate(100%)'}
      position={'sticky'}
      top={'0'}
      w={'100%'}
      p={'1rem'}
      borderBottom={'1px solid var(--darkPurpleGrayAlt, #B397BF)'}>
      <Flex
        w={'100%'}
        justify={{ base: 'space-between', md: 'center' }}>
        <Logo color={'var(--purpleGrayAlt)'} />
        {!loading && isMobile ? (
          <MobileNav handleSignOut={handleSignOut} />
        ) : (
          <DesktopNav handleSignOut={handleSignOut} />
        )}
      </Flex>
    </Flex>
  );
}
