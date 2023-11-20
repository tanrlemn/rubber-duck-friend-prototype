'use client';

// context
import { LoadingContext } from '@/app/lib/providers/LoadingProvider';
// import { SessionContext } from '@/app/lib/providers/SessionProvider';

// hooks
import { useContext, useEffect } from 'react';
import { useIsMobile } from '@/app/lib/hooks/useIsMobile';
import { usePathname, useRouter } from 'next/navigation';

// chakra-ui
import { Flex } from '@chakra-ui/react';

// local components
import Logo from '../_components/brandElements/logo';
import DesktopNav from './desktopNav';
import MobileNav from './mobileNav';

export default function Navbar() {
  const router = useRouter();

  const pathname = usePathname();
  const { loading, setLoading } = useContext(LoadingContext);
  const isMobile = useIsMobile();

  useEffect(() => {
    // if (session) {
    //   router.push('/dashboard');
    // } else {
    //   router.push('/auth');
    // }
    setLoading(false);
  }, [setLoading, isMobile, pathname, router]);

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
        {!loading && isMobile ? <MobileNav /> : <DesktopNav />}
      </Flex>
    </Flex>
  );
}
