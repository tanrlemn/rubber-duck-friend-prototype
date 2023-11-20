'use client';

// chakra-ui
import { List } from '@chakra-ui/react';
import MessageBubble from './messageBubble';

export default function Thread({ messages }) {
  return (
    <List
      p={'1.5rem'}
      pb={'6rem'}>
      {messages.map((m) => (
        <MessageBubble
          key={m.id}
          role={m.role}
          message={m}
          isLatestMessage={messages[messages.length - 1].id === m.id}
        />
      ))}
    </List>
  );
}
