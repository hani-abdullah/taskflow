'use client';

import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { Alert, Box, Button, Card, CardContent, CircularProgress, Stack, Typography } from '@mui/material';
import { CheckCircle, HourglassTop } from '@mui/icons-material';
import { getSubscription } from '@/features/billing/api';

const FINAL_STATUSES = new Set(['ACTIVE', 'TRIALING']);

export default function BillingSuccessPage() {
  const subscription = useQuery({
    queryKey: ['subscription'],
    queryFn: getSubscription,
    refetchInterval: (query) => FINAL_STATUSES.has(query.state.data?.status ?? '') ? false : 2000,
    refetchIntervalInBackground: true,
  });
  const active = FINAL_STATUSES.has(subscription.data?.status ?? '');

  return (
    <Box sx={{ maxWidth: 680, mx: 'auto', py: { xs: 4, md: 8 } }}>
      <Card variant="outlined" sx={{ borderRadius: 4 }}>
        <CardContent sx={{ p: { xs: 3, md: 5 }, textAlign: 'center' }}>
          <Box sx={{ width: 72, height: 72, borderRadius: '50%', mx: 'auto', mb: 3, display: 'grid', placeItems: 'center', bgcolor: active ? 'success.light' : 'action.hover', color: active ? 'success.dark' : 'primary.main' }}>
            {active ? <CheckCircle sx={{ fontSize: 42 }} /> : <HourglassTop sx={{ fontSize: 38 }} />}
          </Box>
          <Typography variant="h4" sx={{ fontWeight: 900, mb: 1 }}>
            {active ? 'Your Pro plan is active' : 'Confirming your subscription'}
          </Typography>
          <Typography color="text.secondary" sx={{ mb: 4 }}>
            {active ? 'Stripe confirmed the payment and TaskFlow received the webhook.' : 'Checkout is complete. We are waiting for Stripe to securely confirm the payment.'}
          </Typography>
          {!active && !subscription.isError ? (
            <Stack direction="row" spacing={1.5} sx={{ justifyContent: 'center', alignItems: 'center', mb: 4 }}>
              <CircularProgress size={20} />
              <Typography variant="body2">Checking payment status...</Typography>
            </Stack>
          ) : null}
          {subscription.isError ? (
            <Alert severity="warning" sx={{ mb: 3, textAlign: 'left' }}>We could not check the status right now. Your payment is still safe in Stripe; refresh this page or check Billing shortly.</Alert>
          ) : null}
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} sx={{ justifyContent: 'center' }}>
            <Button component={Link} href="/billing" variant="contained">View billing</Button>
            <Button component={Link} href="/dashboard" variant="outlined">Go to dashboard</Button>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
}
