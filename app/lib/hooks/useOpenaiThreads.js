'use client';

// context
import { LoadingContext } from '@/app/lib/providers/LoadingProvider';
import { SessionContext } from '@/app/lib/providers/SessionProvider';
import { ThreadContext } from '../providers/ThreadProvider';

// hooks
import { useState, useEffect, useContext, useCallback } from 'react';
import { useRouter } from 'next/navigation';

export function useOpenaiThreads(threadId = null, isNewThread = false) {
  const { setLoading, setLoadingInPlace, loadingInPlace } =
    useContext(LoadingContext);
  const { session } = useContext(SessionContext);
  const { threadMessages, setThreadMessages } = useContext(ThreadContext);

  const router = useRouter();

  const [currentThreadId, setCurrentThreadId] = useState(threadId);
  const [runId, setRunId] = useState(null);
  const [runStatus, setRunStatus] = useState(null);
  const [refreshStatus, setRefreshStatus] = useState(false);

  const getMessages = useCallback(async () => {
    try {
      const res = await fetch('/api/openai/getThreadMessages', {
        method: 'POST',
        body: JSON.stringify({
          threadId: currentThreadId,
        }),
      });

      const { data } = await res.json();

      setThreadMessages(data);
      console.log('data', data);
    } catch (error) {
      console.log('error', error);
      setLoading(false);
    }
  }, [currentThreadId, setLoading, setThreadMessages]);

  useEffect(() => {
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

    if (threadMessages === null && currentThreadId !== null) {
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

        if (isNewThread) {
          router.push(`/threads/${currentThreadId}`);
        }
        if (loadingInPlace) {
          setLoadingInPlace(false);
        }
      }
    }
  }, [
    runStatus,
    refreshStatus,
    runId,
    setLoading,
    session,
    currentThreadId,
    router,
    isNewThread,
    setLoadingInPlace,
    loadingInPlace,
    getMessages,
    threadMessages,
  ]);

  const handleNewThreadId = (id) => {
    setCurrentThreadId(id);

    handleRunAssistant(id);
  };

  const handleNewThread = async ({ newMessage }) => {
    console.log('new thread');

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

    await fetch('/api/openai/addThreadMessage', {
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
    runStatus,
    handleNewThread,
    handleAddMessage,
    handleNewThreadId,
  };
}
