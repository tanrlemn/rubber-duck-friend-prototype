'use client';

// chakra-ui
import { Box, Container, Heading, Text, Link } from '@chakra-ui/react';

// local components
import MainButton from './_components/buttons/mainButton';

export default function NotFound() {
  return (
    <Container pt={'5rem'}>
      <Box mb={'1rem'}>
        <Heading size={'4xl'}>Error</Heading>
        <Heading>There has been an error!</Heading>
        <Text>Sorry, we didn&apos;t mean to...</Text>
      </Box>
      <Link href='/'>
        <MainButton text={'Return Home'} />
      </Link>
    </Container>
  );
}
