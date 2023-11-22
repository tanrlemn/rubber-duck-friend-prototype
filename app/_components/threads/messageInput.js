'use client';

// context
import { LoadingContext } from '@/app/lib/providers/LoadingProvider';

// hooks
import { useState, useContext, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAutosizeTextarea } from '@/app/lib/hooks/useAutosizeTextarea';
import { useOpenaiThreads } from '@/app/lib/hooks/useOpenaiThreads';
import { useWindowHeightScroll } from '@/app/lib/hooks/useWindowHeight';

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

// local components
import Underscore from '../brandElements/underscore';

export default function MessageInput({ threadId = null, isNewThread = false }) {
  const inputRef = useRef(null);
  const textareaRef = useRef(null);

  const router = useRouter();
  const { setNewWindowHeight, newWindowHeight, windowHeight } =
    useWindowHeightScroll();

  const { runStatus, handleNewThread, handleAddMessage } = useOpenaiThreads(
    threadId,
    isNewThread
  );

  const { setLoading, loadingInPlace, setLoadingInPlace } =
    useContext(LoadingContext);

  const [newMessage, setNewMessage] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [disabled, setDisabled] = useState(true);

  const onFocus = () => {
    setIsFocused(true);
  };

  const onBlur = () => {
    setIsFocused(false);
    window.scrollTo(0, 0);
  };

  useAutosizeTextarea(textareaRef.current, newMessage);

  useEffect(() => {
    setNewWindowHeight(window.innerHeight);

    if (runStatus === 'completed') {
      setNewMessage('');
    }

    if (newMessage === '') {
      setDisabled(true);
    } else {
      setDisabled(false);
    }

    setLoading(false);
  }, [
    newMessage,
    runStatus,
    setLoading,
    threadId,
    isNewThread,
    router,
    newWindowHeight,
    setNewWindowHeight,
  ]);

  const handleSend = async () => {
    if (disabled || loadingInPlace || newMessage === '') {
      return;
    }

    setLoadingInPlace(true);
    // setIsFocused(false);

    if (!isNewThread) {
      handleAddMessage(threadId, newMessage);
    } else {
      threadId = await handleNewThread({ newMessage });
    }

    const threadsStorage = JSON.parse(localStorage.getItem('threads'));

    localStorage.setItem(
      'threads',
      JSON.stringify([
        {
          groups: threadsStorage.groups,
          revalidate: true,
        },
      ])
    );
  };

  const handleBlur = () => {
    if (newMessage === '' && isFocused === true) {
      setIsFocused(false);
    }

    window.scrollTo(0, 0);
  };

  return (
    <>
      <FormControl
        minW={{ base: '100%', md: '75%' }}
        w={{ base: '100%', md: '75%' }}
        p={'0.5rem'}
        position={'fixed'}
        background={'var(--darkerPurpleGrayAlt)'}
        right={0}
        bottom={0}>
        <Box>
          <HStack>
            <InputGroup>
              {isFocused ? (
                <Textarea
                  disabled={loadingInPlace}
                  autoFocus
                  ref={textareaRef}
                  onBlur={handleBlur}
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
                  background: loadingInPlace
                    ? 'transparent'
                    : 'var(--darkPurpleGray, #584361)',
                }}>
                <IconButton
                  disabled={disabled}
                  cursor={
                    loadingInPlace || disabled ? 'not-allowed' : 'pointer'
                  }
                  aria-label='Send message'
                  isRound
                  background={
                    loadingInPlace || disabled ? 'transparent' : 'var(--white)'
                  }
                  _hover={{
                    background:
                      loadingInPlace || disabled
                        ? 'transparent'
                        : 'var(--darkPurpleGray, #584361)',
                  }}
                  color={
                    disabled ? 'var(--purpleGray)' : 'var(--darkestPurple)'
                  }
                  onClick={handleSend}
                  icon={
                    loadingInPlace ? (
                      <Box className={'animateText'}>
                        <Underscore color={'var(--purpleGray)'} />
                      </Box>
                    ) : (
                      <ArrowUpIcon />
                    )
                  }
                  ml={'0.5rem'}
                />
              </InputRightAddon>
            </InputGroup>
          </HStack>
        </Box>
      </FormControl>
    </>
  );
}
