import { Alert, Box, Button, Typography } from '@mui/material';
import Link from 'next/link';

export default function BillingCancelPage() {
  return (
    <Box sx={{ maxWidth: 640, mx: 'auto', py: 8 }}>
      <Alert severity="info" sx={{ mb: 3 }}>Checkout was canceled. You have not been charged.</Alert>
      <Typography variant="h4" sx={{ fontWeight: 900, mb: 1 }}>No changes were made</Typography>
      <Typography color="text.secondary" sx={{ mb: 3 }}>You can return to billing whenever you’re ready.</Typography>
      <Link href="/billing" style={{ textDecoration: 'none' }}>
        <Button variant="contained">Try again</Button>
      </Link>
    </Box>
  );
}
