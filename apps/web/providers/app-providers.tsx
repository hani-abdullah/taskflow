'use client';

import {
  CssBaseline,
  ThemeProvider,
} from '@mui/material';

import { QueryProvider } from './query-provider';
import { AuthProvider } from './auth-provider';

import { theme } from '@/theme/theme';

export function AppProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <QueryProvider>
        <AuthProvider>
          {children}
        </AuthProvider>
      </QueryProvider>
    </ThemeProvider>
  );
}