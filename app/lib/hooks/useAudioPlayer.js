'use client';

// hooks
import { useEffect, useState } from 'react';

export const useAudioPlayer = () => {
  const [audio] = useState(() => new Audio('/speech.mp3'));
  const [isPlaying, setIsPlaying] = useState(false);

  const playAudio = (newAudioToken) => {
    if (!isPlaying) {
      const bubblePopAudio = new Audio('/bubblePop.mp3');
      audio.src = `/speech.mp3?token=${newAudioToken}`;

      audio.load();
      bubblePopAudio.load();
      bubblePopAudio.play();
      bubblePopAudio.onended = () => {
        audio
          .play()
          .then(() => {
            setIsPlaying(true);
          })
          .catch((error) => {
            console.error('Audio playback failed:', error);
          });
      };
    }
  };

  const endAudio = () => {
    console.log('endAudio called');
    const mediaElements = document.querySelectorAll('audio');
    mediaElements.forEach((media) => {
      if (!media.paused) {
        media.pause();
        media.currentTime = 0;
      }
    });

    setIsPlaying(false);
  };

  useEffect(() => {
    const handlePause = () => {
      setIsPlaying(false);
    };

    const handleEnded = () => {
      audio.pause();
      audio.currentTime = 0;
      setIsPlaying(false);
    };

    audio.addEventListener('pause', handlePause);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [audio]);

  return { playAudio, endAudio, isPlaying };
};
