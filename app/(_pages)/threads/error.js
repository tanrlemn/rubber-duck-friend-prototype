'use client';

// chakra-ui
import { Box, Container, Heading, Text, Link, Button } from '@chakra-ui/react';

export default function NotFound() {
  return (
    <Container pt={'5rem'}>
      <Box mb={'1rem'}>
        <Heading size={'4xl'}>Error</Heading>
        <Heading>There has been an error!</Heading>
        <Text>Sorry, we didn&apos;t mean to...</Text>
      </Box>
      <Link href='/'>
        <Button>Return home</Button>
      </Link>
    </Container>
  );
}
