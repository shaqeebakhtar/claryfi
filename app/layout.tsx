import { cn } from '@/lib/utils';
import '@/styles/globals.css';
import type { Metadata } from 'next';
import { Kumbh_Sans as FontSans } from 'next/font/google';
import Providers from './providers';

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'Claryfi',
  description: 'Collect users feedback',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Providers>
        <body
          className={cn(
            'min-h-screen font-sans antialiased bg-gray-50',
            fontSans.variable
          )}
        >
          {children}
        </body>
      </Providers>
    </html>
  );
}
