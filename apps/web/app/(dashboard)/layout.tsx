import { AuthGuard } from '@/components/auth-guard';
import { NotificationBell } from '@/features/notifications/components/notification-bell';
import Stack from '@mui/material/Stack';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard>
      {children}
      <Stack
        direction="row"
        spacing={1}
        sx={{ alignItems: "center" }}
      >
        <NotificationBell />
      </Stack>
    </AuthGuard>
  );
}