'use client';

import Link from 'next/link';
import { Box, Stack, Typography } from '@mui/material';
import { BrandMark } from '@/components/brand-mark';
import { color } from '@/theme/tokens';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <Box sx={{ minHeight: '100vh', display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'minmax(380px, 44%) 1fr' }, bgcolor: color.paper }}>
      <Box
        sx={{
          display: { xs: 'none', md: 'flex' },
          position: 'relative',
          overflow: 'hidden',
          bgcolor: color.forest,
          color: color.white,
          p: { md: 5, lg: 6 },
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <BrandMark dark />
        <Box>
          <Typography variant="h2" sx={{ color: color.white, maxWidth: 480, fontSize: { md: '2.8rem', lg: '3.3rem' } }}>
            Bring calm and clarity to every project.
          </Typography>
          <Typography sx={{ color: 'rgba(255,253,248,0.75)', fontSize: 18, maxWidth: 440, mt: 2, lineHeight: 1.7 }}>
            Plan, collaborate, and keep your team moving from one focused workspace.
          </Typography>
          <Box sx={{ bgcolor: color.white, color: color.ink, borderRadius: 3, p: 2.2, mt: 5, boxShadow: '0 25px 55px rgba(0,0,0,.18)' }}>
            <Stack spacing={1.1}>
              {['Launch research', 'Review product screens', 'Prepare campaign'].map((item, i) => (
                <Stack key={item} direction="row" spacing={1.2} sx={{ alignItems: 'center', p: 1.2, bgcolor: color.paper, borderRadius: 2 }}>
                  <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: [color.chartreuse, color.terracotta, color.sage][i] }} />
                  <Typography sx={{ fontWeight: 600 }}>{item}</Typography>
                </Stack>
              ))}
            </Stack>
          </Box>
        </Box>
        <Typography component={Link} href="/" sx={{ color: 'rgba(255,253,248,0.75)', fontSize: 14 }}>
          ← Back to Taskflow
        </Typography>
      </Box>
      <Box sx={{ minWidth: 0, position: 'relative' }}>
        <Box sx={{ display: { md: 'none' }, p: 2.5 }}>
          <BrandMark />
        </Box>
        {children}
      </Box>
    </Box>
  );
}
