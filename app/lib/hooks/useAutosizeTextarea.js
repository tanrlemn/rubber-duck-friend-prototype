'use client';

// hooks
import { useEffect } from 'react';

export function useAutosizeTextarea(textAreaRef, value) {
  useEffect(() => {
    if (textAreaRef) {
      textAreaRef.style.height = '0px';
      const scrollHeight = textAreaRef.scrollHeight;

      textAreaRef.style.height = scrollHeight + 20 + 'px';
    }
  }, [textAreaRef, value]);
}
