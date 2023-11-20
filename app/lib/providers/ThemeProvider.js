'use client';

// chakra-ui
import { ChakraProvider } from '@chakra-ui/react';

// local
import { theme } from '../styles/rubberDuckFriendTheme';

export function ThemeProvider({ children }) {
  return <ChakraProvider theme={theme}>{children}</ChakraProvider>;
}
