'use client';

// context
import { LoadingContext } from '@/app/lib/providers/LoadingProvider';

// hooks
import { useState, useContext, useRef, useEffect } from 'react';
import { useAutosizeTextarea } from '@/app/lib/hooks/useAutosizeTextarea';
import { useOpenaiThreads } from '@/app/lib/hooks/useOpenaiThreads';
import { useRouter } from 'next/navigation';

// chakra-ui
import {
  FormControl,
  Box,
  HStack,
  IconButton,
  InputGroup,
  Input,
  InputRightAddon,
  Textarea,
} from '@chakra-ui/react';
import { ArrowUpIcon } from '@chakra-ui/icons';

export default function MessageInput({ threadId = null, isNewThread = false }) {
  const inputRef = useRef(null);
  const textareaRef = useRef(null);

  const router = useRouter();

  const { runStatus, handleNewThread, addThreadMessage } =
    useOpenaiThreads(threadId);

  const { loading, setLoading } = useContext(LoadingContext);
  const [newMessage, setNewMessage] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const onFocus = () => setIsFocused(true);
  const onBlur = () => setIsFocused(false);

  useAutosizeTextarea(textareaRef.current, newMessage);

  useEffect(() => {
    if (runStatus === 'completed') {
      setLoading(false);
      setNewMessage('');

      if (isNewThread) {
        router.push(`/threads/${threadId}}`);
      }
    }
  }, [runStatus, setLoading, threadId, isNewThread, router]);

  const handleTextareaFocus = () => {
    if (newMessage === '' && isFocused === true) {
      setIsFocused(false);
    }
  };

  const handleSend = async () => {
    console.log('handleSend');
    console.log('newMessage', newMessage);

    setLoading(true);
    if (!isNewThread) {
      addThreadMessage(threadId, newMessage);
    } else {
      threadId = await handleNewThread({ newMessage });
    }
  };

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
            {isFocused ? (
              <Textarea
                autoFocus
                ref={textareaRef}
                onBlur={handleTextareaFocus}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                h={'auto'}
                id='messageInput'
                placeholder='Type a message...'
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                border={'1px solid var(--darkPurpleGray, #584361)'}
                _hover={{
                  border: '1px solid var(--darkPurpleGray, #584361)',
                }}
                resize={'vertical'}
              />
            ) : (
              <Input
                ref={inputRef}
                onFocus={onFocus}
                onBlur={onBlur}
                type='text'
                placeholder='Type a message...'
                id='messageInput'
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                border={'1px solid var(--darkPurpleGray, #584361)'}
                _hover={{
                  border: '1px solid var(--darkPurpleGray, #584361)',
                }}
                borderRadius={'10rem'}
              />
            )}

            <InputRightAddon
              maxW={'fit-content'}
              p={0}
              background={'transparent'}
              border={'none'}
              cursor={'pointer'}
              _hover={{
                background: 'var(--darkPurpleGray, #584361)',
              }}>
              <IconButton
                disabled={newMessage === ''}
                aria-label='Send message'
                isRound
                isLoading={loading}
                onClick={handleSend}
                icon={<ArrowUpIcon />}
                ml={'0.5rem'}
              />
            </InputRightAddon>
          </InputGroup>
        </HStack>
      </Box>
    </FormControl>
  );
}
