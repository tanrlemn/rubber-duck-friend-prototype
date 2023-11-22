'use client';

// chakra-ui
import { Box, Container, Heading, Text, Link, Button } from '@chakra-ui/react';

export default function NotFound() {
  return (
    <Container pt={'5rem'}>
      <Box mb={'1rem'}>
        <Heading size={'4xl'}>404</Heading>
        <Heading>Page Not Found</Heading>
        <Text>Sorry, we couldn&apos;t find that page...</Text>
      </Box>
      <Link href='/'>
        <Button>Return home</Button>
      </Link>
    </Container>
  );
}
