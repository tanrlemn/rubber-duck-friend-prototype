'use client';

// context
import { LoadingContext } from '@/app/lib/providers/LoadingProvider';
import { SessionContext } from '@/app/lib/providers/SessionProvider';

// hooks
import { useState, useEffect, useContext } from 'react';

export function useOpenaiThreads(threadId = null) {
  const { setLoading } = useContext(LoadingContext);
  const { session } = useContext(SessionContext);

  const [runId, setRunId] = useState(null);
  const [runStatus, setRunStatus] = useState(null);
  const [refreshStatus, setRefreshStatus] = useState(false);
  const [messages, setMessages] = useState(null);

  useEffect(() => {
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
    runId,
    messages,
    setLoading,
    session,
    threadId,
  ]);

  const handleNewThreadId = (id) => {
    threadId = id;

    handleRunAssistant(threadId);
  };

  const handleNewThread = async ({ newMessage }) => {
    console.log('new thread');
    console.log('new thread Message', newMessage);

    const res = await fetch('/api/openai/createThread', {
      method: 'POST',
    });

    const { id } = await res.json();

    handleAddMessage(id, newMessage);

    threadId = id;

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

  return {
    messages,
    runStatus,
    handleNewThread,
    handleAddMessage,
    handleNewThreadId,
  };
}
