'use client';

import Link from 'next/link';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowBack, MarkEmailReadOutlined } from '@mui/icons-material';
import { Alert, Box, Button, Card, CardContent, Stack, TextField, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { forgotPassword } from '@/features/auth/api';

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
    <Box sx={{ minHeight: '100vh', display: 'grid', placeItems: 'center', p: 2 }}>
      <Card sx={{ width: '100%', maxWidth: 440 }}>
        <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
          {sent ? (
            <Stack spacing={3} sx={{ textAlign: 'center', alignItems: 'center' }}>
              <MarkEmailReadOutlined color="primary" sx={{ fontSize: 56 }} />
              <Box>
                <Typography variant="h4">Check your email</Typography>
                <Typography color="text.secondary" sx={{ mt: 1 }}>
                  If an account exists for that address, we sent password reset instructions.
                </Typography>
              </Box>
              <Alert severity="info" sx={{ textAlign: 'left' }}>
                The message may take a few minutes. Remember to check your spam folder.
              </Alert>
              <Button component={Link} href="/login" startIcon={<ArrowBack />}>
                Back to sign in
              </Button>
            </Stack>
          ) : (
            <Stack component="form" spacing={3} onSubmit={handleSubmit(onSubmit)}>
              <Box>
                <Typography variant="h4">Forgot your password?</Typography>
                <Typography color="text.secondary" sx={{ mt: 1 }}>
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
        </CardContent>
      </Card>
    </Box>
  );
}
