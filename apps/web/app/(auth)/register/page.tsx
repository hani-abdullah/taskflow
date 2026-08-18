'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import type { z } from 'zod';

import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';

import {
  getMe,
  register as registerUser,
} from '@/features/auth/api';
import { registerSchema } from '@/features/auth/schemas';
import { useAuthStore } from '@/stores/auth.store';

type RegisterForm = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const router = useRouter();

  const setAccessToken = useAuthStore(
    (state) => state.setAccessToken,
  );
  const setUser = useAuthStore(
    (state) => state.setUser,
  );

  const [serverError, setServerError] = useState<string | null>(
    null,
  );

  const {
    register,
    handleSubmit,
    formState: {
      errors,
      isSubmitting,
    },
    setError,
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: RegisterForm) => {
    setServerError(null);

    try {
      const result = await registerUser({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
      });

      setAccessToken(result.accessToken);

      const me = await getMe();
      setUser(me);

      router.replace('/dashboard');
    } catch (error: unknown) {
      const status = axios.isAxiosError(error)
        ? error.response?.status
        : undefined;

      if (status === 409) {
        setError('email', {
          type: 'server',
          message: 'An account with this email already exists.',
        });

        return;
      }

      if (status === 400) {
        setServerError(
          'Please check your information and try again.',
        );

        return;
      }

      setServerError(
        'Something went wrong. Please try again.',
      );
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        px: 2,
        py: 6,
        bgcolor: 'background.default',
      }}
    >
      <Card
        elevation={3}
        sx={{
          width: '100%',
          maxWidth: 460,
          borderRadius: 3,
        }}
      >
        <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
          <Stack
            component="form"
            spacing={2.5}
            onSubmit={handleSubmit(onSubmit)}
          >
            {/* Header */}

            <Box sx={{ mb: 1 }}>
              <Typography
                variant="h4"
                component="h1"
                gutterBottom
                sx={{fontWeight: 700}}
              >
                Create your account
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
              >
                Get started with TaskFlow today.
              </Typography>
            </Box>

            {/* Server error */}

            {serverError && (
              <Alert severity="error">
                {serverError}
              </Alert>
            )}

            {/* First + Last name */}

            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={2}
            >
              <TextField
                label="First name"
                fullWidth
                autoComplete="given-name"
                {...register('firstName')}
                error={!!errors.firstName}
                helperText={errors.firstName?.message}
              />

              <TextField
                label="Last name"
                fullWidth
                autoComplete="family-name"
                {...register('lastName')}
                error={!!errors.lastName}
                helperText={errors.lastName?.message}
              />
            </Stack>

            {/* Email */}

            <TextField
              label="Email"
              type="email"
              fullWidth
              autoComplete="email"
              {...register('email')}
              error={!!errors.email}
              helperText={errors.email?.message}
            />

            {/* Password */}

            <TextField
              label="Password"
              type="password"
              fullWidth
              autoComplete="new-password"
              {...register('password')}
              error={!!errors.password}
              helperText={
                errors.password?.message ||
                'Minimum 8 characters'
              }
            />

            {/* Confirm password */}

            <TextField
              label="Confirm password"
              type="password"
              fullWidth
              autoComplete="new-password"
              {...register('confirmPassword')}
              error={!!errors.confirmPassword}
              helperText={
                errors.confirmPassword?.message
              }
            />

            {/* Submit */}

            <Button
              type="submit"
              variant="contained"
              size="large"
              fullWidth
              disabled={isSubmitting}
              sx={{
                mt: 1,
                py: 1.4,
                fontWeight: 600,
              }}
            >
              {isSubmitting ? (
                <>
                  <CircularProgress
                    size={20}
                    color="inherit"
                    sx={{ mr: 1 }}
                  />

                  Creating account...
                </>
              ) : (
                'Create account'
              )}
            </Button>

            {/* Login link */}

            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ pt: 1, textAlign: 'center' }}
            >
              Already have an account?{' '}

              <Box
                component={Link}
                href="/login"
                sx={{
                  color: 'primary.main',
                  fontWeight: 600,
                  textDecoration: 'none',

                  '&:hover': {
                    textDecoration: 'underline',
                  },
                }}
              >
                Sign in
              </Box>
            </Typography>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
}
