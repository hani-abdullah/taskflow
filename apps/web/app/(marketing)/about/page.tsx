'use client';

import { Box, Container, Grid, Stack, Typography } from '@mui/material';
import { CtaBanner, PageHero, sectionY } from '@/components/marketing-sections';
import { color } from '@/theme/tokens';

const values = [
  ['Build together, ship together', 'The work is a shared object. Status is a byproduct, not a performance.'],
  ['Time well spent', 'We refuse features that create more administration than they remove.'],
  ['Quietly powerful', 'The best software disappears once the team is in motion.'],
  ['Craft over theatre', 'Visual clarity, honest copy, and restraint — because attention is the product.'],
];

const team = [
  ['AM', 'Avery Morgan', 'CEO & co-founder'],
  ['KC', 'Kai Chen', 'Chief operating officer'],
  ['WW', 'Wade Williams', 'Chief product officer'],
  ['SG', 'Sam Green', 'Engineering director'],
  ['CF', 'Casey Fisher', 'Brand director'],
  ['JW', 'Jordan Wilson', 'Product designer'],
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Taskflow"
        title="We make room for the actual work."
        body="Taskflow is a considered workspace for teams who are tired of reconstructing progress from chat threads. We design for clarity, ownership, and a calmer week."
        art={false}
      />

      <Container maxWidth="lg" sx={{ pb: { xs: 6, md: 10 } }}>
        <Box
          sx={{
            borderRadius: 5,
            overflow: 'hidden',
            minHeight: { xs: 240, md: 380 },
            bgcolor: color.forest,
            color: color.white,
            p: { xs: 4, md: 8 },
            display: 'flex',
            alignItems: 'flex-end',
            position: 'relative',
          }}
        >
          <Box sx={{ position: 'absolute', width: 320, height: 320, borderRadius: '50%', bgcolor: color.chartreuse, opacity: 0.18, right: -60, top: -80 }} />
          <Typography variant="h2" sx={{ color: color.white, maxWidth: 720, fontSize: { xs: '2.2rem', md: '3.4rem' }, position: 'relative' }}>
            Work feels better when everyone can see it.
          </Typography>
        </Box>
      </Container>

      <Box sx={{ py: sectionY }}>
        <Container maxWidth="lg">
          <Grid container spacing={8}>
            <Grid size={{ xs: 12, md: 5 }}>
              <Typography className="eyebrow">The studio</Typography>
              <Typography variant="h2" sx={{ mt: 1.5 }}>A product we wanted to use ourselves</Typography>
            </Grid>
            <Grid size={{ xs: 12, md: 7 }}>
              <Typography sx={{ color: color.stone, fontSize: 20, lineHeight: 1.75 }}>
                Taskflow began as a refusal: no more status meetings that exist because the tools cannot tell the story. We built a workspace with fewer surfaces, stronger defaults, and a visual language that stays calm when the week is not.
              </Typography>
              <Grid container spacing={3} sx={{ mt: 4 }}>
                {[
                  ['One picture', 'Projects, people, and due dates in a single system of record.'],
                  ['Minutes, not months', 'Value on the first afternoon — not after a rollout program.'],
                  ['Human scale', 'Designed for the teams who actually do the work, not the slide deck about them.'],
                ].map(([n, l]) => (
                  <Grid key={n} size={{ xs: 12, sm: 4 }}>
                    <Typography variant="h5">{n}</Typography>
                    <Typography sx={{ color: color.stone, mt: 1 }}>{l}</Typography>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Box sx={{ bgcolor: color.ink, color: color.white, py: sectionY }}>
        <Container maxWidth="lg">
          <Typography variant="h2" sx={{ color: color.white, mb: 6 }}>What we optimize for</Typography>
          <Grid container spacing={4}>
            {[
              ['Clarity', 'If a visitor cannot tell who owns the next step, we have failed.'],
              ['Restraint', 'Every feature must earn its place against a quieter week.'],
              ['Craft', 'Type, space, and interaction are part of the product — not decoration.'],
              ['Trust', 'Honest copy. No dark patterns. Plans you can leave.'],
            ].map(([n, l]) => (
              <Grid key={n} size={{ xs: 12, sm: 6, md: 3 }}>
                <Typography sx={{ fontFamily: 'var(--font-display), Fraunces, serif', fontSize: 32, color: color.chartreuse }}>{n}</Typography>
                <Typography sx={{ color: 'rgba(255,253,248,0.7)', mt: 1.5, lineHeight: 1.65 }}>{l}</Typography>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      <Box sx={{ py: sectionY, bgcolor: color.cream, borderBlock: `1px solid ${color.line}` }}>
        <Container maxWidth="lg">
          <Grid container spacing={6}>
            <Grid size={{ xs: 12, md: 5 }}>
              <Typography variant="h2">How we work</Typography>
              <Typography sx={{ color: color.stone, fontSize: 18, lineHeight: 1.7, mt: 2 }}>
                These are not posters. They are the constraints we use when a new idea arrives.
              </Typography>
            </Grid>
            <Grid size={{ xs: 12, md: 7 }}>
              {values.map(([title, body], i) => (
                <Stack key={title} direction="row" spacing={3} sx={{ alignItems: 'flex-start', py: 2.8, borderTop: `1px solid ${color.line}` }}>
                  <Typography sx={{ fontFamily: 'var(--font-display), Fraunces, serif', fontSize: 28, color: color.moss, minWidth: 36 }}>
                    0{i + 1}
                  </Typography>
                  <Box>
                    <Typography variant="h5">{title}</Typography>
                    <Typography sx={{ color: color.stone, mt: 0.8 }}>{body}</Typography>
                  </Box>
                </Stack>
              ))}
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Box sx={{ py: sectionY }}>
        <Container maxWidth="lg">
          <Typography variant="h2" sx={{ mb: 6 }}>The people behind it</Typography>
          <Grid container spacing={2}>
            {team.map(([initial, name, role], i) => (
              <Grid key={name} size={{ xs: 12, sm: 6, md: 4 }}>
                <Box sx={{ bgcolor: color.white, border: `1px solid ${color.line}`, borderRadius: 3, p: 2, height: '100%' }}>
                  <Box
                    sx={{
                      height: 200,
                      bgcolor: i % 2 ? color.forest : color.paper,
                      color: i % 2 ? color.chartreuse : color.ink,
                      borderRadius: 2,
                      display: 'grid',
                      placeItems: 'center',
                      fontFamily: 'var(--font-display), Fraunces, serif',
                      fontSize: 56,
                    }}
                  >
                    {initial}
                  </Box>
                  <Typography variant="h5" sx={{ mt: 2 }}>{name}</Typography>
                  <Typography sx={{ color: color.stone }}>{role}</Typography>
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
