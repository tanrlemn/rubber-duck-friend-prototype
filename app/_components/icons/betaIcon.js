'use client';

// context
import { LoadingContext } from '@/app/lib/providers/LoadingProvider';

// hooks
import { useEffect, useState, useContext } from 'react';

// chakra-ui
import { Box, Flex, Heading } from '@chakra-ui/react';

// local components
import Underscore from '../brandElements/underscore';

export default function BetaIcon({
  color = 'var(--teal)',
  underscoreColor = 'var(--darkPurpleGray)',
  animated = true,
}) {
  return (
    <>
      <Flex
        zIndex={0}
        maxW={'fit-content'}
        minW={'fit-content'}
        pt={'0.2rem'}
        borderRadius={'var(--mainBorderRadius)'}
        transition={'all 0.2s ease-in-out'}
        _hover={{
          outline: '1px solid var(--midPurpleGray, #432E4C)',
        }}
        align={'flex-end'}
        p={'0.3125rem 1.4375rem'}>
        <Box
          pb={'0.3rem'}
          className={animated && 'animateUnderscore'}>
          <Underscore color={underscoreColor} />
        </Box>

        <Heading
          className={animated && 'animateText'}
          ml={'0.3125rem'}
          color={color}
          fontWeight={700}
          lineHeight={'1.56288rem'}
          letterSpacing={'-0.02688rem'}
          textTransform={'lowercase'}
          fontSize={'0.8rem'}>
          Beta
        </Heading>
      </Flex>
    </>
  );
}
