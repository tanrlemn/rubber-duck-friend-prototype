'use client';

// context
import { LoadingContext } from '@/app/lib/providers/LoadingProvider';

// hooks
import { useState, useEffect, useContext } from 'react';

// chakra-ui
import { Link, List, ListItem, Text } from '@chakra-ui/react';

export default function ThreadList() {
  const { loading, setLoading } = useContext(LoadingContext);

  const [threads, setThreads] = useState(null);
  const [threadsLoaded, setThreadsLoaded] = useState(false);

  useEffect(() => {
    const getThreads = async () => {
      setLoading(true);
      const res = await fetch('/api/supabase/getThreads', {
        method: 'GET',
      });

      const { threads } = await res.json();

      setThreads(threads);
    };

    const getLastMessage = async (threadId) => {
      const res = await fetch('/api/openai/getThreadMessages', {
        method: 'POST',
        body: JSON.stringify({
          threadId: threadId,
        }),
      });

      const { body } = await res.json();
      const { last_id, data } = body;

      const lastMessage = data.find((message) => message.id === last_id);

      return lastMessage;
    };

    threads === null && getThreads();
    if (threads !== null && !threadsLoaded) {
      threads.map(async (thread, i) => {
        const lastMessage = await getLastMessage(thread.thread_id);

        setThreads(
          threads.map((t) => {
            if (thread.thread_id === t.thread_id) {
              return {
                ...thread,
                lastMessage: lastMessage,
              };
            }
            return t;
          })
        );
        if (threads.length - 1 === i) {
          setThreadsLoaded(true);
          setLoading(false);
        }
      });
    }
  }, [threads, setLoading, threadsLoaded]);

  return (
    <List
      p={'1.5rem'}
      pb={'6rem'}>
      {threads !== null &&
        threadsLoaded &&
        threads.map((thread) => {
          const lastMessage = thread.lastMessage;
          let lastMessageText = lastMessage?.content[0].text.value;
          lastMessageText = `${lastMessageText?.substring(0, 70)}...`;

          const messageDate = new Date(lastMessage.created_at);
          const messageDateFormatted = messageDate.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
          });

          return (
            <ListItem
              key={thread.thread_id}
              mb={'1.5rem'}
              borderBottom={'1px solid var(--gray)'}
              pb={'1rem'}
              minW={'100%'}>
              <Link href={`/threads/${thread.thread_id}`}>
                <Text color={'var(--lightGray)'}>{messageDateFormatted}</Text>
                <Text>{lastMessageText}</Text>
              </Link>
            </ListItem>
          );
        })}
    </List>
  );
}
