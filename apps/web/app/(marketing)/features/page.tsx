import { Box, Card, Container, Grid, Stack, Typography } from '@mui/material';

import { CheckCircleOutlined, DashboardCustomize, Group, Insights } from '@mui/icons-material';

const items = [
  {
    title: 'Project planning',
    text: 'Organize priorities, milestones, and daily execution with a single view designed for clarity.',
    icon: <DashboardCustomize sx={{ fontSize: 28 }} />,
  },
  {
    title: 'Team collaboration',
    text: 'Assign work, align ownership, and keep everyone informed without endless updates.',
    icon: <Group sx={{ fontSize: 28 }} />,
  },
  {
    title: 'Reporting & insight',
    text: 'Turn progress data into decisions with dashboards that surface what matters most.',
    icon: <Insights sx={{ fontSize: 28 }} />,
  },
];

export default function FeaturesPage() {
  return (
    <Container maxWidth="lg" sx={{ py: { xs: 8, md: 12 } }}>
      <Stack spacing={4} sx={{ textAlign: 'center', mb: 6 }}>
        <Typography variant="overline" sx={{ color: '#5b5cf6', fontWeight: 800, letterSpacing: '0.15em' }}>
          Features
        </Typography>
        <Typography variant="h2" sx={{ fontWeight: 900, letterSpacing: '-0.06em', color: '#0f172a' }}>
          Built to keep every project in motion.
        </Typography>
        <Typography sx={{ maxWidth: 760, mx: 'auto', color: '#475569', fontSize: '1.05rem' }}>
          TaskFlow brings planning, tracking, and communication together in one workflow experience that helps teams move faster.
        </Typography>
      </Stack>

      <Grid container spacing={3}>
        {items.map((item) => (
          <Grid key={item.title} size={{ xs: 12, md: 4 }}>
            <Card sx={{ height: '100%', p: 3, borderRadius: 4 }}>
              <Box sx={{ width: 56, height: 56, display: 'grid', placeItems: 'center', borderRadius: 3, mb: 3, background: 'linear-gradient(135deg, rgba(91,92,246,0.12), rgba(56,189,248,0.16))', color: '#4f46e5' }}>
                {item.icon}
              </Box>
              <Typography variant="h5" sx={{ fontWeight: 800, mb: 1 }}>{item.title}</Typography>
              <Typography sx={{ color: '#475569', lineHeight: 1.7 }}>{item.text}</Typography>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Card sx={{ mt: 6, borderRadius: 4, p: 4 }}>
        <Stack spacing={2}>
          <Typography variant="h4" sx={{ fontWeight: 900, letterSpacing: '-0.05em', color: '#0f172a' }}>
            Why it works
          </Typography>
          {[
            'A single source of truth for priorities and tasks',
            'Clear ownership and accountability across teams',
            'Fewer manual updates and less context switching',
          ].map((line) => (
            <Stack key={line} direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
              <CheckCircleOutlined sx={{ color: '#22c55e' }} />
              <Typography sx={{ color: '#334155' }}>{line}</Typography>
            </Stack>
          ))}
        </Stack>
      </Card>
    </Container>
  );
}
