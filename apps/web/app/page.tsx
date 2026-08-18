'use client';

import Link from 'next/link';
import { Box, Button, Chip, Container, Grid, LinearProgress, Stack, Typography } from '@mui/material';
import { ArrowForward, ArrowOutward, Check, MoreHoriz, PlayArrow, RadioButtonChecked } from '@mui/icons-material';
import { MarketingShell } from '@/components/marketing-shell';

const work = [
  { title: 'Homepage refresh', tag: 'Design', color: '#f1a7ce', done: true },
  { title: 'Customer interviews', tag: 'Research', color: '#a9d7ff', done: false },
  { title: 'Launch campaign', tag: 'Marketing', color: '#ffd074', done: false },
];

export default function HomePage() {
  return <MarketingShell>
    <Box sx={{ position: 'relative', overflow: 'hidden', pt: { xs: 7, md: 11 }, pb: { xs: 8, md: 12 } }}>
      <Box sx={{ position: 'absolute', width: 520, height: 520, borderRadius: '50%', bgcolor: '#dfff3f', opacity: .16, top: -280, right: -100 }} />
      <Container maxWidth="lg"><Grid container spacing={7} sx={{ alignItems: 'center' }}>
        <Grid size={{ xs: 12, md: 6 }}><Stack spacing={3.5}>
          <Chip label="A workspace that actually flows" sx={{ alignSelf: 'flex-start', bgcolor: '#e7eadf', color: '#405047', fontWeight: 800 }} />
          <Typography variant="h1" sx={{ fontSize: { xs: '3.5rem', sm: '4.8rem', md: '5.5rem' }, lineHeight: .92, letterSpacing: '-.075em', maxWidth: 680 }}>Make space for <Box component="span" sx={{ position: 'relative', display: 'inline-block' }}>great work.<Box sx={{ position: 'absolute', height: 10, bgcolor: '#dfff3f', left: 4, right: -4, bottom: 3, zIndex: -1, transform: 'rotate(-1deg)' }} /></Box></Typography>
          <Typography sx={{ color: '#69736c', fontSize: { xs: 18, md: 20 }, lineHeight: 1.6, maxWidth: 570 }}>Plan projects, focus your team, and move every idea forward—without the busywork that gets in the way.</Typography>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5}><Button component={Link} href="/register" variant="contained" size="large" endIcon={<ArrowForward />} sx={{ bgcolor: '#17211b', px: 3, py: 1.5 }}>Start building — it’s free</Button><Button component={Link} href="/features" size="large" startIcon={<PlayArrow />} sx={{ color: '#17211b', px: 2 }}>See how it works</Button></Stack>
          <Typography variant="body2" sx={{ color: '#69736c' }}>No credit card &nbsp; • &nbsp; Free forever plan</Typography>
        </Stack></Grid>
        <Grid size={{ xs: 12, md: 6 }}><Box sx={{ position: 'relative' }}>
          <Box sx={{ bgcolor: '#17211b', borderRadius: 5, p: { xs: 2, sm: 2.5 }, boxShadow: '0 35px 80px rgba(23,33,27,.22)', transform: { md: 'rotate(1.5deg)' } }}>
            <Stack direction="row" sx={{ mb: 2, justifyContent: 'space-between', alignItems: 'center' }}><Box><Typography sx={{ color: '#8f9c93', fontSize: 12 }}>PROJECT</Typography><Typography sx={{ color: '#fff', fontWeight: 900, fontSize: 20 }}>Website launch</Typography></Box><MoreHoriz sx={{ color: '#829087' }} /></Stack>
            <Grid container spacing={1.5}>{['To do','In progress'].map((col, ci) => <Grid key={col} size={{ xs: 12, sm: 6 }}><Box sx={{ bgcolor: '#26322b', borderRadius: 3, p: 1.5, minHeight: 275 }}><Stack direction="row" sx={{ justifyContent: 'space-between', mb: 1.5 }}><Typography sx={{ color: '#c8d0ca', fontWeight: 800, fontSize: 13 }}>{col}</Typography><Typography sx={{ color: '#829087', fontSize: 13 }}>{ci ? 1 : 2}</Typography></Stack>{work.filter((_,i) => ci ? i === 0 : i > 0).map(item => <Box key={item.title} sx={{ bgcolor: '#f8f9f4', borderRadius: 2.5, p: 1.5, mb: 1.25 }}><Stack direction="row" sx={{ justifyContent: 'space-between' }}><Box sx={{ width: 9, height: 9, borderRadius: '50%', bgcolor: item.color }} /><RadioButtonChecked sx={{ fontSize: 16, color: item.done ? '#4f7b5d' : '#c4cbc5' }} /></Stack><Typography sx={{ fontWeight: 850, mt: 1.5, mb: 2, fontSize: 14 }}>{item.title}</Typography><Chip label={item.tag} size="small" sx={{ bgcolor: item.color, height: 23, fontSize: 11, fontWeight: 800 }} /></Box>)}</Box></Grid>)}</Grid>
          </Box>
          <Box sx={{ position: 'absolute', right: -18, bottom: -28, bgcolor: '#dfff3f', borderRadius: 3, p: 2, width: 190, boxShadow: '0 18px 35px rgba(23,33,27,.18)', transform: 'rotate(-3deg)', display: { xs: 'none', sm: 'block' } }}><Typography sx={{ fontWeight: 900, fontSize: 13 }}>Team velocity</Typography><Typography sx={{ fontSize: 30, fontWeight: 950, letterSpacing: '-.06em' }}>+32%</Typography><LinearProgress variant="determinate" value={76} sx={{ bgcolor: 'rgba(23,33,27,.15)', '& .MuiLinearProgress-bar': { bgcolor: '#17211b' } }} /></Box>
        </Box></Grid>
      </Grid></Container>
    </Box>
    <Box sx={{ bgcolor: '#fff', py: { xs: 8, md: 11 }, borderBlock: '1px solid #e4e7df' }}><Container maxWidth="lg"><Stack spacing={6}>
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ justifyContent: 'space-between', alignItems: { md: 'end' } }}><Box><Typography sx={{ color: '#617067', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '.14em', fontSize: 12 }}>Everything in its place</Typography><Typography variant="h2" sx={{ mt: 1, maxWidth: 650, fontSize: { xs: '2.5rem', md: '3.8rem' } }}>One calm space for your whole team.</Typography></Box><Button component={Link} href="/features" endIcon={<ArrowOutward />} sx={{ color: '#17211b' }}>Explore all features</Button></Stack>
      <Grid container spacing={2}>{[['01','See the work','Projects, tasks, and priorities stay visible—so everyone knows what matters now.','#dfff3f'],['02','Find your focus','Shape the day around meaningful work with clear owners and fewer distractions.','#f1a7ce'],['03','Keep momentum','Spot blockers early, celebrate progress, and move from idea to done with confidence.','#a9d7ff']].map(([n,title,body,color]) => <Grid key={title} size={{ xs: 12, md: 4 }}><Box sx={{ height: '100%', p: 3.5, borderRadius: 4, bgcolor: '#f6f7f2', border: '1px solid #e2e5dd' }}><Box sx={{ width: 44, height: 44, borderRadius: '50%', bgcolor: color, display: 'grid', placeItems: 'center', fontWeight: 900 }}>{n}</Box><Typography variant="h5" sx={{ mt: 6, mb: 1.5, fontWeight: 900 }}>{title}</Typography><Typography sx={{ color: '#69736c', lineHeight: 1.7 }}>{body}</Typography></Box></Grid>)}</Grid>
    </Stack></Container></Box>
    <Container maxWidth="lg" sx={{ py: { xs: 8, md: 12 } }}><Box sx={{ bgcolor: '#17211b', borderRadius: 5, px: { xs: 3, md: 8 }, py: { xs: 6, md: 8 }, color: '#fff', position: 'relative', overflow: 'hidden' }}><Box sx={{ position: 'absolute', width: 300, height: 300, borderRadius: '50%', bgcolor: '#dfff3f', right: -100, top: -170 }} /><Grid container spacing={5} sx={{ alignItems: 'center' }}><Grid size={{ xs: 12, md: 7 }}><Typography variant="h2" sx={{ fontSize: { xs: '2.7rem', md: '4rem' }, color: '#fff' }}>Ready to make work feel lighter?</Typography><Typography sx={{ color: '#aeb9b1', mt: 2, fontSize: 18 }}>Join focused teams shipping their best work with Taskflow.</Typography></Grid><Grid size={{ xs: 12, md: 5 }}><Stack spacing={1.5} sx={{ alignItems: { md: 'flex-end' } }}><Button component={Link} href="/register" variant="contained" endIcon={<ArrowForward />} sx={{ bgcolor: '#dfff3f', color: '#17211b', px: 3, py: 1.4, '&:hover': { bgcolor: '#cdef31' } }}>Start for free</Button>{['Setup in two minutes','Invite your team anytime'].map(x => <Stack key={x} direction="row" spacing={1} sx={{ alignItems: 'center' }}><Check sx={{ color: '#dfff3f', fontSize: 18 }} /><Typography sx={{ color: '#c6cfc8', fontSize: 14 }}>{x}</Typography></Stack>)}</Stack></Grid></Grid></Box></Container>
  </MarketingShell>;
}
