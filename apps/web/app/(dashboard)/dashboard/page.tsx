'use client';

import Link from 'next/link';
import { Avatar, AvatarGroup, Box, Button, Chip, Grid, LinearProgress, Stack, Typography } from '@mui/material';
import { ArrowForward, CheckCircle, MoreHoriz, TrendingUp } from '@mui/icons-material';
import { useAuthStore } from '@/stores/auth.store';
import { color } from '@/theme/tokens';

const tasks = [
  ['Finalize launch copy', 'Website launch', 'Today', color.chartreuse],
  ['Review onboarding flow', 'Product sprint', 'Tomorrow', color.sage],
  ['Share research summary', 'User research', 'Fri', color.terracotta],
];

export default function DashboardPage() {
  const user = useAuthStore((s) => s.user);

  return (
    <Stack spacing={3.5} sx={{ maxWidth: 1240, mx: 'auto' }}>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ justifyContent: 'space-between', alignItems: { sm: 'end' } }}>
        <Box>
          <Typography sx={{ color: color.stone, fontWeight: 600 }}>Tuesday, August 18</Typography>
          <Typography variant="h3" sx={{ mt: 0.5, fontSize: { xs: '2.25rem', md: '3rem' } }}>
            Good afternoon{user ? `, ${user.firstName}` : ''}.
          </Typography>
          <Typography sx={{ color: color.stone, mt: 1 }}>Here is where your team is making progress today.</Typography>
        </Box>
        <Button component={Link} href="/projects" endIcon={<ArrowForward />}>View all projects</Button>
      </Stack>
      <Grid container spacing={2}>
        {[
          ['Tasks completed', '24', '+18%', color.chartreuse],
          ['Active projects', '6', '2 due soon', color.sage],
          ['Team focus', '87%', 'Strong week', color.terracotta],
        ].map(([label, value, note, tone]) => (
          <Grid key={label} size={{ xs: 12, sm: 4 }}>
            <Box sx={{ bgcolor: color.white, border: `1px solid ${color.line}`, borderRadius: 3, p: 2.5 }}>
              <Stack direction="row" sx={{ justifyContent: 'space-between' }}>
                <Typography sx={{ color: color.stone, fontWeight: 600, fontSize: 14 }}>{label}</Typography>
                <Box sx={{ width: 10, height: 10, bgcolor: tone, borderRadius: '50%' }} />
              </Stack>
              <Typography sx={{ fontSize: 36, fontWeight: 700, letterSpacing: '-0.05em', my: 1 }}>{value}</Typography>
              <Typography sx={{ color: color.stone, fontSize: 13 }}>{note}</Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, lg: 8 }}>
          <Box sx={{ bgcolor: color.white, border: `1px solid ${color.line}`, borderRadius: 3, p: { xs: 2, md: 3 }, height: '100%' }}>
            <Stack direction="row" sx={{ justifyContent: 'space-between', mb: 3 }}>
              <Box>
                <Typography variant="h5">Your priorities</Typography>
                <Typography sx={{ color: color.stone, fontSize: 14 }}>3 tasks need your attention</Typography>
              </Box>
              <MoreHoriz />
            </Stack>
            {tasks.map(([title, project, due, tone], i) => (
              <Stack key={title} direction="row" spacing={2} sx={{ alignItems: 'center', py: 2, borderTop: i ? `1px solid ${color.line}` : 'none' }}>
                <CheckCircle sx={{ color: i === 0 ? color.moss : color.line }} />
                <Box sx={{ flex: 1 }}>
                  <Typography sx={{ fontWeight: 700 }}>{title}</Typography>
                  <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                    <Box sx={{ width: 7, height: 7, borderRadius: '50%', bgcolor: tone }} />
                    <Typography sx={{ color: color.stone, fontSize: 13 }}>{project}</Typography>
                  </Stack>
                </Box>
                <Chip label={due} size="small" sx={{ bgcolor: color.paper, fontWeight: 700 }} />
              </Stack>
            ))}
          </Box>
        </Grid>
        <Grid size={{ xs: 12, lg: 4 }}>
          <Box sx={{ bgcolor: color.ink, color: color.white, borderRadius: 3, p: 3, height: '100%' }}>
            <Stack direction="row" sx={{ justifyContent: 'space-between' }}>
              <Box>
                <Typography sx={{ color: 'rgba(255,253,248,0.5)', fontSize: 13, fontWeight: 700, letterSpacing: '0.12em' }}>SPRINT HEALTH</Typography>
                <Typography variant="h5" sx={{ color: color.white, mt: 0.5 }}>Ahead of pace</Typography>
              </Box>
              <TrendingUp sx={{ color: color.chartreuse }} />
            </Stack>
            <Typography sx={{ fontSize: 46, fontWeight: 700, mt: 4 }}>72%</Typography>
            <LinearProgress
              value={72}
              variant="determinate"
              sx={{ height: 8, borderRadius: 5, bgcolor: '#2A332C', '& .MuiLinearProgress-bar': { bgcolor: color.chartreuse } }}
            />
            <Typography sx={{ color: 'rgba(255,253,248,0.55)', fontSize: 13, mt: 1.5 }}>36 of 50 tasks completed</Typography>
            <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center', mt: 5 }}>
              <AvatarGroup>
                {['A', 'M', 'J'].map((x, i) => (
                  <Avatar key={x} sx={{ width: 32, height: 32, bgcolor: [color.chartreuse, color.sage, color.terracotta][i], color: color.ink }}>
                    {x}
                  </Avatar>
                ))}
              </AvatarGroup>
              <Typography sx={{ color: color.chartreuse, fontSize: 13 }}>8 teammates</Typography>
            </Stack>
          </Box>
        </Grid>
      </Grid>
    </Stack>
  );
}
