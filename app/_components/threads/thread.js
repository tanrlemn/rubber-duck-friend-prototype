'use client';

// context
import { LoadingContext } from '@/app/lib/providers/LoadingProvider';

// hooks
import { useContext } from 'react';
import { useOpenaiThreads } from '@/app/lib/hooks/useOpenaiThreads';

// chakra-ui
import { List } from '@chakra-ui/react';
import MessageBubble from './messageBubble';
import MessageInput from './messageInput';

export default function Thread({ threadId }) {
  const { loading } = useContext(LoadingContext);
  const { messages } = useOpenaiThreads(threadId);

  return (
    <>
      {!loading && (
        <>
          <List
            w={'100%'}
            p={'1.5rem'}
            pb={'8rem'}>
            {messages &&
              messages.map((m) => (
                <MessageBubble
                  key={m.id}
                  role={m.role}
                  message={m}
                  isLatestMessage={messages[messages.length - 1].id === m.id}
                />
              ))}
          </List>
          <MessageInput threadId={threadId} />
        </>
      )}
    </>
  );
}
