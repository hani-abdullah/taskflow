'use client';

import { useState } from 'react';
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Divider,
  Stack,
  Typography,
} from '@mui/material';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  cancelSubscription,
  createCheckoutSession,
  createPortalSession,
  getSubscription,
} from '@/features/billing/api';

function formatStatus(status: string) {
  return status.toLowerCase().replaceAll('_', ' ');
}

export default function BillingPage() {
  const queryClient = useQueryClient();
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const subscription = useQuery({
    queryKey: ['subscription'],
    queryFn: getSubscription,
    refetchInterval: (query) => ['INCOMPLETE', 'PAST_DUE'].includes(query.state.data?.status ?? '') ? 5000 : false,
  });

  const redirect = (request: () => Promise<{ url: string }>) =>
    request()
      .then(({ url }) => window.location.assign(url))
      .catch(() => setError('We could not open Stripe. Please try again.'));

  const checkout = useMutation({ mutationFn: () => redirect(createCheckoutSession) });
  const portal = useMutation({ mutationFn: () => redirect(createPortalSession) });
  const cancel = useMutation({
    mutationFn: cancelSubscription,
    onSuccess: () => {
      setNotice('Cancellation requested. Stripe will update the status shortly.');
      return queryClient.invalidateQueries({ queryKey: ['subscription'] });
    },
    onError: () => setError('We could not update your subscription. Please try again.'),
  });

  const plan = subscription.data;
  const canSubscribe = !plan || ['CANCELED', 'INCOMPLETE_EXPIRED', 'UNPAID'].includes(plan.status);
  const busy = checkout.isPending || portal.isPending || cancel.isPending;

  return (
    <Box sx={{ maxWidth: 900, mx: 'auto' }}>
      <Typography variant="h4" sx={{ fontWeight: 900 }}>Billing</Typography>
      <Typography color="text.secondary" sx={{ mt: 1, mb: 4 }}>
        Manage your TaskFlow plan and payment details securely through Stripe.
      </Typography>

      {error && <Alert severity="error" onClose={() => setError(null)} sx={{ mb: 3 }}>{error}</Alert>}
      {notice && <Alert severity="success" onClose={() => setNotice(null)} sx={{ mb: 3 }}>{notice}</Alert>}

      <Card variant="outlined" sx={{ borderRadius: 4 }}>
        <CardContent sx={{ p: { xs: 3, md: 4 } }}>
          {subscription.isLoading ? (
            <Box sx={{ py: 6, display: 'grid', placeItems: 'center' }}><CircularProgress /></Box>
          ) : subscription.isError ? (
            <Alert severity="error">We could not load your subscription.</Alert>
          ) : (
            <Stack spacing={3}>
              <Stack direction={{ xs: 'column', sm: 'row' }} sx={{ justifyContent: 'space-between', gap: 2 }}>
                <Box>
                  <Typography variant="overline" color="text.secondary">Current plan</Typography>
                  <Typography variant="h5" sx={{ fontWeight: 900 }}>{plan ? 'TaskFlow Pro' : 'Free'}</Typography>
                </Box>
                {plan ? <Chip label={formatStatus(plan.status)} color={plan.status === 'ACTIVE' ? 'success' : 'default'} sx={{ textTransform: 'capitalize' }} /> : null}
              </Stack>
              <Divider />
              {plan && plan.status === 'INCOMPLETE' ? <Alert severity="info">Stripe is still confirming your checkout. This page refreshes automatically.</Alert> : null}
              {plan && plan.status === 'PAST_DUE' ? <Alert severity="warning">Your latest payment needs attention. Open Stripe to update your payment method.</Alert> : null}
              {!canSubscribe && plan ? (
                <Stack spacing={1.5}>
                  <Typography><strong>Renewal:</strong> {plan.currentPeriodEnd ? new Intl.DateTimeFormat(undefined, { dateStyle: 'long' }).format(new Date(plan.currentPeriodEnd)) : 'Pending confirmation'}</Typography>
                  <Typography><strong>Cancel at period end:</strong> {plan.cancelAtPeriodEnd ? 'Yes' : 'No'}</Typography>
                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} sx={{ pt: 2 }}>
                    <Button variant="contained" disabled={busy} onClick={() => portal.mutate()}>Manage payment details</Button>
                    {!plan.cancelAtPeriodEnd && <Button color="error" disabled={busy} onClick={() => cancel.mutate()}>Cancel at period end</Button>}
                  </Stack>
                </Stack>
              ) : (
                <Box>
                  <Typography color="text.secondary" sx={{ mb: 2 }}>{plan ? 'Restart your Pro subscription securely with Stripe.' : 'Upgrade for full access to TaskFlow Pro.'}</Typography>
                  <Button variant="contained" disabled={busy} onClick={() => checkout.mutate()}>
                    {checkout.isPending ? 'Opening checkout…' : 'Subscribe'}
                  </Button>
                </Box>
              )}
            </Stack>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}
