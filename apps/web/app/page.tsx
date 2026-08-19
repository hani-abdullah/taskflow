'use client';

import Link from 'next/link';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Container,
  Grid,
  Stack,
  Typography,
} from '@mui/material';
import { ArrowForward, Check, ExpandMore, StarRounded } from '@mui/icons-material';
import { MarketingShell } from '@/components/marketing-shell';
import { CtaBanner, FeatureGrid, ProductBoard, Steps } from '@/components/marketing-sections';
import { Reveal } from '@/components/reveal';
import { color } from '@/theme/tokens';

const benefits = [
  ['Plan with clarity', 'Turn ambitious goals into projects, milestones, and a next step everyone can see.'],
  ['Move work forward', 'Give every task an owner, a deadline, and the context required to act.'],
  ['See the whole picture', 'One calm view of priorities, progress, and the blockers that need attention.'],
];

const proof = [
  { quote: 'We replaced three tools and a weekly status meeting. Ownership is obvious. Progress is visible.', name: 'Amelia Morgan', role: 'Operations lead, Northstar' },
  { quote: 'Taskflow is the first workspace our designers and PMs actually keep open. It stays out of the way.', name: 'Jonah Ellis', role: 'Studio director, Capsule' },
  { quote: 'The board looks like our thinking. Not a template we have to fight.', name: 'Priya Shah', role: 'Product lead, Horizon' },
];

const faqs = [
  ['Who is Taskflow for?', 'Product, operations, and agency teams who need a shared view of work without living in a dozen tools. Individuals use the free plan. Growing teams typically start on Business.'],
  ['How long does setup take?', 'Most teams create a workspace, invite people, and have their first project moving in under ten minutes. There is no implementation project required.'],
  ['Can we start free?', 'Yes. The Personal plan is free forever for individuals. Upgrade when you need unlimited projects, collaboration, and reporting — cancel anytime.'],
  ['Will this replace our current tools?', 'Taskflow is the system of record for projects and tasks. Keep Slack, Figma, and GitHub for conversation and craft. Stop using them as your project tracker.'],
];

