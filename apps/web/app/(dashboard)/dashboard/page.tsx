'use client';

import { Container, Typography } from '@mui/material';

import { useAuthStore } from '@/stores/auth.store';

export default function DashboardPage() {
  const user = useAuthStore((state) => state.user);

  return (
    <Container sx={{ py: 6 }}>
      <Typography variant="h3">
        Dashboard
      </Typography>

      <Typography color="text.secondary">
        Welcome back{user ? `, ${user.firstName}` : ''}.
      </Typography>
    </Container>
  );
}