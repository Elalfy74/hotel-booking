import './globals.css';

import type { Metadata } from 'next';
import { Inter as FontSans } from 'next/font/google';
import NextTopLoader from 'nextjs-toploader';
import { Toaster } from 'sonner';

import { AppQueryProvider } from '@/components/providers/app-query-provider';
import AppSessionProvider from '@/components/providers/app-session-provider';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { getAppSession } from '@/lib/get-app-session';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Hotel Booking',
  description: 'Hotel Booking Website',
};

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getAppSession();

  return (
    <html lang="en">
      <body className={cn('min-h-screen font-sans antialiased', fontSans.variable)}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AppSessionProvider session={session}>
            <AppQueryProvider>
              <NextTopLoader />
              <Toaster richColors />
              {children}
            </AppQueryProvider>
          </AppSessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
