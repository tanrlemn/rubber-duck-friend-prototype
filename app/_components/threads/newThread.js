'use client';

// chakra-ui
import { Box, Flex } from '@chakra-ui/react';

// local components
import MessageInput from './messageInput';
import BetaIcon from '../icons/betaIcon';

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
        <BetaIcon
          color={'var(--blue)'}
          animated={false}
        />
        <BetaIcon />
        <BetaIcon
          color={'var(--yellow)'}
          animated={false}
        />
      </Flex>
      <MessageInput isNewThread={true} />
    </Box>
  );
}
