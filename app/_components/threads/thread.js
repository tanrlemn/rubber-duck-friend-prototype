'use client';

// context
import { LoadingContext } from '@/app/lib/providers/LoadingProvider';

// hooks
import { useContext, useState, useEffect } from 'react';
import { useOpenaiThreads } from '@/app/lib/hooks/useOpenaiThreads';

// chakra-ui
import { List } from '@chakra-ui/react';

// local components
import MessageBubble from './messageBubble';
import MessageInput from './messageInput';

export default function Thread({ threadId }) {
  const { loading, loadingInPlace } = useContext(LoadingContext);
  const { messages } = useOpenaiThreads(threadId);

  const [, forceUpdate] = useState();

  useEffect(() => {
    forceUpdate((n) => !n);
  }, [messages]);

  return (
    <>
      {!loading && (
        <>
          {console.log('Rendering messages:', messages)}
          <List
            overflowY={'scroll'}
            maxH={'100vh'}
            minH={'100vh'}
            w={'100%'}
            p={'1rem'}
            pb={'8rem'}>
            {messages !== null &&
              messages.map((m) => {
                return (
                  <MessageBubble
                    key={m.id}
                    role={m.role}
                    message={m}
                    isLatestMessage={messages[messages.length - 1].id === m.id}
                  />
                );
              })}
            {loadingInPlace && (
              <MessageBubble
                loadingBubble
                role={'assistant'}
                isLatestMessage
              />
            )}
          </List>

          <MessageInput threadId={threadId} />
        </>
      )}
    </>
  );
}
