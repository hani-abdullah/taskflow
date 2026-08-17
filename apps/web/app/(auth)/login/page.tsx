'use client';

import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { loginSchema } from '@/features/auth/schemas';
import { getMe, login } from '@/features/auth/api';
import {
  useAuthStore,
} from '@/stores/auth.store';

import type { z } from 'zod';

type LoginForm = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();

  const setAccessToken =
    useAuthStore((state) => state.setAccessToken);
  const setUser = useAuthStore(
    (state) => state.setUser,
  );

  const {
    register: registerField,
    handleSubmit,
    formState: {
      errors,
      isSubmitting,
    },
    setError,
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginForm) => {
    try {
      const result = await login(data);

      setAccessToken(result.accessToken);

      const me = await getMe();
      setUser(me);

      router.replace('/dashboard');
    } catch {
      setError('root', {
        message: 'Invalid email or password',
      });
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'grid',
        placeItems: 'center',
        p: 2,
      }}
    >
      <Card sx={{ width: '100%', maxWidth: 420 }}>
        <CardContent>
          <Stack
            component="form"
            spacing={3}
            onSubmit={handleSubmit(onSubmit)}
          >
            <Box>
              <Typography variant="h4">
                Welcome back
              </Typography>

              <Typography color="text.secondary">
                Sign in to TaskFlow
              </Typography>
            </Box>

            {errors.root && (
              <Alert severity="error">
                {errors.root.message}
              </Alert>
            )}

            <TextField
              label="Email"
              type="email"
              fullWidth
              {...registerField('email')}
              error={!!errors.email}
              helperText={errors.email?.message}
            />

            <TextField
              label="Password"
              type="password"
              fullWidth
              {...registerField('password')}
              error={!!errors.password}
              helperText={errors.password?.message}
            />

            <Button
              type="submit"
              variant="contained"
              size="large"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Signing in...' : 'Sign in'}
            </Button>

            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <Link href="/register">
                Create account
              </Link>

              <Link href="/forgot-password">
                Forgot password?
              </Link>
            </Box>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
}