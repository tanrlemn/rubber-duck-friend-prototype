'use client';

// context
import { LoadingContext } from '@/app/lib/providers/LoadingProvider';
import { SessionContext } from '@/app/lib/providers/SessionProvider';
import { ThreadContext } from '../providers/ThreadProvider';

// hooks
import { useState, useEffect, useContext, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useAudioPlayer } from './useAudioPlayer';

export function useOpenaiThreads(threadId = null, isNewThread = false) {
  const { setLoading, setLoadingInPlace, loadingInPlace } =
    useContext(LoadingContext);
  const { session } = useContext(SessionContext);
  const { threadMessages, setThreadMessages } = useContext(ThreadContext);
  const { isPlaying, playAudio } = useAudioPlayer();

  const router = useRouter();

  const [currentThreadId, setCurrentThreadId] = useState(threadId);
  const [runId, setRunId] = useState(null);
  const [runStatus, setRunStatus] = useState(null);
  const [refreshStatus, setRefreshStatus] = useState(false);
  const [isGeneratingAudio, setIsGeneratingAudio] = useState(false);

  const lastProcessedMessageId = useRef(null);

  useEffect(() => {
    const generateSpokenAudio = async (newMessage) => {
      if (!isPlaying && !isGeneratingAudio) {
        setLoadingInPlace(true);
        setIsGeneratingAudio(true);
        try {
          const res = await fetch('/api/openai/generateSpokenAudio', {
            method: 'POST',
            body: JSON.stringify({ message: newMessage }),
          });

          if (res.ok) {
            const audioToken = await res.json();
            console.log('audioToken:', audioToken);
            playAudio(audioToken);
          } else {
            throw new Error('Failed to fetch audio');
          }
        } catch (error) {
          console.error('Error generating audio:', error);
        } finally {
          setLoadingInPlace(false);
          setIsGeneratingAudio(false);
        }
      }
    };

    const getMessages = async () => {
      try {
        const res = await fetch('/api/openai/getThreadMessages', {
          method: 'POST',
          body: JSON.stringify({
            threadId: currentThreadId,
          }),
        });

        const { data } = await res.json();

        setThreadMessages(data);

        console.log('thread data (useOpenaiThreads):', data);
        const lastMessage = data[data.length - 1];
        const role = lastMessage.role;

        if (
          lastProcessedMessageId.current !== lastMessage.id &&
          role === 'assistant' &&
          lastMessage !== null &&
          runStatus === 'completed' &&
          !isPlaying
        ) {
          lastProcessedMessageId.current = lastMessage.id;
          generateSpokenAudio(lastMessage.content[0].text.value);
        }
        setRunStatus(null);

        if (loadingInPlace) {
          setLoadingInPlace(false);
        }
      } catch (error) {
        console.log('error', error);

        setRunStatus(null);
        setLoadingInPlace(false);
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

    if (threadMessages === null && currentThreadId !== null && !isNewThread) {
      getMessages();
    }

    if (runStatus !== null) {
      console.log('Assistant Run Status (useOpenaiThreads):', runStatus);

      if (runStatus !== 'completed' && !refreshStatus && runId !== null) {
        setRefreshStatus(true);

        setTimeout(() => {
          getRunStatus();
          setRefreshStatus(false);
        }, 1000);
      }

      if (runStatus === 'completed') {
        getMessages();

        if (isNewThread) {
          router.push(`/threads/${currentThreadId}`);
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
    threadMessages,
    setThreadMessages,
    isPlaying,
    playAudio,
    isGeneratingAudio,
  ]);

  const handleNewThread = async (newMessage) => {
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
      setRunStatus('failed');

      setLoadingInPlace(false);

      setLoading(false);
    }
  };

  return {
    runStatus,
    handleNewThread,
    handleAddMessage,
  };
}
