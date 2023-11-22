'use client';

// chakra-ui
import { Box } from '@chakra-ui/react';

export default function BouncingBall() {
  return (
    <Box p={'0.5rem'}>
      <svg
        width='24'
        height='24'
        viewBox='0 0 24 24'
        xmlns='http://www.w3.org/2000/svg'>
        <ellipse
          className='spinner_rXNP'
          cx='12'
          cy='5'
          rx='4'
          ry='4'
          fill={'var(--purpleGray)'}
        />
      </svg>
    </Box>
  );
}
