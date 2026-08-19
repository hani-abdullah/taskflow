'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import {
  Box,
  Button,
  Container,
  Divider,
  Drawer,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import { Close, Menu } from '@mui/icons-material';
import { BrandMark } from './brand-mark';
import { color } from '@/theme/tokens';

const nav = [
  { label: 'Product', href: '/features' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

const footer = [
  { title: 'Product', items: [
    { label: 'Features', href: '/features' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Start free', href: '/register' },
  ]},
  { title: 'Company', items: [
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ]},
  { title: 'Account', items: [
    { label: 'Log in', href: '/login' },
    { label: 'Create account', href: '/register' },
  ]},
];

export function MarketingShell({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: color.paper }}>
      <a className="skip-link" href="#main">Skip to content</a>

      <Box
        component="header"
        sx={{
          position: 'sticky',
          top: 0,
          zIndex: 30,
          bgcolor: 'rgba(244, 240, 232, 0.82)',
          backdropFilter: 'blur(18px)',
          borderBottom: `1px solid ${color.line}`,
        }}
      >
        <Container maxWidth="lg">
          <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between', height: 72 }}>
            <BrandMark />

            <Box component="nav" aria-label="Primary" sx={{ display: { xs: 'none', md: 'block' } }}>
              <Stack direction="row" spacing={0.5}>
                {nav.map((item) => {
                  const active = path === item.href;
                  return (
                    <Typography
                      key={item.href}
                      component={Link}
                      href={item.href}
                      aria-current={active ? 'page' : undefined}
                      sx={{
                        px: 1.6,
                        py: 0.8,
                        borderRadius: 999,
                        fontSize: 14,
                        fontWeight: 600,
                        color: active ? color.ink : color.stone,
                        bgcolor: active ? color.white : 'transparent',
                        '&:hover': { color: color.ink, bgcolor: color.white },
                      }}
                    >
                      {item.label}
                    </Typography>
                  );
                })}
              </Stack>
            </Box>

            <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
              <Button component={Link} href="/login" sx={{ display: { xs: 'none', sm: 'inline-flex' }, color: color.ink }}>
                Log in
              </Button>
              <Button component={Link} href="/register" variant="contained">
                Start free
              </Button>
              <IconButton
                aria-label="Open menu"
                onClick={() => setOpen(true)}
                sx={{ display: { md: 'none' }, color: color.ink }}
              >
                <Menu />
              </IconButton>
            </Stack>
          </Stack>
        </Container>
      </Box>

      <Drawer
        anchor="right"
        open={open}
        onClose={() => setOpen(false)}
        slotProps={{ paper: { sx: { width: 'min(360px, 100%)', bgcolor: color.cream, p: 2.5 } } }}
      >
        <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <BrandMark />
          <IconButton aria-label="Close menu" onClick={() => setOpen(false)}><Close /></IconButton>
        </Stack>
        <Stack spacing={0.5} component="nav" aria-label="Mobile">
          {nav.map((item) => (
            <Button
              key={item.href}
              component={Link}
              href={item.href}
              onClick={() => setOpen(false)}
              sx={{ justifyContent: 'flex-start', color: color.ink, fontSize: 18, py: 1.4 }}
            >
              {item.label}
            </Button>
          ))}
        </Stack>
        <Stack spacing={1.2} sx={{ mt: 4 }}>
          <Button component={Link} href="/login" onClick={() => setOpen(false)} fullWidth>
            Log in
          </Button>
          <Button component={Link} href="/register" variant="contained" onClick={() => setOpen(false)} fullWidth>
            Start for free
          </Button>
        </Stack>
      </Drawer>

      <Box id="main" component="main">{children}</Box>

      <Box component="footer" sx={{ bgcolor: color.forest, color: color.white, pt: { xs: 8, md: 10 }, pb: 4 }}>
        <Container maxWidth="lg">
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={6} sx={{ justifyContent: 'space-between' }}>
            <Box sx={{ maxWidth: 360 }}>
              <BrandMark dark />
              <Typography sx={{ mt: 2.5, color: 'rgba(255,253,248,0.78)', lineHeight: 1.7 }}>
                The quiet workspace where ambitious teams turn plans into finished work.
              </Typography>
            </Box>
            <Stack direction="row" spacing={{ xs: 5, sm: 9 }} useFlexGap sx={{ flexWrap: 'wrap' }}>
              {footer.map((group) => (
                <Stack key={group.title} spacing={1.3}>
                  <Typography sx={{ fontWeight: 700, fontSize: 13, letterSpacing: '0.12em', textTransform: 'uppercase', color: color.chartreuse }}>
                    {group.title}
                  </Typography>
                  {group.items.map((item) => (
                    <Box
                      key={item.href + item.label}
                      component={Link}
                      href={item.href}
                      sx={{ color: 'rgba(255,253,248,0.72)', fontSize: 15, '&:hover': { color: color.chartreuse } }}
                    >
                      {item.label}
                    </Box>
                  ))}
                </Stack>
              ))}
            </Stack>
          </Stack>
          <Divider sx={{ my: 5, borderColor: 'rgba(255,253,248,0.12)' }} />
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1} sx={{ justifyContent: 'space-between' }}>
            <Typography variant="body2" sx={{ color: 'rgba(255,253,248,0.7)' }}>© 2026 Taskflow, Inc.</Typography>
            <Typography variant="body2" sx={{ color: 'rgba(255,253,248,0.7)' }}>Made for momentum. Designed for calm.</Typography>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
}
