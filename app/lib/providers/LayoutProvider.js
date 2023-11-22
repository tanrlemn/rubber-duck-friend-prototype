'use client';

// hooks
import { createContext } from 'react';
import { useIsMobile } from '@/app/lib/hooks/useIsMobile';

// chakra-ui
import { Flex, HStack } from '@chakra-ui/react';

export const LayoutContext = createContext();

export function LayoutProvider({ children }) {
  const isMobile = useIsMobile();

  return (
    <LayoutContext.Provider value={{ isMobile }}>
      {isMobile ? (
        <>{children}</>
      ) : (
        <Flex
          gap={0}
          direction={'row-reverse'}>
          {children}
        </Flex>
      )}
    </LayoutContext.Provider>
  );
}
