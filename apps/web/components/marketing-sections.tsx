'use client';

import Link from 'next/link';
import { Box, Button, Container, Grid, Stack, Typography } from '@mui/material';
import {
  ArrowForward,
  CalendarMonth,
  Check,
  Dashboard,
  Groups,
  Insights,
  TaskAlt,
} from '@mui/icons-material';
import { color, shadow } from '@/theme/tokens';
import { Reveal } from './reveal';

export const sectionY = { xs: 10, md: 16 } as const;

export function PageHero({
  eyebrow,
  title,
  body,
  action = 'Start for free',
}: {
  eyebrow?: string;
  title: string;
  body: string;
  action?: string;
  art?: boolean;
}) {
  return (
    <Box sx={{ pt: { xs: 8, md: 12 }, pb: { xs: 8, md: 10 } }}>
      <Container maxWidth="lg">
        <Stack spacing={2.5} sx={{ maxWidth: 820 }}>
          {eyebrow && <Typography className="eyebrow">{eyebrow}</Typography>}
          <Typography variant="h1" sx={{ fontSize: { xs: '3rem', sm: '4rem', md: '5rem' } }}>
            {title}
          </Typography>
          <Typography sx={{ color: color.stone, fontSize: { xs: 18, md: 21 }, lineHeight: 1.65, maxWidth: 640 }}>
            {body}
          </Typography>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} sx={{ pt: 1 }}>
            <Button component={Link} href="/register" variant="contained" size="large" endIcon={<ArrowForward />}>
              {action}
            </Button>
            <Button component={Link} href="/pricing" size="large" sx={{ color: color.ink }}>
              See pricing
            </Button>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}

