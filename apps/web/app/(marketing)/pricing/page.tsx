import Link from 'next/link';
import { Box, Button, Card, Container, Grid, Stack, Typography } from '@mui/material';

const plans = [
  {
    name: 'Starter',
    price: '$0',
    description: 'For individuals and early-stage teams.',
    features: ['Up to 3 active projects', 'Task tracking', 'Basic dashboards'],
    highlighted: false,
    action: 'Start free',
    href: '/register',
  },
  {
    name: 'Pro',
    price: '$10',
    description: 'For growing teams that need consistency and visibility.',
    features: ['Unlimited projects', 'Advanced reporting', 'Team collaboration'],
    highlighted: true,
    action: 'Upgrade with Stripe',
    href: '/billing',
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    description: 'For organizations managing more complexity.',
    features: ['Custom workflows', 'Priority support', 'Admin controls'],
    highlighted: false,
    action: 'Contact sales',
    href: '/contact',
  },
];

export default function PricingPage() {
  return (
    <Container maxWidth="lg" sx={{ py: { xs: 8, md: 12 } }}>
      <Stack spacing={4} sx={{ textAlign: 'center', mb: 6 }}>
        <Typography variant="overline" sx={{ color: '#5b5cf6', fontWeight: 800, letterSpacing: '0.15em' }}>
          Pricing
        </Typography>
        <Typography variant="h2" sx={{ fontWeight: 900, letterSpacing: '-0.06em', color: '#0f172a' }}>
          Simple pricing for every stage.
        </Typography>
      </Stack>

      <Grid container spacing={3}>
        {plans.map((plan) => (
          <Grid key={plan.name} size={{ xs: 12, md: 4 }}>
            <Card sx={{ height: '100%', p: 3, borderRadius: 4, border: plan.highlighted ? '1px solid rgba(91,92,246,0.35)' : '1px solid rgba(148,163,184,0.18)', boxShadow: plan.highlighted ? '0 20px 45px rgba(91,92,246,0.15)' : 'none', background: plan.highlighted ? 'linear-gradient(180deg, rgba(255,255,255,0.98), rgba(239,246,255,0.95))' : 'white' }}>
              <Stack spacing={2}>
                <Typography variant="h6" sx={{ fontWeight: 800, color: '#0f172a' }}>{plan.name}</Typography>
                <Box>
                  <Typography variant="h3" sx={{ fontWeight: 900, letterSpacing: '-0.06em', color: '#0f172a' }}>{plan.price}{plan.price !== 'Custom' ? <Typography component="span" variant="body1" sx={{ color: '#475569' }}>/mo</Typography> : null}</Typography>
                </Box>
                <Typography sx={{ color: '#475569' }}>{plan.description}</Typography>
                <Stack spacing={1.5}>
                  {plan.features.map((feature) => (
                    <Typography key={feature} sx={{ color: '#334155' }}>• {feature}</Typography>
                  ))}
                </Stack>
                <Link href={plan.href} style={{ textDecoration: 'none' }}>
                  <Button fullWidth variant={plan.highlighted ? 'contained' : 'outlined'} sx={{ mt: 2, borderRadius: 999, py: 1.3, fontWeight: 800 }}>
                    {plan.action}
                  </Button>
                </Link>
              </Stack>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
