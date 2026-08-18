'use client';

import Link from 'next/link';
import { Box, Button, Container, Divider, Stack, Typography } from '@mui/material';
import { ArrowOutward } from '@mui/icons-material';
import { BrandMark } from './brand-mark';

export function MarketingShell({ children }: { children: React.ReactNode }) {
  return <Box sx={{ minHeight: '100vh', bgcolor: '#f6f7f2' }}>
    <Box component="header" sx={{ position: 'sticky', top: 0, zIndex: 20, bgcolor: 'rgba(246,247,242,.88)', backdropFilter: 'blur(16px)', borderBottom: '1px solid rgba(23,33,27,.08)' }}>
      <Container maxWidth="lg">
        <Stack direction="row" sx={{ alignItems:"center", justifyContent: "space-between", height: 76 }}>
        <BrandMark />
        <Stack direction="row" spacing={3.5} sx={{ display: { xs: 'none', md: 'flex' } }}>
          {['Features', 'Pricing', 'About', 'Contact'].map((item) => <Typography key={item} component={Link} href={`/${item.toLowerCase()}`} sx={{ color: '#58635b', fontSize: 14, fontWeight: 700, '&:hover': { color: '#17211b' } }}>{item}</Typography>)}
        </Stack>
        <Stack direction="row" spacing={1}><Button component={Link} href="/login" sx={{ color: '#17211b' }}>Log in</Button><Button component={Link} href="/register" variant="contained" endIcon={<ArrowOutward />} sx={{ bgcolor: '#17211b', '&:hover': { bgcolor: '#314039' } }}>Start free</Button></Stack>
      </Stack></Container>
    </Box>
    <Box component="main">{children}</Box>
    <Box component="footer" sx={{ bgcolor: '#17211b', color: '#fff', pt: 8, pb: 4 }}><Container maxWidth="lg">
      <Stack direction={{ xs: 'column', md: 'row' }} sx={{justifyContent: "space-between"}} spacing={5}>
        <Box><BrandMark dark /><Typography sx={{ mt: 2, maxWidth: 390, color: '#aab5ad', lineHeight: 1.7 }}>The calm, clear workspace where ambitious teams turn good ideas into finished work.</Typography></Box>
        <Stack direction="row" spacing={{ xs: 5, sm: 10 }}>{[['Product', 'Features', 'Pricing'], ['Company', 'About', 'Contact'], ['Account', 'Log in', 'Start free']].map(([title, ...items]) => <Stack key={title} spacing={1.2}><Typography sx={{ fontWeight: 900, mb: .5 }}>{title}</Typography>{items.map(i => <Link key={i} href={i === 'Start free' ? '/register' : `/${i.toLowerCase().replace(' ', '-')}`} style={{ color: '#aab5ad' }}>{i}</Link>)}</Stack>)}</Stack>
      </Stack><Divider sx={{ my: 5, borderColor: 'rgba(255,255,255,.1)' }} /><Stack direction={{ xs: 'column', sm: 'row' }} sx={{justifyContent: "space-between"}} spacing={1}><Typography variant="body2" sx={{ color: '#829087' }}>© 2026 Taskflow, Inc.</Typography><Typography variant="body2" sx={{ color: '#829087' }}>Made for momentum, designed for calm.</Typography></Stack>
    </Container></Box>
  </Box>;
}
