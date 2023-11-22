'use client';

// hooks
import { useEffect } from 'react';

// chakra-ui
import { Container, Heading, Button } from '@chakra-ui/react';

export default function Error({ error, reset }) {
  useEffect(() => {
    // Optionally log the error to an error reporting service
    console.error('error!!!!!', error);
  }, [error]);

  return (
    <Container>
      <Heading>Something went wrong!</Heading>
      <Button onClick={() => reset()}>Try again</Button>
    </Container>
  );
}
