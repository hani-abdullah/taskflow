'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { CircularProgress, Box } from '@mui/material';

import { useAuth } from '@/providers/auth-provider';
import { useAuthStore } from '@/stores/auth.store';

export function AuthGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const { loading } = useAuth();

  const user = useAuthStore(
    (state) => state.user,
  );

  useEffect(() => {
    if (!loading && !user) {
      router.replace('/login');
    }
  }, [loading, user, router]);

  if (loading || !user) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          display: 'grid',
          placeItems: 'center',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return children;
}