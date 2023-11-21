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

    // if (threads !== null && loading) {
    //   threads.map(async (thread, i) => {
    //     const lastMessage = await getLastMessage(thread.thread_id);

    //     setThreads(
    //       threads.map((t) => {
    //         if (thread.thread_id === t.thread_id) {
    //           return {
    //             ...thread,
    //             lastMessage: lastMessage,
    //           };
    //         }
    //         return t;
    //       })
    //     );
    //     if (i === threads.length - 1) {
    //       setLoading(false);
    //     }
    //   });
    // }
  }, [threads, setLoading, loading]);

  return (
    <List
      p={'1.5rem'}
      pb={'6rem'}>
      {threads !== null &&
        threads.map((thread) => {
          // if (!thread.lastMessage) return;

          // const lastMessage = thread.lastMessage;
          // let lastMessageText = lastMessage?.content[0].text.value;
          // lastMessageText = `${lastMessageText?.substring(0, 70)}...`;

          // const messageDate = new Date(lastMessage.created_at);
          // const messageDateFormatted = messageDate.toLocaleDateString('en-US', {
          //   month: 'short',
          //   day: 'numeric',
          //   hour: 'numeric',
          //   minute: 'numeric',
          // });

          return (
            <ListItem
              key={thread.thread_id}
              mb={'1.5rem'}
              borderBottom={'1px solid var(--gray)'}
              pb={'1rem'}
              minW={'100%'}>
              <Link href={`/threads/${thread.thread_id}`}>
                {/* <Text color={'var(--lightGray)'}>{messageDateFormatted}</Text> */}
                <Text>{thread.thread_id}</Text>
              </Link>
            </ListItem>
          );
        })}
    </List>
  );
}
