'use client';

import Link from 'next/link';
import { useState } from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Container,
  Grid,
  Stack,
  Typography,
} from '@mui/material';
import { Check, ExpandMore } from '@mui/icons-material';
import { CtaBanner, sectionY } from '@/components/marketing-sections';
import { color } from '@/theme/tokens';

const plans = [
  {
    name: 'Personal',
    monthly: 0,
    body: 'For individuals getting organized.',
    features: ['3 active projects', 'Task and calendar views', 'Basic dashboards', 'Community support'],
    cta: 'Start free',
    href: '/register',
  },
  {
    name: 'Business',
    monthly: 30,
    body: 'For growing teams that need visibility.',
    features: ['Unlimited projects', 'Team collaboration', 'Advanced reporting', 'Priority support'],
    cta: 'Choose Business',
    href: '/billing',
    featured: true,
  },
  {
    name: 'Team',
    monthly: 45,
    body: 'For organizations coordinating at scale.',
    features: ['Admin controls', 'Custom workflows', 'Dedicated support', 'Security reviews'],
    cta: 'Talk to us',
    href: '/contact',
  },
];

const rows = [
  ['Storage', '5 GB', '200 GB', 'Unlimited'],
  ['Members', '3', '25', 'Unlimited'],
  ['Project views', 'Board', 'All views', 'All views'],
  ['Automations', '—', '100 / month', 'Unlimited'],
  ['Support', 'Community', 'Priority', 'Dedicated'],
];

const faqs = [
  ['Which plan is right for my organization?', 'Start on Personal if you are working alone. Choose Business when you need unlimited projects and collaboration. Team is for companies that want admin controls, custom workflows, and a dedicated partner.'],
  ['Can I switch plans after subscribing?', 'Yes. Upgrade or downgrade at any time. Changes take effect on the next billing cycle, and unused time is prorated.'],
  ['Which payment methods do you accept?', 'Major credit and debit cards through Stripe. Invoicing is available on the Team plan.'],
  ['How can I cancel a paid subscription?', 'From Billing in your workspace, or by writing to us. You keep access through the end of the period you have already paid for.'],
  ['Do I need a credit card to start?', 'No. The Personal plan is free forever, with no card required.'],
];

