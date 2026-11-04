import { PROJECTS } from './projects.js'

// Who the work was for (user request 2026-11-04): three categories of cards on the Projects page.
// Clients shown by name with their OK as given by Jayvee: name + company, no quotes yet.
// Facts come from each project's Context/ files; nothing about their own customers, staff or money.
export const CLIENTS = [
  {
    kind: 'client',
    id: 'nest-marketing',
    logo: '/images/clients/nest-marketing.webp', // official, from the client's project files
    name: 'Nest Marketing',
    contact: 'Umar Shaikh',
    role: 'Founder',
    about: 'An email and SMS marketing agency running Klaviyo for 60+ brands.',
    projectSlugs: ['ai-email-builder', 'nest-brain', 'campaign-alerts', 'nest-audit-engine', 'nest-guardrails'],
  },
  {
    kind: 'client',
    id: 'reset',
    logo: '/images/clients/reset.webp', // official, from the client's project files
    name: 'Resét Skin & Aesthetics',
    contact: 'Sebastian Larsen',
    role: 'Owner',
    about: 'A skin and aesthetics clinic in Copenhagen.',
    projectSlugs: ['reset-dashboard', 'reset-automation'],
  },
  {
    // Owner per Jayvee (2026-11-04). Day-to-day contact in the files is Michael Frahm.
    kind: 'client',
    id: 'simgolf',
    name: 'SimGolf',
    contact: 'Keld Jensen',
    role: 'Owner',
    about: 'An indoor golf simulator business with several centres.',
    projectSlugs: ['simgolf-platform'],
  },
]

const slugsIn = (group) => PROJECTS.filter((p) => p.group === group).map((p) => p.slug)

export const EMPLOYERS = [
  {
    kind: 'employer',
    id: 'brigada',
    name: 'Brigada Distributions',
    contact: 'Data Engineer / Analyst, Jan 2024 – Mar 2026',
    about: 'A distribution business in General Santos City, Philippines.',
    projectSlugs: slugsIn('employment'),
  },
]

export const PERSONAL = [
  {
    kind: 'personal',
    id: 'personal',
    name: 'Personal projects',
    contact: 'Built on my own',
    about: 'A content automation and five web apps you can open and click through.',
    projectSlugs: slugsIn('personal'),
  },
]

const ALL = { client: CLIENTS, employer: EMPLOYERS, personal: PERSONAL }

export function getClient(id) {
  return CLIENTS.find((c) => c.id === id)
}

export function getCollection(kind, id) {
  return (ALL[kind] ?? []).find((c) => c.id === id)
}

// Where each card leads.
export function hrefFor(entry) {
  if (entry.kind === 'employer') return `/employment/${entry.id}`
  if (entry.kind === 'personal') return '/personal'
  return `/clients/${entry.id}`
}

// "Umar Shaikh, Founder" for clients; the subtitle as written for the others.
export function subtitleFor(entry) {
  return entry.role ? `${entry.contact}, ${entry.role}` : entry.contact
}
