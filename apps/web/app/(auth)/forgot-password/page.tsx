'use client';

import Link from 'next/link';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowBack, MarkEmailReadOutlined } from '@mui/icons-material';
import { Alert, Box, Button, Stack, TextField, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { forgotPassword } from '@/features/auth/api';
import { color } from '@/theme/tokens';

const forgotPasswordSchema = z.object({
  email: z.string().email('Enter a valid email'),
});

type ForgotPasswordForm = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPasswordPage() {
  const [sent, setSent] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<ForgotPasswordForm>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async ({ email }: ForgotPasswordForm) => {
    try {
      await forgotPassword(email);
      setSent(true);
    } catch {
      setError('root', {
        message: 'We could not send the reset instructions. Please try again.',
      });
    }
  };

  return (
    <Box sx={{ minHeight: { xs: 'auto', md: '100vh' }, display: 'grid', placeItems: 'center', p: { xs: 3, md: 4 } }}>
      <Box sx={{ width: '100%', maxWidth: 440 }}>
        {sent ? (
          <Stack spacing={3}>
            <MarkEmailReadOutlined sx={{ fontSize: 48, color: color.moss }} />
            <Box>
              <Typography variant="h3">Check your email</Typography>
              <Typography sx={{ color: color.stone, mt: 1 }}>
                If an account exists for that address, we sent password reset instructions.
              </Typography>
            </Box>
            <Alert severity="info">
              The message may take a few minutes. Remember to check your spam folder.
            </Alert>
            <Button component={Link} href="/login" startIcon={<ArrowBack />}>
              Back to sign in
            </Button>
          </Stack>
        ) : (
          <Stack component="form" spacing={3} onSubmit={handleSubmit(onSubmit)}>
            <Box>
              <Typography variant="h3">Forgot your password?</Typography>
              <Typography sx={{ color: color.stone, mt: 1 }}>
                Enter your email and we will send you reset instructions.
              </Typography>
            </Box>
            {errors.root ? <Alert severity="error">{errors.root.message}</Alert> : null}
            <TextField
              label="Email"
              type="email"
              autoComplete="email"
              autoFocus
              fullWidth
              {...register('email')}
              error={Boolean(errors.email)}
              helperText={errors.email?.message}
            />
            <Button type="submit" variant="contained" size="large" disabled={isSubmitting}>
              {isSubmitting ? 'Sending...' : 'Send reset instructions'}
            </Button>
            <Button component={Link} href="/login" startIcon={<ArrowBack />}>
              Back to sign in
            </Button>
          </Stack>
        )}
      </Box>
    </Box>
  );
}