export default function HomePage() {
  return (
    <MarketingShell>
      <Box sx={{ pt: { xs: 8, md: 12 }, pb: { xs: 8, md: 14 }, position: 'relative' }}>
        <Container maxWidth="lg">
          <Grid container spacing={{ xs: 6, md: 8 }} sx={{ alignItems: 'center' }}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Stack spacing={3}>
                <Typography className="eyebrow">Project management, distilled</Typography>
                <Typography variant="h1" sx={{ fontSize: { xs: '3.1rem', sm: '4.1rem', md: '4.75rem' }, maxWidth: 640 }}>
                  Finish the work that matters.
                </Typography>
                <Typography sx={{ color: color.stone, fontSize: { xs: 18, md: 20 }, lineHeight: 1.7, maxWidth: 540 }}>
                  Taskflow is the quiet workspace for product, ops, and agency teams — projects, people, and priorities in one place, so focus replaces follow-ups.
                </Typography>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5}>
                  <Button component={Link} href="/register" variant="contained" size="large" endIcon={<ArrowForward />}>
                    Start for free
                  </Button>
                  <Button component={Link} href="/features" size="large" sx={{ color: color.ink }}>
                    Explore the product
                  </Button>
                </Stack>
                <Stack direction="row" spacing={2.5} useFlexGap sx={{ flexWrap: 'wrap' }}>
                  {['Free forever plan', 'No credit card', 'Ready in minutes'].map((item) => (
                    <Stack key={item} direction="row" spacing={0.8} sx={{ alignItems: 'center' }}>
                      <Check sx={{ fontSize: 16, color: color.moss }} />
                      <Typography variant="body2" sx={{ color: color.stone, fontWeight: 600 }}>{item}</Typography>
                    </Stack>
                  ))}
                </Stack>
              </Stack>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <ProductBoard />
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Box sx={{ borderBlock: `1px solid ${color.line}`, py: 3, bgcolor: color.cream }}>
        <Container maxWidth="lg">
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={3} sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography sx={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.16em', color: color.stone }}>
              TRUSTED BY TEAMS WHO PREFER CALM OVER CHAOS
            </Typography>
            <Stack direction="row" spacing={{ xs: 3, md: 5 }} useFlexGap sx={{ flexWrap: 'wrap', justifyContent: 'center' }}>
              {['Northstar', 'Vertex', 'Capsule', 'Horizon', 'Outline'].map((name) => (
                <Typography key={name} sx={{ fontFamily: 'var(--font-display), Fraunces, serif', fontSize: 22, color: color.moss, letterSpacing: '-0.03em' }}>
                  {name}
                </Typography>
              ))}
            </Stack>
          </Stack>
        </Container>
      </Box>

      <Box sx={{ py: { xs: 10, md: 16 } }}>
        <Container maxWidth="lg">
          <Reveal>
            <Grid container spacing={6}>
              <Grid size={{ xs: 12, md: 5 }}>
                <Typography className="eyebrow">The problem</Typography>
                <Typography variant="h2" sx={{ mt: 1.5, fontSize: { xs: '2.4rem', md: '3.4rem' } }}>
                  Work is not hard because people are slow.
                </Typography>
              </Grid>
              <Grid size={{ xs: 12, md: 7 }}>
                <Typography sx={{ color: color.stone, fontSize: { xs: 18, md: 22 }, lineHeight: 1.7, mt: { md: 5 } }}>
                  It is hard because priorities live in chat, plans live in slides, and nobody is sure who owns the next step. Taskflow puts the work in one considered place — so your team spends the week making things, not reconstructing the week.
                </Typography>
              </Grid>
            </Grid>
          </Reveal>
        </Container>
      </Box>

      <Box sx={{ py: { xs: 4, md: 6 } }}>
        <Container maxWidth="lg">
          <Reveal>
            <Box sx={{ maxWidth: 720, mb: 6 }}>
              <Typography className="eyebrow">What changes</Typography>
              <Typography variant="h2" sx={{ mt: 1.5, fontSize: { xs: '2.5rem', md: '3.5rem' } }}>
                A workspace that stays out of the way.
              </Typography>
            </Box>
          </Reveal>
          <Grid container spacing={2}>
            {benefits.map(([title, body], i) => (
              <Grid key={title} size={{ xs: 12, md: 4 }}>
                <Reveal delay={i * 80}>
                  <Box className="feature-card" sx={{ bgcolor: i === 1 ? color.forest : color.white, color: i === 1 ? color.white : color.ink, minHeight: 300 }}>
                    <Typography sx={{ fontFamily: 'var(--font-display), Fraunces, serif', fontSize: 48, color: i === 1 ? color.chartreuse : color.moss }}>
                      0{i + 1}
                    </Typography>
                    <Box>
                      <Typography variant="h5" sx={{ mb: 1.5, color: 'inherit' }}>{title}</Typography>
                      <Typography sx={{ color: i === 1 ? 'rgba(255,253,248,0.75)' : color.stone, lineHeight: 1.7 }}>{body}</Typography>
                    </Box>
                  </Box>
                </Reveal>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      <Box sx={{ py: { xs: 10, md: 16 } }}>
        <Container maxWidth="lg">
          <Grid container spacing={7} sx={{ alignItems: 'center' }}>
            <Grid size={{ xs: 12, md: 5 }}>
              <Reveal>
                <Typography className="eyebrow">The product</Typography>
                <Typography variant="h2" sx={{ mt: 1.5, fontSize: { xs: '2.5rem', md: '3.4rem' } }}>
                  Plans, people, and progress — finally in the same room.
                </Typography>
                <Typography sx={{ color: color.stone, fontSize: 18, lineHeight: 1.7, mt: 2.5 }}>
                  Map the work, keep deadlines honest, and move between the day and the quarter without losing the thread.
                </Typography>
                <Stack spacing={2.2} sx={{ mt: 4 }}>
                  {[
                    ['A single source of truth', 'Projects, tasks, and owners live together — not across tabs.'],
                    ['Timelines you can actually use', 'See dependencies and due dates without a separate Gantt ritual.'],
                    ['A day view that respects focus', 'Each person knows what to finish before the next meeting appears.'],
                  ].map(([title, body]) => (
                    <Stack key={title} direction="row" spacing={2}>
                      <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: color.chartreuse, mt: 1, flexShrink: 0, outline: `6px solid ${color.forest}` }} />
                      <Box>
                        <Typography sx={{ fontWeight: 700 }}>{title}</Typography>
                        <Typography sx={{ color: color.stone }}>{body}</Typography>
                      </Box>
                    </Stack>
                  ))}
                </Stack>
              </Reveal>
            </Grid>
            <Grid size={{ xs: 12, md: 7 }}>
              <Reveal delay={80}>
                <Box sx={{ bgcolor: color.ink, borderRadius: 5, p: { xs: 2, md: 3 }, color: color.white, boxShadow: '0 40px 90px rgba(22,20,16,.2)' }}>
                  <Stack direction="row" sx={{ justifyContent: 'space-between', mb: 2, px: 0.5 }}>
                    <Box>
                      <Typography sx={{ color: 'rgba(255,253,248,0.5)', fontSize: 11, letterSpacing: '0.14em' }}>THIS QUARTER</Typography>
                      <Typography sx={{ mt: 0.4, fontWeight: 700 }}>Website relaunch</Typography>
                    </Box>
                    <Typography sx={{ color: color.chartreuse, fontWeight: 700 }}>On track</Typography>
                  </Stack>
                  <Grid container spacing={1.2}>
                    {['Research', 'Design', 'Build', 'Launch'].map((col, i) => (
                      <Grid key={col} size={{ xs: 6, sm: 3 }}>
                        <Box sx={{ bgcolor: 'rgba(255,253,248,0.06)', borderRadius: 2.5, p: 1.4, minHeight: 150 }}>
                          <Typography sx={{ fontSize: 12, color: 'rgba(255,253,248,0.55)', mb: 1.2 }}>{col}</Typography>
                          {[0, 1].map((n) => (
                            <Box key={n} sx={{ bgcolor: color.white, color: color.ink, borderRadius: 1.5, p: 1, mb: 0.8 }}>
                              <Typography sx={{ fontSize: 11, fontWeight: 700 }}>{['Insights', 'Homepage', 'API', 'QA'][i]} {n ? 'review' : ''}</Typography>
                            </Box>
                          ))}
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              </Reveal>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <FeatureGrid title="Built to be used every day, not demonstrated once." />

      <Box sx={{ bgcolor: color.cream, py: { xs: 10, md: 14 }, borderBlock: `1px solid ${color.line}` }}>
        <Container maxWidth="lg">
          <Grid container spacing={6} sx={{ alignItems: 'end', mb: 6 }}>
            <Grid size={{ xs: 12, md: 7 }}>
              <Typography className="eyebrow">Why Taskflow</Typography>
              <Typography variant="h2" sx={{ mt: 1.5, fontSize: { xs: '2.5rem', md: '3.4rem' } }}>
                Distinct from the noise — on purpose.
              </Typography>
            </Grid>
            <Grid size={{ xs: 12, md: 5 }}>
              <Typography sx={{ color: color.stone, fontSize: 18, lineHeight: 1.7 }}>
                Most work software tries to be everything. Taskflow is opinionated about clarity: fewer views, stronger ownership, and a visual language that stays calm under pressure.
              </Typography>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            {[
              ['No theatre', 'Dashboards that describe the work — not a second job of feeding the tool.'],
              ['Opinionated defaults', 'Sensible structure from day one. Customize later, not before you can start.'],
              ['Quiet by design', 'Typography, space, and hierarchy instead of badges, bursts, and noise.'],
              ['Made for mixed teams', 'PMs, designers, engineers, and operators can share one picture of progress.'],
            ].map(([title, body]) => (
              <Grid key={title} size={{ xs: 12, sm: 6 }}>
                <Box sx={{ p: 3, height: '100%', bgcolor: color.white, border: `1px solid ${color.line}`, borderRadius: 3 }}>
                  <Typography variant="h5" sx={{ mb: 1 }}>{title}</Typography>
                  <Typography sx={{ color: color.stone, lineHeight: 1.7 }}>{body}</Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      <Steps />

      <Box sx={{ py: { xs: 10, md: 16 } }}>
        <Container maxWidth="lg">
          <Typography className="eyebrow">Who it is for</Typography>
          <Typography variant="h2" sx={{ mt: 1.5, mb: 6, maxWidth: 700, fontSize: { xs: '2.5rem', md: '3.4rem' } }}>
            Shaped around how real teams already work.
          </Typography>
          <Grid container spacing={2}>
            {[
              ['Product teams', 'Keep roadmap, delivery, and launch checklists in one living workspace.'],
              ['Agencies', 'Give every client project an owner, a timeline, and a place for the next action.'],
              ['Operations', 'Replace status meetings with a picture of work that updates itself.'],
              ['Founders & studios', 'Stay small in headcount without staying chaotic in execution.'],
            ].map(([title, body], i) => (
              <Grid key={title} size={{ xs: 12, sm: 6, md: 3 }}>
                <Box sx={{ height: '100%', minHeight: 260, p: 3, borderRadius: 3, bgcolor: i === 1 ? color.chartreuse : color.white, border: `1px solid ${color.line}`, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <Typography sx={{ fontSize: 13, color: color.stone }}>0{i + 1}</Typography>
                  <Box>
                    <Typography variant="h5" sx={{ mb: 1 }}>{title}</Typography>
                    <Typography sx={{ color: color.stone, lineHeight: 1.65 }}>{body}</Typography>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      <Box sx={{ bgcolor: color.forest, color: color.white, py: { xs: 10, md: 16 } }}>
        <Container maxWidth="lg">
          <Grid container spacing={6}>
            <Grid size={{ xs: 12, md: 5 }}>
              <Typography className="eyebrow" sx={{ color: `${color.chartreuse} !important` }}>Social proof</Typography>
              <Typography variant="h2" sx={{ color: color.white, mt: 1.5, fontSize: { xs: '2.5rem', md: '3.4rem' } }}>
                Less chasing. More creating.
              </Typography>
              <Typography sx={{ color: 'rgba(255,253,248,0.72)', mt: 2.5, fontSize: 18, lineHeight: 1.7, maxWidth: 440 }}>
                Teams use Taskflow to make ownership obvious and status meetings optional.
              </Typography>
            </Grid>
            <Grid size={{ xs: 12, md: 7 }}>
              <Stack spacing={2}>
                {proof.map((item, i) => (
                  <Box key={item.name} sx={{ bgcolor: i === 0 ? color.white : 'rgba(255,253,248,0.06)', color: i === 0 ? color.ink : color.white, p: { xs: 3, md: 3.5 }, borderRadius: 3 }}>
                    {i === 0 && (
                      <Stack direction="row" spacing={0.2} sx={{ mb: 1.5 }}>
                        {[1, 2, 3, 4, 5].map((n) => <StarRounded key={n} sx={{ color: color.terracotta, fontSize: 22 }} />)}
                      </Stack>
                    )}
                    <Typography sx={{ fontSize: i === 0 ? 22 : 17, fontWeight: 500, lineHeight: 1.5, fontFamily: i === 0 ? 'var(--font-display), Fraunces, serif' : 'inherit' }}>
                      “{item.quote}”
                    </Typography>
                    <Typography sx={{ mt: 2, fontWeight: 700, fontSize: 14 }}>{item.name}</Typography>
                    <Typography sx={{ color: i === 0 ? color.stone : 'rgba(255,253,248,0.55)', fontSize: 13 }}>{item.role}</Typography>
                  </Box>
                ))}
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Box sx={{ py: { xs: 10, md: 14 } }}>
        <Container maxWidth="md">
          <Typography variant="h2" sx={{ textAlign: 'center', mb: 5, fontSize: { xs: '2.4rem', md: '3.2rem' } }}>
            Questions, answered plainly
          </Typography>
          {faqs.map(([q, a]) => (
            <Accordion key={q} disableGutters elevation={0} sx={{ borderBottom: `1px solid ${color.line}`, bgcolor: 'transparent' }}>
              <AccordionSummary expandIcon={<ExpandMore />} sx={{ px: 0, py: 1 }}>
                <Typography variant="h6">{q}</Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ px: 0, pb: 2.5 }}>
                <Typography sx={{ color: color.stone, lineHeight: 1.7 }}>{a}</Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Container>
      </Box>

      <CtaBanner />
    </MarketingShell>
  );
}
