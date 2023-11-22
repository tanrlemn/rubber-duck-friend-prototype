'use client';

// context
import { LoadingContext } from '@/app/lib/providers/LoadingProvider';

// hooks
import { useContext, useEffect, useState } from 'react';
import { useRemark } from 'react-remark';

// chakra-ui
import { Box, Code, ListItem, Text } from '@chakra-ui/react';

// local components
import BouncingBall from '../icons/bouncingBall';

export default function MessageBubble({
  role,
  message,
  isLatestMessage = false,
  loadingBubble = false,
}) {
  const { setLoading, loadingInPlace } = useContext(LoadingContext);
  const [reactContent, setMarkdownSource] = useRemark({
    rehypeReactOptions: {
      components: {
        p: (props) => (
          <Text
            p={'1rem 0'}
            {...props}></Text>
        ),
        code: (props) => (
          <Code
            position={'relative'}
            boxSizing='border-box'
            p={'0.1rem 0.5rem'}
            mb={'-0.5rem'}
            bottom={0}
            overflowX={'auto'}
            maxW={'100%'}
            colorScheme={'blackAlpha'}
            color={'var(--midOrange)'}
            variant={'solid'}
            {...props}></Code>
        ),
      },
    },
  });
  const [messageDate, setMessageDate] = useState(null);

  useEffect(() => {
    if (isLatestMessage) {
      setTimeout(() => {
        document
          .getElementById(loadingBubble ? 'loadingBubble' : message.id)
          .scrollIntoView({
            block: 'start',
            inline: 'nearest',
            behavior: 'smooth',
          });
        setLoading(false);
      }, 500);
    }

    if (message) {
      const date = new Date(message.created_at);
      const hours = date.getHours();
      const minutes = date.getMinutes();
      const ampm = hours >= 12 ? 'pm' : 'am';

      setMessageDate(`${hours}:${minutes} ${ampm}`);
      setMarkdownSource(message.content[0].text.value);
      console.log(
        'message.content[0].text.value',
        message.content[0].text.value
      );
    }
  }, [message, isLatestMessage, setLoading, setMarkdownSource, loadingBubble]);

  return (
    <>
      <ListItem
        maxW={'100%'}
        id={!loadingBubble ? message.id : 'loadingBubble'}
        display={'flex'}
        flexDirection={'column'}
        alignItems={role === 'user' ? 'flex-end' : 'flex-start'}
        m={'1.5rem 0'}>
        <Box
          maxW={{ base: '100%', md: '30rem' }}
          p={'0.5rem 1rem'}
          borderRadius={
            role === 'user' ? '1rem 1rem 0.1rem 1rem' : '1rem 1rem 1rem 0.1rem'
          }
          background={
            role === 'user' ? 'var(--blue)' : 'var(--darkPurpleGrayAlt)'
          }>
          {!loadingBubble ? <>{reactContent}</> : <BouncingBall />}
        </Box>
      </ListItem>
    </>
  );
}
