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
import { LayoutProvider } from './lib/providers/LayoutProvider';

// local components
import Navbar from './_navigation/navbar';
import { ThreadProvider } from './lib/providers/ThreadProvider';

const APP_NAME = 'Rubber Duck';
const APP_DEFAULT_TITLE = 'Rubber Duck Friend – Beta';
const APP_TITLE_TEMPLATE = '%s - Rubber Duck Friend';
const APP_DESCRIPTION = 'A rubber duck to help you debug your life.';

// metadata
export const metadata = {
  metadataBase: new URL('https://rubberduckfriend.netlify.app'),
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/en-US',
    },
  },
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  description: APP_DESCRIPTION,
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: APP_DEFAULT_TITLE,
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: 'website',
    siteName: APP_NAME,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
    images: '/images/og-image.png',
  },
  twitter: {
    card: 'summary',
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
};

export const viewport = {
  themeColor: '#432e4cca',
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
                <LayoutProvider>
                  <ThreadProvider>
                    {children}
                    <Navbar />
                  </ThreadProvider>
                </LayoutProvider>
              </SessionProvider>
            </ThemeProvider>
          </ScaleProvider>
        </LoadingProvider>
      </body>
    </html>
  );
}
