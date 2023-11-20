// chakra-ui
import { extendTheme } from '@chakra-ui/react';

export const theme = extendTheme({
  initialColorMode: 'dark',
  useSystemColorMode: false,
  styles: {
    global: {
      body: {
        bg: 'var(--darkerPurpleGray)',
        color: 'white',
      },
    },
  },
});
