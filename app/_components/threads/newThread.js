'use client';

import Underscore from '../brandElements/underscore';
// local components
import MessageInput from './messageInput';
import { Box, Flex, Heading, Highlight } from '@chakra-ui/react';

export default function NewThread() {
  return (
    <Box
      position={'relative'}
      pt={'5rem'}
      w={'100%'}>
      <Flex
        flexDirection={'column'}
        h={'50vh'}
        w={'100%'}
        align={'center'}
        justify={'center'}>
        <Flex
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
          <Box pb={'0.3rem'}>
            <Underscore color={'var(--darkPurpleGray)'} />
          </Box>

          <Heading
            ml={'0.3125rem'}
            color={'var(--blue)'}
            fontWeight={700}
            lineHeight={'1.56288rem'}
            letterSpacing={'-0.02688rem'}
            textTransform={'lowercase'}
            fontSize={'0.8rem'}>
            Beta
          </Heading>
        </Flex>
        <Flex
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
            className={'animateUnderscore'}>
            <Underscore color={'var(--darkPurpleGray)'} />
          </Box>

          <Heading
            className={'animateText'}
            ml={'0.3125rem'}
            color={'var(--teal)'}
            fontWeight={700}
            lineHeight={'1.56288rem'}
            letterSpacing={'-0.02688rem'}
            textTransform={'lowercase'}
            fontSize={'0.8rem'}>
            Beta
          </Heading>
        </Flex>
        <Flex
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
          <Box pb={'0.3rem'}>
            <Underscore color={'var(--darkPurpleGray)'} />
          </Box>

          <Heading
            ml={'0.3125rem'}
            color={'var(--yellow)'}
            fontWeight={700}
            lineHeight={'1.56288rem'}
            letterSpacing={'-0.02688rem'}
            textTransform={'lowercase'}
            fontSize={'0.8rem'}>
            Beta
          </Heading>
        </Flex>
      </Flex>
      <MessageInput isNewThread={true} />
    </Box>
  );
}
