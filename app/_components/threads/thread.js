'use client';

// context
import { LoadingContext } from '@/app/lib/providers/LoadingProvider';
import { ThreadContext } from '@/app/lib/providers/ThreadProvider';

// hooks
import { useContext, useEffect } from 'react';

// chakra-ui
import { List } from '@chakra-ui/react';

// local components
import MessageBubble from './messageBubble';
import MessageInput from './messageInput';

export default function Thread({ threadId }) {
  const { loading, loadingInPlace } = useContext(LoadingContext);
  const { threadMessages } = useContext(ThreadContext);

  useEffect(() => {}, [threadMessages]);

  return (
    <>
      {!loading && (
        <>
          <List
            overflowY={'scroll'}
            maxH={'100vh'}
            minH={'100vh'}
            w={'100%'}
            p={'1rem'}
            pt={'6rem'}
            pb={'8rem'}>
            {threadMessages !== null &&
              threadMessages.map((m) => {
                return (
                  <MessageBubble
                    key={m.id}
                    role={m.role}
                    message={m}
                    isLatestMessage={
                      threadMessages[threadMessages.length - 1].id === m.id
                    }
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
