'use client';

// context
import { LoadingContext } from '@/app/lib/providers/LoadingProvider';

// hooks
import { useEffect, useState, useContext } from 'react';

// chakra-ui
import { Box, Flex } from '@chakra-ui/react';

// local components
import Logo from '../brandElements/logo';

export default function LoadingDiv() {
  const { loadingInPlace } = useContext(LoadingContext);

  const [extraLoading, setExtraLoading] = useState(true);

  useEffect(() => {
    const timeout = Math.random() * 1000;

    !loadingInPlace &&
      setTimeout(() => {
        setExtraLoading(false);
      }, timeout);
  }, [loadingInPlace]);

  return (
    <>
      {extraLoading && (
        <Flex
          align={'center'}
          justify={'center'}
          w={'100%'}
          position={'relative'}
          p={'1rem'}
          zIndex={10}
          backdropFilter={'blur(10px) saturate(100%)'}
          left={0}
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
