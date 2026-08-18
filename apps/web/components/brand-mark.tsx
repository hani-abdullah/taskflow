import Link from 'next/link';
import { Box, Stack, Typography } from '@mui/material';

export function BrandMark({ dark = false, compact = false }: { dark?: boolean; compact?: boolean }) {
  return <Link href="/" style={{ color: dark ? '#fff' : '#17211b', textDecoration: 'none' }}>
    <Stack direction="row" spacing={1.25} sx={{ alignItems: 'center' }}>
      <Box sx={{ width: 38, height: 38, borderRadius: '12px 12px 12px 4px', bgcolor: '#dfff3f', color: '#17211b', display: 'grid', placeItems: 'center', fontWeight: 950, fontSize: 19, transform: 'rotate(-3deg)', boxShadow: 'inset 0 0 0 1px rgba(23,33,27,.12)' }}>↗</Box>
      {!compact && <Typography sx={{ color: 'inherit', fontSize: 20, fontWeight: 900, letterSpacing: '-.05em' }}>Taskflow</Typography>}
    </Stack>
  </Link>;
}
