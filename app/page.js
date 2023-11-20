'use client';

// context
import { LoadingContext } from '@/app/lib/providers/LoadingProvider';
import { SessionContext } from '@/app/lib/providers/SessionProvider';

// hooks
import { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/navigation';

// local components
import ThreadList from './_components/threads/threadList';

export default function Home() {
  return (
    <>
      <ThreadList />
    </>
  );
}
