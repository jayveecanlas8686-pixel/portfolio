// Four services, rebuilt around the client work (user request 2026-11-04).
// Each leads with a client project as proof, then supporting work.

export const SERVICES = [
  {
    id: 'ai-assistants',
    number: '01',
    title: 'AI assistants for your team',
    outcome: 'Assistants that answer from your own data and turn requests into tasks, inside Slack and the tools you already use.',
    benefits: ['Answers from your own docs and chats', 'Requests become tasks in the right place', 'Only your team can use it'],
    proofSlugs: ['nest-brain', 'nest-audit-engine'],
  },
  {
    id: 'dashboards',
    number: '02',
    title: 'Live dashboards and internal apps',
    outcome: 'One view of bookings, sales, marketing and finance that refreshes itself every day.',
    benefits: ['Data pulled from all your tools daily', 'Finance numbers nobody updates by hand', 'An alert when a sync fails'],
    proofSlugs: ['reset-dashboard', 'simgolf-platform', 'power-bi-refresh-monitor'],
  },
  {
    id: 'automation',
    number: '03',
    title: 'Automations and alerts',
    outcome: 'Workflows that move and check your data, and tell you the moment something drops.',
    benefits: ['Repetitive tasks run on their own', 'Problems flagged before anyone has to look', 'Hours handed back to your team'],
    proofSlugs: ['campaign-alerts', 'waybill-pdf-extraction', 'consolidate-raw-collection-data'],
  },
  {
    id: 'ai-content',
    number: '04',
    title: 'AI content and outreach',
    outcome: 'On-brand emails, audits and reports produced on a schedule, and checked before anything goes out.',
    benefits: ['More output from the same team', 'On-brand every time', 'Checked before it is sent'],
    proofSlugs: ['ai-email-builder', 'nest-audit-engine', 'ai-sales-forecast'],
  },
]

export const METHOD = [
  { step: 'Map it', text: 'We look at how the work is done today and what it costs you, then pick what to automate first.' },
  { step: 'Automate it', text: 'I build it and test it with your real data until it runs without anyone babysitting it.' },
  { step: 'Hand it over', text: 'You get docs and a walkthrough, so your team runs it without depending on me.' },
]

// Home 'before → after' ledger (design doc). Numbers from spec §7 only.
export const HOME_RESULTS = [
  { value: '2.5×', label: 'more email campaigns a day', slug: 'ai-email-builder', title: 'AI Email Builder', before: '20 emails/day', after: '50+ emails/day', estimate: false },
  { value: '2h → 10m', label: 'daily data entry, ~40 hrs/month saved', slug: 'waybill-pdf-extraction', title: 'Waybill PDF Extraction', before: '2 hrs/day', after: '5–10 min/day', estimate: true, note: '~40 hrs/month, estimate' },
  { value: '8×/day', label: 'verified dashboard refreshes, zero by hand', slug: 'power-bi-refresh-monitor', title: 'Power BI Refresh Monitor', before: 'Refreshed by hand', after: 'Up to 8×/day, verified', estimate: false },
]
