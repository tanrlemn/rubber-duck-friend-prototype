'use client';

// context
import { LoadingContext } from '@/app/lib/providers/LoadingProvider';

// hooks
import { useState, useContext } from 'react';

// chakra-ui
import {
  FormControl,
  Box,
  HStack,
  IconButton,
  InputGroup,
  Input,
  InputRightAddon,
} from '@chakra-ui/react';
import { ArrowUpIcon } from '@chakra-ui/icons';

export default function MessageInput({ addThreadMessage, threadId }) {
  const { loading, setLoading } = useContext(LoadingContext);
  const [newMessage, setNewMessage] = useState('');

  return (
    <FormControl
      minW={'100%'}
      p={'0.5rem'}
      position={'fixed'}
      background={'var(--darkerPurpleGrayAlt)'}
      bottom={0}>
      <Box>
        <HStack>
          <InputGroup>
            <Input
              type='text'
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              border={'1px solid var(--darkPurpleGray, #584361)'}
              _hover={{
                border: '1px solid var(--darkPurpleGray, #584361)',
              }}
            />
            <InputRightAddon
              maxW={'fit-content'}
              p={0}
              background={'transparent'}
              border={'1px solid var(--darkPurpleGray, #584361)'}
              cursor={'pointer'}
              _hover={{
                background: 'var(--darkPurpleGray, #584361)',
              }}>
              <IconButton
                isLoading={loading}
                onClick={() => {
                  setLoading(true);
                  addThreadMessage(threadId, newMessage);
                  setNewMessage('');
                }}
                icon={<ArrowUpIcon />}
              />
            </InputRightAddon>
          </InputGroup>
        </HStack>
      </Box>
    </FormControl>
  );
}
