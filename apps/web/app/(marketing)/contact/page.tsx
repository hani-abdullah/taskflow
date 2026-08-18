import { Button, Card, Container, Stack, TextField, Typography } from '@mui/material';

export default function ContactPage() {
  return (
    <Container maxWidth="md" sx={{ py: { xs: 8, md: 12 } }}>
      <Card sx={{ p: { xs: 3, md: 5 }, borderRadius: 4 }}>
        <Stack spacing={3}>
          <Typography variant="overline" sx={{ color: '#5b5cf6', fontWeight: 800, letterSpacing: '0.15em' }}>
            Contact
          </Typography>
          <Typography variant="h2" sx={{ fontWeight: 900, letterSpacing: '-0.06em', color: '#0f172a' }}>
            Let’s build better workflows together.
          </Typography>

          <Stack component="form" spacing={2}>
            <TextField label="Name" fullWidth />
            <TextField label="Email" type="email" fullWidth />
            <TextField label="Message" multiline minRows={5} fullWidth />
            <Button variant="contained" size="large" sx={{ mt: 1, borderRadius: 999, py: 1.4, fontWeight: 800 }}>
              Send message
            </Button>
          </Stack>
        </Stack>
      </Card>
    </Container>
  );
}
