'use client';

// local components
import Thread from '@/app/_components/threads/thread';

export default function ThreadPage({ params }) {
  return <Thread threadId={params.id} />;
}
