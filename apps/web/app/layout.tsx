import type { Metadata } from 'next';

import EmotionRegistry from './EmotionRegistry';
import { AppProviders } from '@/providers/app-providers';

export const metadata: Metadata = {
  title: { default: 'Taskflow — Make space for great work', template: '%s · Taskflow' },
  description: 'A calm, clear workspace for planning projects, focusing your team, and moving every idea forward.',
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
