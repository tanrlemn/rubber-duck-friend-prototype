import './globals.css';

// font
import { Inter } from 'next/font/google';
const inter = Inter({ subsets: ['latin'] });

// providers
import { ThemeProvider } from './lib/providers/ThemeProvider';
import { LoadingProvider } from './lib/providers/LoadingProvider';
import { ScaleProvider } from './lib/providers/ScaleProvider';
// import { SessionProvider } from './lib/providers/SessionProvider';

// local components
import Navbar from './_navigation/navbar';

// metadata
export const metadata = {
  title: 'Rubber Duck Friend Prototype',
  description: 'A prototype for a rubber duck friend.',
};

export default async function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <LoadingProvider>
          <ScaleProvider>
            <ThemeProvider>
              <Navbar />
              {children}
            </ThemeProvider>
          </ScaleProvider>
        </LoadingProvider>
      </body>
    </html>
  );
}
