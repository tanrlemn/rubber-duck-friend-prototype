'use client';

// chakra-ui
import { Box } from '@chakra-ui/react';

export default function RingResize() {
  return (
    <Box p={'0.5rem'}>
      <svg
        width='24'
        height='24'
        stroke='var(--purpleGray)'
        viewBox='0 0 24 24'
        xmlns='http://www.w3.org/2000/svg'>
        <g className='spinner_V8m1'>
          <circle
            cx='12'
            cy='12'
            r='9.5'
            fill='none'
            strokeWidth='3'></circle>
        </g>
      </svg>
    </Box>
  );
}
