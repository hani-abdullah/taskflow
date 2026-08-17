import type { Metadata } from 'next';

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
        <AppProviders>
          {children}
        </AppProviders>
      </body>
    </html>
  );
}