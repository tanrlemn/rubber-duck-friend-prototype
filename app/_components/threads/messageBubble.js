'use client';

// context
import { LoadingContext } from '@/app/lib/providers/LoadingProvider';

// hooks
import { useContext, useEffect } from 'react';

// chakra-ui
import {
  Modal,
  Icon,
  Image,
  Box,
  Heading,
  ListItem,
  Text,
  Flex,
} from '@chakra-ui/react';

export default function MessageBubble({
  role,
  message,
  isLatestMessage = false,
}) {
  const { setLoading } = useContext(LoadingContext);

  useEffect(() => {
    if (isLatestMessage) {
      document
        .getElementById(message.id)
        .scrollIntoView({ behavior: 'smooth', block: 'end' });
      setLoading(false);
    }
  }, [message, isLatestMessage, setLoading]);

  return (
    <ListItem
      maxW={'100%'}
      id={message.id}
      display={'flex'}
      flexDirection={'column'}
      alignItems={role === 'user' ? 'flex-end' : 'flex-start'}
      mt={'1rem'}>
      <Text
        maxW={{ base: '100%', md: '30rem' }}
        p={'1rem'}
        borderRadius={
          role === 'user' ? '1rem 1rem 0.1rem 1rem' : '1rem 1rem 1rem 0.1rem'
        }
        background={
          role === 'user' ? 'var(--blue)' : 'var(--darkPurpleGrayAlt)'
        }>
        {message.content[0].text.value}
      </Text>
      {/* <span>{message.timestamp.toLocaleString()}</span> */}
    </ListItem>
  );
}

export function Media({ hasFailed, url }) {
  return (
    <div
      onClick={() => {
        Modal.info({
          centered: true,
          icon: null,
          okText: 'Close',
          width: '60%',
          content: (
            <div className={styles.picture_container}>
              <Image
                alt='Media'
                style={{ width: '100%', height: '100%' }}
                src={url}
              />
            </div>
          ),
        });
      }}>
      {!url && !hasFailed && <Box></Box>}

      {hasFailed && (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <Icon
            type={'warning'}
            style={{ fontSize: '5em' }}
          />
          <p>Failed to load media</p>
        </div>
      )}

      {!hasFailed && url && (
        <div className={styles.media_icon}>
          <div style={{ zIndex: 123, position: 'absolute' }}>
            <Icon
              type={'eye'}
              style={{ fontSize: '5em', opacity: 0.3 }}
            />
          </div>
          <div
            className={styles.picture_preview}
            style={{ backgroundImage: `url(${url})`, zIndex: 122 }}></div>
        </div>
      )}
    </div>
  );
}
