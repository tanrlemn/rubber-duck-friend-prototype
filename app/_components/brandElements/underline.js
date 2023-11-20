'use client';

// chakra-ui
import { Box } from '@chakra-ui/react';

export default function Underline({ color, margin }) {
  return (
    <Box m={margin || 0}>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='227'
        height='3'
        viewBox='0 0 227 3'
        fill='none'>
        <path
          d='M226 2.50146C226.552 2.50146 227 2.05375 227 1.50146C227 0.94918 226.552 0.501465 226 0.501465V2.50146ZM0 2.50146H226V0.501465H0V2.50146Z'
          fill={color || 'var(--darkPurpleGrayAlt, #432E4C)'}
        />
      </svg>
    </Box>
  );
}