export function ProductBoard() {
  const columns = [
    {
      name: 'Today',
      cards: [
        { title: 'Finalize campaign brief', meta: 'Olivia · 11:00', tone: color.chartreuse },
        { title: 'Review product screens', meta: 'Noah · 14:30', tone: color.terracotta },
      ],
    },
    {
      name: 'This week',
      cards: [
        { title: 'Prepare launch report', meta: 'Emma · Fri', tone: color.sage },
        { title: 'Customer interviews', meta: 'Maya · Thu', tone: color.forest },
      ],
    },
  ];

  return (
    <Box className="product-frame" sx={{ p: { xs: 1.5, md: 2 } }}>
      <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center', px: 1.5, py: 1.5 }}>
        <Box>
          <Typography sx={{ color: color.muted, fontSize: 11, fontWeight: 700, letterSpacing: '0.14em' }}>
            WORKSPACE
          </Typography>
          <Typography sx={{ fontWeight: 700, fontSize: 18, letterSpacing: '-0.03em' }}>Product launch</Typography>
        </Box>
        <Box sx={{ bgcolor: color.forest, color: color.chartreuse, px: 1.4, py: 0.6, borderRadius: 999, fontSize: 12, fontWeight: 700 }}>
          78% complete
        </Box>
      </Stack>
      <Grid container spacing={1.5}>
        {columns.map((col) => (
          <Grid key={col.name} size={{ xs: 12, sm: 6 }}>
            <Box sx={{ bgcolor: color.paper, borderRadius: 3, p: 1.4, minHeight: 210 }}>
              <Typography sx={{ fontWeight: 700, fontSize: 13, mb: 1.2, color: color.stone }}>{col.name}</Typography>
              {col.cards.map((card) => (
                <Box key={card.title} sx={{ bgcolor: color.white, border: `1px solid ${color.line}`, p: 1.4, mb: 1, borderRadius: 2 }}>
                  <Stack direction="row" spacing={1.1} sx={{ alignItems: 'flex-start' }}>
                    <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: card.tone, mt: 0.7, flexShrink: 0 }} />
                    <Box>
                      <Typography sx={{ fontWeight: 600, fontSize: 13.5 }}>{card.title}</Typography>
                      <Typography sx={{ color: color.stone, fontSize: 12, mt: 0.4 }}>{card.meta}</Typography>
                    </Box>
                  </Stack>
                </Box>
              ))}
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export function LogoStrip() {
  const names = ['Northstar', 'Vertex', 'Capsule', 'Horizon', 'Outline', 'Lumen'];
  return (
    <Box sx={{ borderBlock: `1px solid ${color.line}`, py: 3.5, bgcolor: color.cream }}>
      <Typography sx={{ textAlign: 'center', fontSize: 12, fontWeight: 700, letterSpacing: '0.16em', color: color.stone, mb: 2.5 }}>
        BUILT FOR TEAMS WHO MOVE WITH INTENTION
      </Typography>
      <Box className="marquee" aria-hidden>
        <Box className="marquee-track">
          {[...names, ...names].map((name, i) => (
            <Typography key={`${name}-${i}`} sx={{ fontFamily: 'var(--font-display), Fraunces, serif', fontSize: 28, color: color.moss, letterSpacing: '-0.03em' }}>
              {name}
            </Typography>
          ))}
        </Box>
      </Box>
    </Box>
  );
}

export const productFeatures = [
  { icon: <Dashboard fontSize="small" />, title: 'One view of every project', body: 'See priorities, owners, and progress across the work that actually matters — without switching tools.' },
  { icon: <CalendarMonth fontSize="small" />, title: 'Plans that stay honest', body: 'Move between the week and the quarter. Deadlines stay visible as priorities change.' },
  { icon: <Groups fontSize="small" />, title: 'Ownership, not noise', body: 'Every task has a person, a date, and enough context to act — so follow-ups become rare.' },
  { icon: <Insights fontSize="small" />, title: 'Progress you can trust', body: 'Understand delivery health at a glance and make decisions from the work itself.' },
  { icon: <TaskAlt fontSize="small" />, title: 'Room for all the work', body: 'Capture every action without artificial limits. Organize it around the way your team already thinks.' },
  { icon: <Check fontSize="small" />, title: 'A focused personal list', body: 'Each person gets a calm view of today, upcoming work, and what can wait.' },
];

export function FeatureGrid({ title = 'Everything required. Nothing extra.' }: { title?: string }) {
  return (
    <Box sx={{ py: sectionY }}>
      <Container maxWidth="lg">
        <Reveal>
          <Typography variant="h2" sx={{ textAlign: 'center', maxWidth: 720, mx: 'auto', mb: 1.5, fontSize: { xs: '2.4rem', md: '3.25rem' } }}>
            {title}
          </Typography>
          <Typography sx={{ textAlign: 'center', color: color.stone, maxWidth: 560, mx: 'auto', mb: 7, fontSize: 18 }}>
            A considered set of tools for planning, collaborating, and finishing — designed to stay out of the way.
          </Typography>
        </Reveal>
        <Grid container spacing={2}>
          {productFeatures.map((item, i) => (
            <Grid key={item.title} size={{ xs: 12, sm: 6, md: 4 }}>
              <Reveal delay={i * 60}>
                <Box className="feature-card">
                  <Box sx={{ width: 42, height: 42, borderRadius: 2, bgcolor: color.forest, color: color.chartreuse, display: 'grid', placeItems: 'center' }}>
                    {item.icon}
                  </Box>
                  <Box>
                    <Typography variant="h5" sx={{ mb: 1.2 }}>{item.title}</Typography>
                    <Typography sx={{ color: color.stone, lineHeight: 1.7 }}>{item.body}</Typography>
                  </Box>
                </Box>
              </Reveal>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

export function Steps() {
  const steps = [
    ['01', 'Create a workspace', 'Start free in a few minutes. Bring a project, not a training course.'],
    ['02', 'Invite the people who matter', 'Ownership becomes obvious the moment teammates join the work.'],
    ['03', 'Move the work forward', 'Plan, assign, and finish from one quiet view of what is next.'],
  ];

  return (
    <Box sx={{ bgcolor: color.cream, py: sectionY, borderBlock: `1px solid ${color.line}` }}>
      <Container maxWidth="lg">
        <Typography variant="h2" sx={{ textAlign: 'center', mb: 1.5, fontSize: { xs: '2.4rem', md: '3.25rem' } }}>
          Up and running, not onboarding forever
        </Typography>
        <Typography sx={{ textAlign: 'center', color: color.stone, mb: 7, fontSize: 18 }}>
          Three steps. No ceremony.
        </Typography>
        <Grid container spacing={2}>
          {steps.map(([n, title, body], i) => (
            <Grid key={n} size={{ xs: 12, md: 4 }}>
              <Box sx={{ p: { xs: 2, md: 3 }, height: '100%', borderTop: `2px solid ${i === 1 ? color.chartreuse : color.forest}` }}>
                <Typography sx={{ fontFamily: 'var(--font-display), Fraunces, serif', fontSize: 42, color: color.moss }}>{n}</Typography>
                <Typography variant="h5" sx={{ mt: 2 }}>{title}</Typography>
                <Typography sx={{ color: color.stone, mt: 1.5, lineHeight: 1.7 }}>{body}</Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

export function Integrations() {
  const tools = ['Slack', 'Figma', 'GitHub', 'Notion', 'Linear', 'Google Calendar', 'Zapier'];
  return (
    <Box sx={{ py: sectionY }}>
      <Container maxWidth="lg">
        <Typography variant="h3" sx={{ textAlign: 'center', fontSize: { xs: '2rem', md: '2.6rem' } }}>
          Lives beside the tools you already trust
        </Typography>
        <Typography sx={{ textAlign: 'center', color: color.stone, mt: 1.5, mb: 5, fontSize: 18 }}>
          Taskflow is the system of record for work — not another tab to babysit.
        </Typography>
        <Stack direction="row" spacing={1.5} useFlexGap sx={{ flexWrap: 'wrap', justifyContent: 'center' }}>
          {tools.map((name) => (
            <Box
              key={name}
              sx={{
                px: 2.4,
                py: 1.4,
                bgcolor: color.white,
                border: `1px solid ${color.line}`,
                borderRadius: 999,
                fontWeight: 600,
                color: color.ink,
              }}
            >
              {name}
            </Box>
          ))}
        </Stack>
      </Container>
    </Box>
  );
}

export function CtaBanner() {
  return (
    <Container maxWidth="lg" sx={{ py: { xs: 8, md: 12 } }}>
      <Box
        sx={{
          bgcolor: color.forest,
          color: color.white,
          borderRadius: 5,
          p: { xs: 4, md: 8 },
          position: 'relative',
          overflow: 'hidden',
          boxShadow: shadow.glow,
        }}
      >
        <Box sx={{ position: 'absolute', width: 280, height: 280, borderRadius: '50%', bgcolor: color.chartreuse, opacity: 0.16, right: -80, top: -90 }} />
        <Grid container spacing={4} sx={{ alignItems: 'center', position: 'relative' }}>
          <Grid size={{ xs: 12, md: 8 }}>
            <Typography className="eyebrow" sx={{ color: `${color.chartreuse} !important` }}>Ready when you are</Typography>
            <Typography variant="h2" sx={{ color: color.white, fontSize: { xs: '2.5rem', md: '3.4rem' }, mt: 1.5, maxWidth: 640 }}>
              Make space for the work that matters.
            </Typography>
            <Typography sx={{ mt: 2, color: 'rgba(255,253,248,0.78)', fontSize: 18, maxWidth: 520 }}>
              Start free today. Invite your team when the first project is already moving.
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Stack spacing={1.5} sx={{ alignItems: { md: 'flex-end' } }}>
              <Button
                component={Link}
                href="/register"
                variant="contained"
                size="large"
                endIcon={<ArrowForward />}
                sx={{ bgcolor: color.chartreuse, color: color.ink, '&:hover': { bgcolor: color.chartreuseHover } }}
              >
                Start building for free
              </Button>
              <Typography sx={{ color: 'rgba(255,253,248,0.6)', fontSize: 13 }}>No credit card. Setup in minutes.</Typography>
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
