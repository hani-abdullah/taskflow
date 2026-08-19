'use client';

import Link from 'next/link';
import { Box, Button, Container, Grid, Stack, Typography } from '@mui/material';
import { ArrowForward, CheckCircle } from '@mui/icons-material';
import { CtaBanner, FeatureGrid, Integrations, PageHero, ProductBoard, Steps, sectionY } from '@/components/marketing-sections';
import { color } from '@/theme/tokens';

export default function FeaturesPage() {
  return (
    <>
      <PageHero
        eyebrow="The product"
        title="A clearer way to run the work."
        body="Give every team a focused system for planning projects, assigning ownership, and keeping momentum visible — without adding another noisy tool."
        action="Start free"
      />

      <Box sx={{ pb: { xs: 6, md: 8 } }}>
        <Container maxWidth="lg">
          <ProductBoard />
        </Container>
      </Box>

      <Box sx={{ bgcolor: color.cream, py: sectionY, borderBlock: `1px solid ${color.line}` }}>
        <Container maxWidth="lg">
          <Grid container spacing={7} sx={{ alignItems: 'center' }}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography className="eyebrow">Projects</Typography>
              <Typography variant="h2" sx={{ mt: 1.5 }}>Connect every plan to execution</Typography>
              <Typography sx={{ color: color.stone, fontSize: 18, lineHeight: 1.7, mt: 2 }}>
                Bring context, ownership, and customer priorities together. The project is the room. The tasks are the work inside it.
              </Typography>
              <Stack spacing={1.6} sx={{ mt: 3 }}>
                {['A complete picture of each initiative', 'Assign work without losing the why', 'Progress that updates from the work itself'].map((x) => (
                  <Stack key={x} direction="row" spacing={1.2} sx={{ alignItems: 'center' }}>
                    <CheckCircle sx={{ color: color.moss, fontSize: 22 }} />
                    <Typography sx={{ fontWeight: 600 }}>{x}</Typography>
                  </Stack>
                ))}
              </Stack>
              <Button component={Link} href="/register" variant="contained" endIcon={<ArrowForward />} sx={{ mt: 4 }}>
                Create a workspace
              </Button>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Box sx={{ bgcolor: color.white, border: `1px solid ${color.line}`, borderRadius: 4, p: { xs: 3, md: 4 } }}>
                <Typography variant="h5">Everything in one view</Typography>
                <Typography sx={{ color: color.stone, mt: 1.2 }}>Projects stay organized. Every teammate still gets a personal list.</Typography>
                <Box sx={{ mt: 3 }}>
                  {['Plan the launch timeline', 'Review campaign assets', 'Publish release notes'].map((x, i) => (
                    <Stack key={x} direction="row" spacing={1.2} sx={{ p: 1.5, borderTop: `1px solid ${color.line}` }}>
                      <CheckCircle sx={{ color: i === 0 ? color.moss : color.line }} />
                      <Typography sx={{ fontWeight: i === 0 ? 700 : 500 }}>{x}</Typography>
                    </Stack>
                  ))}
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Box sx={{ bgcolor: color.ink, color: color.white, py: sectionY }}>
        <Container maxWidth="lg">
          <Grid container spacing={7}>
            <Grid size={{ xs: 12, md: 5 }}>
              <Typography variant="h2" sx={{ color: color.white }}>Time, treated with respect</Typography>
            </Grid>
            <Grid size={{ xs: 12, md: 7 }}>
              <Typography variant="h4" sx={{ color: color.chartreuse, fontFamily: 'var(--font-display), Fraunces, serif' }}>
                Understand workload without another meeting.
              </Typography>
              <Typography sx={{ color: 'rgba(255,253,248,0.7)', fontSize: 18, lineHeight: 1.7, mt: 2 }}>
                See how the week is shaping up. Balance priorities across remote, in-person, and hybrid teams. Adjust dates as reality changes — the calendar stays honest.
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <FeatureGrid />

      <Box sx={{ bgcolor: color.white, py: sectionY, borderBlock: `1px solid ${color.line}` }}>
        <Container maxWidth="lg">
          <Grid container spacing={6} sx={{ alignItems: 'center' }}>
            <Grid size={{ xs: 12, md: 5 }}>
              <Typography variant="h2">Calendar that matches the work</Typography>
              <Typography sx={{ color: color.stone, fontSize: 18, lineHeight: 1.7, mt: 2 }}>
                See how the month is forming. Drag priorities, protect focus time, and keep launch dates from becoming folklore.
              </Typography>
            </Grid>
            <Grid size={{ xs: 12, md: 7 }}>
              <Box sx={{ bgcolor: color.forest, borderRadius: 4, p: 2.5, color: color.white }}>
                <Grid container columns={7}>
                  {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => (
                    <Grid key={`${d}${i}`} size={1}>
                      <Typography sx={{ textAlign: 'center', p: 1, color: 'rgba(255,253,248,0.55)', fontSize: 12 }}>{d}</Typography>
                    </Grid>
                  ))}
                  {Array.from({ length: 28 }, (_, i) => (
                    <Grid key={i} size={1}>
                      <Box
                        sx={{
                          height: { xs: 42, md: 52 },
                          border: '1px solid rgba(255,253,248,0.1)',
                          p: 0.6,
                          fontSize: 11,
                          bgcolor: [8, 14, 19].includes(i) ? color.chartreuse : 'transparent',
                          color: [8, 14, 19].includes(i) ? color.ink : color.white,
                          fontWeight: [8, 14, 19].includes(i) ? 700 : 400,
                        }}
                      >
                        {i + 1}
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Steps />
      <Integrations />
      <CtaBanner />
    </>
  );
}
