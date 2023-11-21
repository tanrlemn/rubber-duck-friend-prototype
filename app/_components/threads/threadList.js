'use client';

// context
import { LoadingContext } from '@/app/lib/providers/LoadingProvider';

// hooks
import { useState, useEffect, useContext } from 'react';

// chakra-ui
import { Heading, Link, List, ListItem, Text } from '@chakra-ui/react';

// local components
import LoadingDiv from '../utils/loadingDiv';

export default function ThreadList() {
  const { loadingInPlace, setLoadingInPlace } = useContext(LoadingContext);

  const [threads, setThreads] = useState(null);
  const [updatedThreads, setUpdatedThreads] = useState(null);

  useEffect(() => {
    const getThreads = async () => {
      setLoadingInPlace(true);

      const res = await fetch('/api/supabase/getThreads', {
        method: 'GET',
      });

      const { threads } = await res.json();

      setThreads(threads);
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
      const threadsStorage = JSON.parse(localStorage.getItem('threads'));

      if (threadsStorage !== null && threadsStorage.revalidate === false) {
        setUpdatedThreads(threadsStorage.groups);
        setLoadingInPlace(false);
        return;
      }

      const newThreads = Promise.all(
        threads.map(async (thread) => {
          const lastMessage = await getLastMessage(thread.thread_id);

          let lastMessageText = await lastMessage?.content[0].text.value;
          lastMessageText = `${lastMessageText?.substring(0, 30)}...`;

          let messageDate = new Date(thread.updated_at);
          messageDate.setHours(0, 0, 0, 0);

          return {
            ...thread,
            lastMessage: lastMessageText,
            lastMessageDate: messageDate,
          };
        })
      );

      const today = new Date();

      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);

      const groups = (await newThreads)
        .sort((a, b) => {
          return new Date(b.updated_at) - new Date(a.updated_at);
        })
        .reduce((groups, thread) => {
          const date = thread.lastMessageDate;

          const isToday =
            date.setHours(0, 0, 0, 0) === today.setHours(0, 0, 0, 0);
          const isYesterday =
            date.setHours(0, 0, 0, 0) === yesterday.setHours(0, 0, 0, 0);

          const daysAgo = Math.floor(
            (today.getTime() - date.getTime()) / (1000 * 3600 * 24)
          );

          const dateText = isToday
            ? 'Today'
            : isYesterday
            ? 'Yesterday'
            : daysAgo <= 7
            ? `${daysAgo} days ago`
            : 'Older';

          if (!groups[dateText]) {
            groups[dateText] = [];
          }

          groups[dateText].push(thread);

          return groups;
        }, {});

      setUpdatedThreads(
        Object.keys(groups).map((date) => {
          return {
            date,
            threads: groups[date],
          };
        })
      );

      localStorage.setItem(
        'threads',
        JSON.stringify({
          groups: Object.keys(groups).map((date) => {
            return {
              date,
              threads: groups[date],
            };
          }),
          revalidate: false,
        })
      );

      setLoadingInPlace(false);
    };

    threads === null && getThreads();

    if (threads !== null && updatedThreads === null) {
      updateThreads();
    }
  }, [threads, setLoadingInPlace, loadingInPlace, updatedThreads]);

  return (
    <List pb={'2rem'}>
      {loadingInPlace && <LoadingDiv />}
      {threads !== null &&
        updatedThreads !== null &&
        updatedThreads.map((group) => {
          return (
            <ListItem
              key={group.date}
              mb={'1.5rem'}
              borderBottom={'1px solid var(--darkPurpleGray)'}
              pb={'1rem'}
              minW={'100%'}>
              <Heading
                color={'var(--lightGray)'}
                size={'xs'}
                fontWeight={500}
                pb={'1rem'}>
                {group.date}
              </Heading>
              <List>
                {group.threads.map((thread) => {
                  return (
                    <ListItem
                      key={thread.thread_id}
                      pb={'1rem'}
                      pt={'1rem'}
                      minW={'100%'}>
                      <Link href={`/threads/${thread.thread_id}`}>
                        <Text>{thread.lastMessage}</Text>
                      </Link>
                    </ListItem>
                  );
                })}
              </List>
            </ListItem>
          );
        })}
    </List>
  );
}
