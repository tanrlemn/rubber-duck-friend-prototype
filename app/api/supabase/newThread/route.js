import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(req) {
  const cookieStore = cookies();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        get(name) {
          return cookieStore.get(name)?.value;
        },
        set(name, value, options) {
          cookieStore.set({ name, value, ...options });
        },
        remove(name, options) {
          cookieStore.set({ name, value: '', ...options });
        },
      },
    }
  );

  const {
    data: { session },
  } = await supabase.auth.getSession();

  try {
    const request = await req.json();

    const { threadId } = request;

    if (session) {
      const { data: threads, error } = await supabase.from('threads').insert([
        {
          user_id: session.user.id,
          thread_id: threadId,
        },
      ]);

      return NextResponse.json({ threads, error });
    }

    return NextResponse.redirect('/auth');
  } catch (error) {
    console.error(error);
    return NextResponse.error(error);
  }
}
