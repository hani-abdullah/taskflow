'use client';

import {
  Alert,
  Box,
  Button,
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
import { useAuthStore } from '@/stores/auth.store';
import { color } from '@/theme/tokens';

import type { z } from 'zod';

type LoginForm = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const setAccessToken = useAuthStore((state) => state.setAccessToken);
  const setUser = useAuthStore((state) => state.setUser);

  const {
    register: registerField,
    handleSubmit,
    formState: { errors, isSubmitting },
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
      setError('root', { message: 'Invalid email or password' });
    }
  };

  return (
    <Box sx={{ minHeight: { xs: 'auto', md: '100vh' }, display: 'grid', placeItems: 'center', p: { xs: 3, md: 4 } }}>
      <Stack component="form" spacing={3} onSubmit={handleSubmit(onSubmit)} sx={{ width: '100%', maxWidth: 420 }}>
        <Box>
          <Typography variant="h3" component="h1">Welcome back</Typography>
          <Typography sx={{ color: color.stone, mt: 1 }}>Sign in to your Taskflow workspace.</Typography>
        </Box>

        {errors.root && <Alert severity="error">{errors.root.message}</Alert>}

        <TextField
          label="Email"
          type="email"
          autoComplete="email"
          fullWidth
          {...registerField('email')}
          error={!!errors.email}
          helperText={errors.email?.message}
        />

        <TextField
          label="Password"
          type="password"
          autoComplete="current-password"
          fullWidth
          {...registerField('password')}
          error={!!errors.password}
          helperText={errors.password?.message}
        />

        <Button type="submit" variant="contained" size="large" disabled={isSubmitting}>
          {isSubmitting ? 'Signing in...' : 'Sign in'}
        </Button>

        <Stack direction="row" sx={{ justifyContent: 'space-between' }}>
          <Typography component={Link} href="/register" sx={{ color: color.forest, fontWeight: 600, fontSize: 14 }}>
            Create account
          </Typography>
          <Typography component={Link} href="/forgot-password" sx={{ color: color.stone, fontSize: 14 }}>
            Forgot password?
          </Typography>
        </Stack>
      </Stack>
    </Box>
  );
}
