import Link from 'next/link';
import { Box, Stack, Typography } from '@mui/material';
import { color } from '@/theme/tokens';

export function BrandMark({
  dark = false,
  compact = false,
}: {
  dark?: boolean;
  compact?: boolean;
}) {
  const tile = dark ? color.chartreuse : color.forest;
  const stroke = dark ? color.forest : color.chartreuse;
  const text = dark ? color.white : color.ink;

  return (
    <Link href="/" aria-label="Taskflow home" style={{ color: text, textDecoration: 'none' }}>
      <Stack direction="row" spacing={1.25} sx={{ alignItems: 'center' }}>
        <Box
          component="svg"
          viewBox="0 0 40 40"
          aria-hidden
          sx={{ width: 36, height: 36, display: 'block', flexShrink: 0 }}
        >
          <rect width="40" height="40" rx="12" fill={tile} />
          <path
            d="M11 13.5h12.5c4.2 0 4.2 6.5 0 6.5H18c-4.2 0-4.2 6.5 0 6.5h12.5"
            fill="none"
            stroke={stroke}
            strokeWidth="2.6"
            strokeLinecap="round"
          />
        </Box>
        {!compact && (
          <Typography
            sx={{
              color: 'inherit',
              fontSize: 20,
              fontWeight: 600,
              letterSpacing: '-0.04em',
              lineHeight: 1,
            }}
          >
            Taskflow
          </Typography>
        )}
      </Stack>
    </Link>
  );
}
