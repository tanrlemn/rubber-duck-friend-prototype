'use client';

// context
import { LoadingContext } from '@/app/lib/providers/LoadingProvider';
import { SessionContext } from '@/app/lib/providers/SessionProvider';

// hooks
import { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/navigation';

export function useOpenaiThreads(threadId = null, isNewThread = false) {
  const { setLoading } = useContext(LoadingContext);
  const { session } = useContext(SessionContext);

  const router = useRouter();

  const [currentThreadId, setCurrentThreadId] = useState(threadId);
  const [runId, setRunId] = useState(null);
  const [runStatus, setRunStatus] = useState(null);
  const [refreshStatus, setRefreshStatus] = useState(false);
  const [messages, setMessages] = useState(null);

  useEffect(() => {
    const getMessages = async () => {
      try {
        setLoading(true);
        const res = await fetch('/api/openai/getThreadMessages', {
          method: 'POST',
          body: JSON.stringify({
            threadId: currentThreadId,
          }),
        });

        const { data } = await res.json();

        setMessages(data);
      } catch (error) {
        console.log('error', error);
        setLoading(false);
      }
    };

    const getRunStatus = async () => {
      const res = await fetch('/api/openai/runStatus', {
        method: 'POST',
        body: JSON.stringify({
          threadId: currentThreadId,
          runId: runId,
        }),
      });

      const { status } = await res.json();

      setRunStatus(status);
    };

    if (messages === null && currentThreadId !== null) {
      getMessages();
    }

    if (runStatus !== null) {
      console.log('runStatus', runStatus);

      if (runStatus !== 'completed' && !refreshStatus && runId !== null) {
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

        isNewThread && router.push(`/threads/${currentThreadId}`);
      }
    }
  }, [
    runStatus,
    refreshStatus,
    runId,
    messages,
    setLoading,
    session,
    currentThreadId,
    router,
    isNewThread,
  ]);

  const handleNewThreadId = (id) => {
    setCurrentThreadId(id);

    handleRunAssistant(id);
  };

  const handleNewThread = async ({ newMessage }) => {
    console.log('new thread');
    console.log('new thread Message', newMessage);

    const res = await fetch('/api/openai/createThread', {
      method: 'POST',
    });

    const { id } = await res.json();

    handleAddMessage(id, newMessage);

    setCurrentThreadId(id);

    await fetch('/api/supabase/newThread', {
      method: 'POST',
      body: JSON.stringify({
        threadId: id,
      }),
    });

    return id;
  };

  const handleAddMessage = async (threadId, newMessage) => {
    console.log('add message');

    const addMessage = await fetch('/api/openai/addThreadMessage', {
      method: 'POST',
      body: JSON.stringify({
        message: newMessage,
        threadId,
      }),
    });

    await fetch('/api/supabase/updateThread', {
      method: 'POST',
      body: JSON.stringify({
        threadId: threadId,
      }),
    });

    console.log('addMessage', await addMessage.json());

    handleRunAssistant(threadId);
  };

  const handleRunAssistant = async (threadId) => {
    console.log('run assistant');

    try {
      const res = await fetch('/api/openai/runAssistant', {
        method: 'POST',
        body: JSON.stringify({
          threadId,
        }),
      });

      const { status, id } = await res.json();

      setRunStatus(status);
      setRunId(id);
    } catch (error) {
      console.log('error', error);
      setLoading(false);
    }
  };

  return {
    messages,
    runStatus,
    handleNewThread,
    handleAddMessage,
    handleNewThreadId,
  };
}
