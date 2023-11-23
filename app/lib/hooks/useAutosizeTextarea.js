'use client';

// context
import { LoadingContext } from '../providers/LoadingProvider';

// hooks
import { useEffect, useContext } from 'react';
import { useWindowHeight } from './useWindowHeight';

export function useAutosizeTextarea(textAreaRef, value) {
  const { loadingInPlace } = useContext(LoadingContext);

  const windowHeight = useWindowHeight();

  useEffect(() => {
    if (textAreaRef) {
      textAreaRef.style.height = '0px';
      const scrollHeight = textAreaRef.scrollHeight;

      if (loadingInPlace) {
        textAreaRef.style.maxHeight = '8rem';
      } else if (scrollHeight > windowHeight * 0.8) {
        textAreaRef.style.height = windowHeight * 0.8 + 'px';
      } else {
        textAreaRef.style.height = scrollHeight + 20 + 'px';
      }
    }
  }, [textAreaRef, value, windowHeight, loadingInPlace]);
}
