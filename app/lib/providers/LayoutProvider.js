'use client';

// hooks
import { createContext } from 'react';
import { useIsMobile } from '@/app/lib/hooks/useIsMobile';

// chakra-ui
import { HStack } from '@chakra-ui/react';

export const LayoutContext = createContext();

export function LayoutProvider({ children }) {
  const isMobile = useIsMobile();

  return (
    <LayoutContext.Provider value={{ isMobile }}>
      {isMobile ? <> {children}</> : <HStack gap={0}>{children}</HStack>}
    </LayoutContext.Provider>
  );
}
