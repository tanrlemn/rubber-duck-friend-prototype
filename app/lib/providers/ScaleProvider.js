'use client';

import { createContext, useState, useEffect } from 'react';
import { useWindowScale } from '../hooks/useWindowScale';
import { useWindowWidth } from '../hooks/useWindowWidth';
import { useWindowHeight } from '../hooks/useWindowHeight';

export const ScaleContext = createContext();

export function ScaleProvider({ children }) {
  const windowScale = useWindowScale();
  const windowWidth = useWindowWidth();
  const windowHeight = useWindowHeight();
  const [scale, setScale] = useState(1);
  const [width, setWidth] = useState(windowWidth);
  const [height, setHeight] = useState(windowHeight);

  useEffect(() => {
    setScale(2 / windowScale);
    setWidth(windowWidth);
    setHeight(windowHeight);
  }, [windowScale, windowWidth, windowHeight]);

  return (
    <ScaleContext.Provider value={{ scale, width, height }}>
      {children}
    </ScaleContext.Provider>
  );
}
