'use client';

// context
import { SessionContext } from '@/app/lib/providers/SessionProvider';

// hooks
import { useEffect, useContext } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const { session } = useContext(SessionContext);

  const router = useRouter();

  useEffect(() => {
    if (session !== null) {
      router.push('/threads/new');
    }
  });
  return <></>;
}
