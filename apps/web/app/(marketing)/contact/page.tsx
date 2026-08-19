'use client';

import { FormEvent, useState } from 'react';
import { Box, Button, Checkbox, Container, FormControlLabel, Grid, Stack, TextField, Typography } from '@mui/material';
import { EmailOutlined, LocationOnOutlined, PhoneOutlined } from '@mui/icons-material';
import { CtaBanner, sectionY } from '@/components/marketing-sections';
import { color } from '@/theme/tokens';

export default function ContactPage() {
  const [sent, setSent] = useState(false);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSent(true);
  };

  return (
    <>
      <Box sx={{ pt: { xs: 8, md: 12 }, pb: { xs: 8, md: 12 } }}>
        <Container maxWidth="lg">
          <Grid container spacing={7}>
            <Grid size={{ xs: 12, md: 5 }}>
              <Typography className="eyebrow">Contact</Typography>
              <Typography variant="h1" sx={{ fontSize: { xs: '3rem', md: '4.4rem' }, mt: 1.5 }}>
                Tell us what you are trying to ship.
              </Typography>
              <Typography sx={{ color: color.stone, fontSize: 20, lineHeight: 1.65, mt: 2.5 }}>
                Sales, partnerships, or a question about the product — we read every note and reply as soon as we can.
              </Typography>
              <Stack spacing={2.5} sx={{ mt: 5 }}>
                {[
                  [<PhoneOutlined key="p" />, '+1 415 555 0137'],
                  [<EmailOutlined key="e" />, 'hello@taskflow.app'],
                  [<LocationOnOutlined key="l" />, '2 Park Avenue, New York'],
                ].map(([icon, text]) => (
                  <Stack key={String(text)} direction="row" spacing={2} sx={{ alignItems: 'center' }}>
                    <Box sx={{ width: 48, height: 48, borderRadius: '50%', bgcolor: color.white, border: `1px solid ${color.line}`, color: color.forest, display: 'grid', placeItems: 'center' }}>
                      {icon}
                    </Box>
                    <Typography sx={{ fontWeight: 600 }}>{text}</Typography>
                  </Stack>
                ))}
              </Stack>
            </Grid>
            <Grid size={{ xs: 12, md: 7 }}>
              <Box sx={{ bgcolor: color.white, border: `1px solid ${color.line}`, borderRadius: 4, p: { xs: 3, md: 5 } }}>
                {sent ? (
                  <Stack spacing={2} sx={{ minHeight: 280, justifyContent: 'center' }}>
                    <Typography variant="h4">Received. Thank you.</Typography>
                    <Typography sx={{ color: color.stone, fontSize: 18 }}>
                      We will get back to you at the email you provided. If it is urgent, write us directly at hello@taskflow.app.
                    </Typography>
                  </Stack>
                ) : (
                  <>
                    <Typography variant="h4">How can we help?</Typography>
                    <Stack component="form" spacing={2.2} sx={{ mt: 3 }} onSubmit={onSubmit}>
                      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                        <TextField label="First name" name="firstName" autoComplete="given-name" required fullWidth />
                        <TextField label="Last name" name="lastName" autoComplete="family-name" required fullWidth />
                      </Stack>
                      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                        <TextField label="Email address" name="email" type="email" autoComplete="email" required fullWidth />
                        <TextField label="Phone number" name="phone" type="tel" autoComplete="tel" fullWidth />
                      </Stack>
                      <TextField label="Your message" name="message" required multiline minRows={5} />
                      <FormControlLabel
                        control={<Checkbox required />}
                        label="I agree to the Terms of Use and Privacy Policy"
                      />
                      <Button type="submit" variant="contained" size="large" sx={{ alignSelf: 'flex-start', px: 4 }}>
                        Send message
                      </Button>
                    </Stack>
                  </>
                )}
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Box sx={{ py: sectionY, bgcolor: color.cream, borderBlock: `1px solid ${color.line}` }}>
        <Container maxWidth="lg">
          <Typography variant="h2">Studios</Typography>
          <Typography sx={{ color: color.stone, fontSize: 18, mt: 1.5, mb: 5 }}>Two rooms. Same standard.</Typography>
          <Grid container spacing={2}>
            {[
              ['New York', '2 Park Avenue, 15th Floor, New York, NY 10016'],
              ['San Francisco', '655 Montgomery Street, San Francisco, CA 94111'],
            ].map(([city, address], i) => (
              <Grid key={city} size={{ xs: 12, md: 6 }}>
                <Box
                  sx={{
                    bgcolor: i ? color.forest : color.white,
                    color: i ? color.white : color.ink,
                    border: `1px solid ${color.line}`,
                    borderRadius: 4,
                    p: { xs: 3, md: 5 },
                    minHeight: 280,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                  }}
                >
                  <LocationOnOutlined sx={{ fontSize: 36, color: i ? color.chartreuse : color.moss }} />
                  <Typography variant="h3" sx={{ mt: 2, color: 'inherit' }}>{city}</Typography>
                  <Typography sx={{ color: i ? 'rgba(255,253,248,0.7)' : color.stone, mt: 1 }}>{address}</Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      <CtaBanner />
    </>
  );
}
