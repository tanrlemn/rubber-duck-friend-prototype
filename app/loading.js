'use client';

// context
import { LoadingContext } from '@/app/lib/providers/LoadingProvider';

// hooks
import { useEffect, useState, useContext } from 'react';

// chakra-ui
import { Box, Flex } from '@chakra-ui/react';

// local components
import Logo from './_components/brandElements/logo';

export default function Loading() {
  const { loading, setLoading } = useContext(LoadingContext);

  const [extraLoading, setExtraLoading] = useState(true);

  useEffect(() => {
    const timeout = Math.random() * 1000;

    !loading &&
      setTimeout(() => {
        setExtraLoading(false);
      }, timeout);

    loading &&
      setTimeout(() => {
        setLoading(false);
      }, 5000);
  }, [loading, setLoading]);

  return (
    <>
      {extraLoading && (
        <Flex
          align={'center'}
          justify={'center'}
          w={'100vw'}
          h={'100vh'}
          position={'fixed'}
          zIndex={1000}
          backdropFilter={'blur(10px) saturate(100%)'}
          top={0}>
          <Box
            className='loading'
            maxW={'fit-content'}>
            <Logo
              animate={true}
              shouldLink={false}
            />
          </Box>
        </Flex>
      )}
    </>
  );
}
