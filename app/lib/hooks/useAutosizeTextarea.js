'use client';

// hooks
import { useEffect } from 'react';
import { useWindowHeight } from './useWindowHeight';

export function useAutosizeTextarea(textAreaRef, value) {
  const windowHeight = useWindowHeight();

  useEffect(() => {
    if (textAreaRef) {
      textAreaRef.style.height = '0px';
      const scrollHeight = textAreaRef.scrollHeight;

      if (scrollHeight + 20 > windowHeight) {
        textAreaRef.style.height = windowHeight - 20 + 'px';
      } else {
        textAreaRef.style.height = scrollHeight + 20 + 'px';
      }
    }
  }, [textAreaRef, value, windowHeight]);
}
