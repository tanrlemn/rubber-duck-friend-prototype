'use client';

// local components
import MessageInput from './messageInput';
import { Box } from '@chakra-ui/react';

export default function NewThread() {
  return (
    <Box
      position={'relative'}
      pt={'5rem'}
      w={'100%'}>
      <MessageInput isNewThread={true} />
    </Box>
  );
}
