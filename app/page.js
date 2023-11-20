'use client';

// context
import { LoadingContext } from '@/app/lib/providers/LoadingProvider';
import { SessionContext } from '@/app/lib/providers/SessionProvider';

// hooks
import { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/navigation';

// chakra-ui
import { Button } from '@chakra-ui/react';

// local components
import MessageInput from './_components/threads/messageInput';
import Thread from './_components/threads/thread';
import Loading from './loading';

export default function Home() {
  const { loading, setLoading } = useContext(LoadingContext);
  const { session } = useContext(SessionContext);

  const router = useRouter();

  const [threadId, setThreadId] = useState(null);
  const [runId, setRunId] = useState(null);
  const [runStatus, setRunStatus] = useState(null);
  const [refreshStatus, setRefreshStatus] = useState(false);
  const [messages, setMessages] = useState(null);

  useEffect(() => {
    if (session === null) {
      router.push('/auth');
    }

    const getMessages = async () => {
      setLoading(true);
      const res = await fetch('/api/openai/getThreadMessages', {
        method: 'POST',
        body: JSON.stringify({
          threadId: threadId,
        }),
      });

      const { data } = await res.json();

      setMessages(data);
    };

    const getRunStatus = async () => {
      const res = await fetch('/api/openai/runStatus', {
        method: 'POST',
        body: JSON.stringify({
          threadId: threadId,
          runId: runId,
        }),
      });

      const { status } = await res.json();

      setRunStatus(status);
    };

    if (threadId === null) {
      setThreadId('thread_AvscEGBtPdaeMzJXmuNfZhPc');
    }

    if (messages === null && threadId !== null) {
      getMessages();
    }

    if (runStatus !== null) {
      console.log('runStatus', runStatus);

      if (
        runStatus !== 'completed' &&
        !refreshStatus &&
        threadId !== null &&
        runId !== null &&
        runStatus !== null
      ) {
        console.log('refresh status');
        setRefreshStatus(true);

        setTimeout(() => {
          getRunStatus();
          setRefreshStatus(false);
        }, 1000);
      }

      if (runStatus === 'completed') {
        getMessages();
        setRunStatus(null);
      }
    }
  }, [
    runStatus,
    refreshStatus,
    threadId,
    runId,
    messages,
    setLoading,
    session,
    router,
  ]);

  const handleNewThread = async () => {
    const res = await fetch('/api/openai/createThread', {
      method: 'POST',
    });

    const { id } = await res.json();
    setThreadId(id);

    handleAddMessage(id, 'Hello');
  };

  const handleAddMessage = async (threadId, newMessage) => {
    console.log('add message');

    const res = await fetch('/api/openai/addThreadMessage', {
      method: 'POST',
      body: JSON.stringify({
        message: newMessage,
        threadId,
      }),
    });

    handleRunAssistant(threadId);
  };

  const handleRunAssistant = async (threadId) => {
    console.log('run assistant');

    const res = await fetch('/api/openai/runAssistant', {
      method: 'POST',
      body: JSON.stringify({
        threadId,
      }),
    });

    const { status, id } = await res.json();

    setRunStatus(status);
    setRunId(id);
  };

  return (
    <>
      {loading && <Loading />}
      {messages && <Thread messages={messages} />}
      <MessageInput
        addThreadMessage={handleAddMessage}
        threadId={threadId}
      />
      {/* <Button onClick={handleNewThread}>Test</Button> */}
    </>
  );
}
