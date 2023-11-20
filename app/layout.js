import './globals.css';

// font
import { Inter } from 'next/font/google';
const inter = Inter({ subsets: ['latin'] });

// server
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

// providers
import { ThemeProvider } from './lib/providers/ThemeProvider';
import { LoadingProvider } from './lib/providers/LoadingProvider';
import { ScaleProvider } from './lib/providers/ScaleProvider';
import { SessionProvider } from './lib/providers/SessionProvider';

// local components
import Navbar from './_navigation/navbar';

// metadata
export const metadata = {
  title: 'Rubber Duck Friend Prototype',
  description: 'A prototype for a rubber duck friend.',
};

export default async function RootLayout({ children }) {
  const cookieStore = cookies();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        get(name) {
          return cookieStore.get(name)?.value;
        },
      },
    }
  );
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <html lang='en'>
      <body className={inter.className}>
        <LoadingProvider>
          <ScaleProvider>
            <ThemeProvider>
              <SessionProvider session={session}>
                <Navbar />
                {children}
              </SessionProvider>
            </ThemeProvider>
          </ScaleProvider>
        </LoadingProvider>
      </body>
    </html>
  );
}
