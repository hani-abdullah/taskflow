import { Avatar, Box, Button, Chip, Grid, Stack, Typography } from '@mui/material';
import { PersonAdd } from '@mui/icons-material';
import { color } from '@/theme/tokens';

const team = [
  { name: 'Maya Chen', role: 'Product designer', initial: 'MC', bg: color.chartreuse, fg: color.ink, status: 'Online' },
  { name: 'Jon Bell', role: 'Frontend engineer', initial: 'JB', bg: color.sage, fg: color.white, status: 'In focus' },
  { name: 'Sara Ahmed', role: 'Product manager', initial: 'SA', bg: color.terracotta, fg: color.white, status: 'Online' },
  { name: 'Leo Martin', role: 'Researcher', initial: 'LM', bg: color.forest, fg: color.chartreuse, status: 'Offline' },
];

export default function TeamPage() {
  return (
    <Stack spacing={3} sx={{ maxWidth: 1240, mx: 'auto' }}>
      <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'end' }}>
        <Box>
          <Typography variant="h3">Your team</Typography>
          <Typography color="text.secondary">The people moving work forward with you.</Typography>
        </Box>
        <Button variant="contained" startIcon={<PersonAdd />}>Invite member</Button>
      </Stack>
      <Grid container spacing={2}>
        {team.map((member) => (
          <Grid key={member.name} size={{ xs: 12, sm: 6, lg: 3 }}>
            <Box sx={{ bgcolor: color.white, border: `1px solid ${color.line}`, borderRadius: 3, p: 2.5 }}>
              <Stack direction="row" sx={{ justifyContent: 'space-between' }}>
                <Avatar sx={{ width: 52, height: 52, bgcolor: member.bg, color: member.fg, fontWeight: 800 }}>{member.initial}</Avatar>
                <Chip label={member.status} size="small" sx={{ bgcolor: color.paper, fontSize: 11 }} />
              </Stack>
              <Typography variant="h6" sx={{ mt: 3 }}>{member.name}</Typography>
              <Typography sx={{ color: color.stone, fontSize: 14 }}>{member.role}</Typography>
              <Box sx={{ mt: 3, pt: 2, borderTop: `1px solid ${color.line}` }}>
                <Typography sx={{ fontSize: 12, color: color.stone, letterSpacing: '0.08em' }}>CURRENT FOCUS</Typography>
                <Typography sx={{ fontWeight: 700, fontSize: 14, mt: 0.5 }}>Website launch</Typography>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
}
