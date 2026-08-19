'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Box, Button, Divider, IconButton, Stack, Typography } from '@mui/material';
import { Add, CalendarMonth, CreditCardOutlined, DashboardOutlined, FolderOutlined, GroupOutlined, HelpCenterOutlined, Logout, SettingsOutlined } from '@mui/icons-material';
import { BrandMark } from './brand-mark';
import { NotificationBell } from '@/features/notifications/components/notification-bell';
import { useAuthStore } from '@/stores/auth.store';
import { color } from '@/theme/tokens';

const links = [
  { label: 'Overview', href: '/dashboard', icon: DashboardOutlined },
  { label: 'Projects', href: '/projects', icon: FolderOutlined },
  { label: 'Calendar', href: '/calendar', icon: CalendarMonth },
  { label: 'Team', href: '/team', icon: GroupOutlined },
  { label: 'Billing', href: '/billing', icon: CreditCardOutlined },
];

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  const user = useAuthStore((s) => s.user);

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: color.paper, display: 'flex' }}>
      <Box
        component="aside"
        sx={{
          width: 252,
          p: 2.5,
          bgcolor: color.ink,
          color: color.white,
          position: 'fixed',
          inset: '0 auto 0 0',
          display: { xs: 'none', md: 'flex' },
          flexDirection: 'column',
        }}
      >
        <BrandMark dark />
        <Button
          component={Link}
          href="/projects"
          variant="contained"
          startIcon={<Add />}
          sx={{ mt: 4, mb: 3, bgcolor: color.chartreuse, color: color.ink, '&:hover': { bgcolor: color.chartreuseHover } }}
        >
          New project
        </Button>
        <Stack spacing={0.5}>
          {links.map(({ label, href, icon: Icon }) => {
            const active = href === '/dashboard' ? path === href : path.startsWith(href);
            return (
              <Button
                key={href}
                component={Link}
                href={href}
                startIcon={<Icon />}
                sx={{
                  justifyContent: 'flex-start',
                  borderRadius: 2.5,
                  px: 1.5,
                  py: 1.15,
                  color: active ? color.ink : 'rgba(255,253,248,0.62)',
                  bgcolor: active ? color.white : 'transparent',
                  '&:hover': { bgcolor: active ? color.white : 'rgba(255,253,248,.07)', color: active ? color.ink : color.white },
                }}
              >
                {label}
              </Button>
            );
          })}
        </Stack>
        <Box sx={{ flex: 1 }} />
        <Stack spacing={0.5}>
          <Button component={Link} href="/settings" startIcon={<SettingsOutlined />} sx={{ justifyContent: 'flex-start', color: 'rgba(255,253,248,0.62)' }}>
            Settings
          </Button>
          <Button component={Link} href="/contact" startIcon={<HelpCenterOutlined />} sx={{ justifyContent: 'flex-start', color: 'rgba(255,253,248,0.62)' }}>
            Help center
          </Button>
        </Stack>
        <Divider sx={{ my: 2, borderColor: 'rgba(255,253,248,.1)' }} />
        <Stack direction="row" spacing={1.25} sx={{ alignItems: 'center' }}>
          <Box sx={{ width: 38, height: 38, borderRadius: '50%', bgcolor: color.chartreuse, display: 'grid', placeItems: 'center', color: color.ink, fontWeight: 800 }}>
            {user?.firstName?.[0] || 'Y'}
          </Box>
          <Box sx={{ minWidth: 0, flex: 1 }}>
            <Typography noWrap sx={{ fontWeight: 700, fontSize: 14 }}>
              {user ? `${user.firstName} ${user.lastName}` : 'Your workspace'}
            </Typography>
            <Typography noWrap sx={{ color: 'rgba(255,253,248,0.5)', fontSize: 12 }}>Workspace admin</Typography>
          </Box>
          <Logout sx={{ fontSize: 18, color: 'rgba(255,253,248,0.45)' }} />
        </Stack>
      </Box>
      <Box sx={{ flex: 1, ml: { md: '252px' }, minWidth: 0 }}>
        <Box
          component="header"
          sx={{
            height: 72,
            px: { xs: 2, md: 4 },
            bgcolor: 'rgba(244,240,232,.88)',
            backdropFilter: 'blur(14px)',
            borderBottom: `1px solid ${color.line}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            position: 'sticky',
            top: 0,
            zIndex: 10,
          }}
        >
          <Box sx={{ display: { md: 'none' } }}><BrandMark compact /></Box>
          <Typography sx={{ display: { xs: 'none', md: 'block' }, color: color.stone, fontSize: 14 }}>
            Workspace / <Box component="span" sx={{ color: color.ink, fontWeight: 700 }}>Taskflow</Box>
          </Typography>
          <Stack direction="row" spacing={1}>
            <NotificationBell />
            <IconButton component={Link} href="/settings" sx={{ border: `1px solid ${color.line}` }} aria-label="Settings">
              <SettingsOutlined fontSize="small" />
            </IconButton>
          </Stack>
        </Box>
        <Box component="main" sx={{ p: { xs: 2, sm: 3, lg: 4 } }}>{children}</Box>
      </Box>
    </Box>
  );
}
