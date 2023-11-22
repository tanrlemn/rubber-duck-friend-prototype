import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET() {
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
    if (session) {
      const { data: threads, error } = await supabase
        .from('threads')
        .select()
        .order('updated_at', { ascending: false });

      return NextResponse.json({ threads, error });
    }

    return NextResponse.redirect('/auth');
  } catch (error) {
    console.error(error);
    return NextResponse.error(error);
  }
}
