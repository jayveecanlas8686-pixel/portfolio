// Clients shown by name with their OK as given by Jayvee (2026-11-04): name + company, no quotes yet.
// Facts come from each project's Context/ files; nothing about their own customers, staff or money.
export const CLIENTS = [
  {
    id: 'nest-marketing',
    name: 'Nest Marketing',
    contact: 'Umar Shaikh',
    role: 'Founder',
    about: 'An email and SMS marketing agency running Klaviyo for 60+ brands.',
    projectSlugs: ['ai-email-builder', 'nest-brain', 'campaign-alerts', 'nest-audit-engine'],
  },
  {
    id: 'reset',
    name: 'Resét Skin & Aesthetics',
    contact: 'Sebastian Larsen',
    role: 'Owner',
    about: 'A skin and aesthetics clinic in Copenhagen.',
    projectSlugs: ['reset-dashboard'],
  },
  {
    // Owner per Jayvee (2026-11-04). Day-to-day contact in the files is Michael Frahm.
    id: 'simgolf',
    name: 'SimGolf',
    contact: 'Keld Jensen',
    role: 'Owner',
    about: 'An indoor golf simulator business with several centres.',
    projectSlugs: ['simgolf-platform'],
  },
]

export function getClient(id) {
  return CLIENTS.find((c) => c.id === id)
}
