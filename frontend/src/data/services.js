// Spec §8. Four services with equal weight, each backed by proof projects.

export const SERVICES = [
  {
    id: 'automation',
    number: '01',
    title: 'Kill the manual work',
    outcome: 'Flows that move, clean and file your data so your team stops copy-pasting.',
    benefits: ['Repetitive tasks run on their own', 'Fewer typos and missed steps', 'Hours handed back to your team'],
    proofSlugs: ['waybill-pdf-extraction', 'consolidate-raw-collection-data'],
  },
  {
    id: 'reporting',
    number: '02',
    title: 'Reports you can trust',
    outcome: 'Power BI and SQL Server pipelines that refresh, check themselves and alert you.',
    benefits: ['Dashboards that are never stale', 'Every refresh confirmed, not assumed', 'An alert the moment something breaks'],
    proofSlugs: ['power-bi-refresh-monitor', 'data-sync-sql-server'],
  },
  {
    id: 'ai',
    number: '03',
    title: 'AI that does real work',
    outcome: 'AI built into a workflow: content, forecasts and documents, on a schedule.',
    benefits: ['More output from the same team', 'Runs on a schedule, not on someone remembering', 'Fits the tools you already use'],
    proofSlugs: ['ai-email-builder', 'ai-sales-forecast'],
  },
  {
    id: 'web-apps',
    number: '04',
    title: 'Custom web apps',
    outcome: 'Dashboards, CRMs and booking tools built around how your team works.',
    benefits: ['Built for your workflow, not a template', 'Clean, fast and easy to use', 'Yours to keep and extend'],
    proofSlugs: ['nexuscrm', 'shophub', 'stayease'],
  },
]

export const METHOD = [
  { step: 'Map it', text: 'We look at how the work is done today and what it costs you, then pick what to automate first.' },
  { step: 'Automate it', text: 'I build it and test it with your real data until it runs without anyone babysitting it.' },
  { step: 'Hand it over', text: 'You get docs and a walkthrough, so your team runs it without depending on me.' },
]

export const HOME_RESULTS = [
  { value: '2.5×', label: 'more email campaigns a day', slug: 'ai-email-builder' },
  { value: '2h → 10m', label: 'daily data entry, ~40 hrs/month saved (estimate)', slug: 'waybill-pdf-extraction' },
  { value: '8×/day', label: 'verified dashboard refreshes, zero by hand', slug: 'power-bi-refresh-monitor' },
]
