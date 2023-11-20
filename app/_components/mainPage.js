'use client';

// context
import { LoadingContext } from '@/app/lib/providers/LoadingProvider';

// hooks
import { useContext, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

// chakra-ui
import { Box } from '@chakra-ui/react';

// local components
import { routeStyles } from '@/app/lib/styles/routeStyles';

export default function MainPage({ children, routeStyle }) {
  const pathname = usePathname();
  const { loading, setLoading } = useContext(LoadingContext);

  useEffect(() => {
    setLoading(false);
  }, [setLoading, pathname]);
  return (
    <Box
      color={routeStyle?.navbarTextColor}
      background={routeStyle?.backgroundColor}
      minW={'100%'}
      minH={'100vh'}>
      <Box
        position={'absolute'}
        zIndex={'-1'}
        top={'0'}
        left={'0'}
        background={routeStyle?.backgroundColor}
        minW={'100%'}
        minH={'10rem'}></Box>
      {children}
    </Box>
  );
}
