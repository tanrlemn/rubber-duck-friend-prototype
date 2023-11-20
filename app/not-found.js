// chakra-ui
import { Box, Container, Heading, Text, Link } from '@chakra-ui/react';

// local components
import MainButton from './_components/buttons/mainButton';

export default function NotFound() {
  return (
    <Container pt={'5rem'}>
      <Box mb={'1rem'}>
        <Heading size={'4xl'}>404</Heading>
        <Heading>Page Not Found</Heading>
        <Text>Sorry, we couldn&apos;t find that page...</Text>
      </Box>
      <Link href='/'>
        <MainButton text={'Return Home'} />
      </Link>
    </Container>
  );
}