export default function PricingPage() {
  const [annual, setAnnual] = useState(true);

  return (
    <>
      <Box sx={{ pt: { xs: 8, md: 12 }, pb: 6 }}>
        <Container maxWidth="lg">
          <Stack sx={{ textAlign: 'center', alignItems: 'center' }}>
            <Typography className="eyebrow">Pricing</Typography>
            <Typography variant="h1" sx={{ fontSize: { xs: '3rem', md: '4.6rem' }, mt: 1.5, maxWidth: 820 }}>
              Start free. Pay as the work grows.
            </Typography>
            <Typography sx={{ color: color.stone, fontSize: 20, maxWidth: 620, mt: 2 }}>
              Choose the plan that fits today. Upgrade, downgrade, or cancel whenever the shape of your team changes.
            </Typography>
            <Stack
              direction="row"
              sx={{
                mt: 4,
                p: 0.6,
                bgcolor: color.white,
                border: `1px solid ${color.line}`,
                borderRadius: 999,
              }}
            >
              <Button
                onClick={() => setAnnual(false)}
                variant={annual ? 'text' : 'contained'}
                sx={{ color: annual ? color.ink : color.white, minWidth: 140 }}
              >
                Monthly
              </Button>
              <Button
                onClick={() => setAnnual(true)}
                variant={annual ? 'contained' : 'text'}
                sx={{ color: annual ? color.white : color.ink, minWidth: 180 }}
              >
                Annual · save 20%
              </Button>
            </Stack>
          </Stack>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ pb: sectionY }}>
        <Grid container spacing={2} sx={{ alignItems: 'stretch' }}>
          {plans.map((plan) => {
            const price = plan.monthly === 0 ? 'Free' : `$${annual ? Math.round(plan.monthly * 0.8) : plan.monthly}`;
            return (
              <Grid key={plan.name} size={{ xs: 12, md: 4 }}>
                <Box
                  sx={{
                    height: '100%',
                    p: 3.5,
                    borderRadius: 4,
                    bgcolor: plan.featured ? color.forest : color.white,
                    color: plan.featured ? color.white : color.ink,
                    border: `1px solid ${plan.featured ? color.forest : color.line}`,
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  {plan.featured && (
                    <Box sx={{ display: 'inline-block', alignSelf: 'flex-start', bgcolor: color.chartreuse, color: color.ink, px: 1.4, py: 0.45, borderRadius: 999, fontSize: 11, fontWeight: 800, letterSpacing: '0.08em', mb: 2 }}>
                      MOST TEAMS
                    </Box>
                  )}
                  <Typography variant="h5" sx={{ color: 'inherit' }}>{plan.name}</Typography>
                  <Typography sx={{ fontSize: 48, fontWeight: 500, mt: 1.5, fontFamily: 'var(--font-display), Fraunces, serif' }}>
                    {price}
                    {plan.monthly !== 0 && (
                      <Typography component="span" sx={{ color: plan.featured ? 'rgba(255,253,248,0.65)' : color.stone, fontSize: 16, ml: 0.8 }}>
                        /month
                      </Typography>
                    )}
                  </Typography>
                  <Typography sx={{ color: plan.featured ? 'rgba(255,253,248,0.72)' : color.stone, mt: 1 }}>{plan.body}</Typography>
                  <Box sx={{ my: 3, borderTop: '1px solid', borderColor: plan.featured ? 'rgba(255,253,248,0.16)' : color.line }} />
                  <Stack spacing={1.4} sx={{ flex: 1 }}>
                    {plan.features.map((item) => (
                      <Stack key={item} direction="row" spacing={1}>
                        <Check sx={{ color: plan.featured ? color.chartreuse : color.moss }} />
                        <Typography>{item}</Typography>
                      </Stack>
                    ))}
                  </Stack>
                  <Button
                    component={Link}
                    href={plan.href}
                    fullWidth
                    variant={plan.featured ? 'contained' : 'outlined'}
                    sx={{
                      mt: 4,
                      bgcolor: plan.featured ? color.chartreuse : undefined,
                      color: plan.featured ? color.ink : undefined,
                      '&:hover': { bgcolor: plan.featured ? color.chartreuseHover : undefined },
                    }}
                  >
                    {plan.cta}
                  </Button>
                </Box>
              </Grid>
            );
          })}
        </Grid>
      </Container>

      <Box sx={{ bgcolor: color.cream, py: sectionY, borderBlock: `1px solid ${color.line}` }}>
        <Container maxWidth="lg">
          <Typography variant="h2" sx={{ textAlign: 'center', mb: 6 }}>Compare, side by side</Typography>
          <Box sx={{ overflowX: 'auto', border: `1px solid ${color.line}`, borderRadius: 3, bgcolor: color.white }}>
            <Box sx={{ minWidth: 720 }}>
              <Grid container sx={{ bgcolor: color.ink, color: color.white, p: 2 }}>
                {['Features', 'Personal', 'Business', 'Team'].map((x) => (
                  <Grid key={x} size={3}><Typography sx={{ fontWeight: 700 }}>{x}</Typography></Grid>
                ))}
              </Grid>
              {rows.map((row, rowIndex) => (
                <Grid container key={row[0]} sx={{ p: 2, bgcolor: rowIndex % 2 ? color.paper : color.white, borderTop: `1px solid ${color.line}` }}>
                  {row.map((cell, i) => (
                    <Grid key={`${row[0]}-${i}`} size={3}>
                      <Typography sx={{ fontWeight: i === 0 ? 700 : 500 }}>{cell}</Typography>
                    </Grid>
                  ))}
                </Grid>
              ))}
            </Box>
          </Box>
        </Container>
      </Box>

      <Box sx={{ py: sectionY }}>
        <Container maxWidth="md">
          <Typography variant="h2" sx={{ textAlign: 'center', mb: 5 }}>Frequently asked</Typography>
          {faqs.map(([q, a]) => (
            <Accordion key={q} disableGutters elevation={0} sx={{ borderBottom: `1px solid ${color.line}` }}>
              <AccordionSummary expandIcon={<ExpandMore />} sx={{ px: 0 }}>
                <Typography variant="h6">{q}</Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ px: 0, pb: 2.5 }}>
                <Typography sx={{ color: color.stone, lineHeight: 1.7 }}>{a}</Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Container>
      </Box>

      <CtaBanner />
    </>
  );
}
