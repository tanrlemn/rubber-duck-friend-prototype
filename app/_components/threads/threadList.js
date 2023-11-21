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
  const [updatedThreads, setUpdatedThreads] = useState(null);

  useEffect(() => {
    const getThreads = async () => {
      setLoading(true);

      const res = await fetch('/api/supabase/getThreads', {
        method: 'GET',
      });

      const { threads } = await res.json();

      setThreads(threads);
      setLoading(false);
    };

    const getLastMessage = async (threadId) => {
      try {
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
      } catch (error) {
        console.log('error', error);
        deleteThread(threadId);
      }
    };

    const deleteThread = async (threadId) => {
      await fetch('/api/openai/deleteThread', {
        method: 'POST',
        body: JSON.stringify({
          threadId: threadId,
        }),
      });

      await fetch('/api/supabase/deleteThread', {
        method: 'POST',
        body: JSON.stringify({
          threadId: threadId,
        }),
      });
    };

    const updateThreads = async () => {
      const newThreads = Promise.all(
        threads.map(async (thread) => {
          const lastMessage = await getLastMessage(thread.thread_id);
          console.log('thread', thread, 'lastMessage', await lastMessage);

          let lastMessageText = await lastMessage?.content[0].text.value;
          lastMessageText = `${lastMessageText?.substring(0, 70)}...`;

          const messageDate = new Date(await lastMessage.created_at);
          const messageDateFormatted = messageDate.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
          });

          return {
            ...thread,
            lastMessage: lastMessageText,
            lastMessageDate: messageDateFormatted,
          };
        })
      );

      setUpdatedThreads(await newThreads);
      console.log('newThreads', await newThreads);
    };

    threads === null && getThreads();

    if (threads !== null && updatedThreads === null) {
      // console.log('threads', threads);
      updateThreads();
    }
  }, [threads, setLoading, loading, updatedThreads]);

  return (
    <List
      p={'1.5rem'}
      pb={'6rem'}>
      {threads !== null &&
        updatedThreads !== null &&
        updatedThreads.map((thread) => {
          return (
            <ListItem
              key={thread.thread_id}
              mb={'1.5rem'}
              borderBottom={'1px solid var(--gray)'}
              pb={'1rem'}
              minW={'100%'}>
              <Link href={`/threads/${thread.thread_id}`}>
                <Text
                  color={'var(--lightGray)'}
                  fontSize={'0.8rem'}>
                  {thread.lastMessageDate}
                </Text>
                <Text>{thread.lastMessage}</Text>
              </Link>
            </ListItem>
          );
        })}
    </List>
  );
}
