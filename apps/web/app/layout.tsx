import type { Metadata } from 'next';
import { Fraunces, Outfit } from 'next/font/google';

import EmotionRegistry from './EmotionRegistry';
import { AppProviders } from '@/providers/app-providers';
import './globals.css';

const sans = Outfit({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const display = Fraunces({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Taskflow — Finish the work that matters',
    template: '%s · Taskflow',
  },
  description:
    'The focused workspace for ambitious teams. Plan projects, own every task, and see progress without the noise.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${sans.variable} ${display.variable}`}>
      <body className={sans.className}>
        <EmotionRegistry>
          <AppProviders>
            {children}
          </AppProviders>
        </EmotionRegistry>
      </body>
    </html>
  );
}
