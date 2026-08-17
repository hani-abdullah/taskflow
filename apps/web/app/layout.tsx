import type { Metadata } from 'next';

import EmotionRegistry from './EmotionRegistry';
import { AppProviders } from '@/providers/app-providers';

export const metadata: Metadata = {
  title: 'TaskFlow',
  description: 'TaskFlow project management application',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <EmotionRegistry>
          <AppProviders>
            {children}
          </AppProviders>
        </EmotionRegistry>
      </body>
    </html>
  );
}