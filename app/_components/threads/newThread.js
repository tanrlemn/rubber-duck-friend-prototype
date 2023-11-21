'use client';

// local components
import MessageInput from './messageInput';
import { Box } from '@chakra-ui/react';

export default function NewThread() {
  return (
    <Box pt={'5rem'}>
      <MessageInput isNewThread={true} />
    </Box>
  );
}
