import { Box, Card, Container, Grid, Stack, Typography } from '@mui/material';

const values = [
  { title: 'Clarity', text: 'Design every workflow around real momentum, not noise.' },
  { title: 'Focus', text: 'Keep the team aligned on the work that matters most.' },
  { title: 'Momentum', text: 'Turn plans into visible progress every single day.' },
];

export default function AboutPage() {
  return (
    <Container maxWidth="lg" sx={{ py: { xs: 8, md: 12 } }}>
      <Stack spacing={4} sx={{ textAlign: 'center', mb: 6 }}>
        <Typography variant="overline" sx={{ color: '#5b5cf6', fontWeight: 800, letterSpacing: '0.15em' }}>
          About
        </Typography>
        <Typography variant="h2" sx={{ fontWeight: 900, letterSpacing: '-0.06em', color: '#0f172a' }}>
          We help teams move from busy work to meaningful progress.
        </Typography>
      </Stack>

      <Grid container spacing={3}>
        {values.map((value) => (
          <Grid key={value.title} size={{ xs: 12, md: 4 }}>
            <Card sx={{ height: '100%', p: 3, borderRadius: 4 }}>
              <Typography variant="h5" sx={{ fontWeight: 800, mb: 1 }}>{value.title}</Typography>
              <Typography sx={{ color: '#475569', lineHeight: 1.7 }}>{value.text}</Typography>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ mt: 6, p: { xs: 3, md: 5 }, borderRadius: 4, background: 'linear-gradient(135deg, rgba(91,92,246,0.08), rgba(56,189,248,0.12))' }}>
        <Typography sx={{ fontSize: '1.1rem', color: '#334155', lineHeight: 1.8 }}>
          TaskFlow was designed for teams that want less chaos and more clarity. We believe better workflows create calmer workdays, stronger alignment, and healthier execution.
        </Typography>
      </Box>
    </Container>
  );
}
