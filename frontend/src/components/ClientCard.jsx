import { Link } from 'react-router-dom'
import { ArrowUpRight } from '@phosphor-icons/react'

// A client the work was done for. No quote yet (user's choice, 2026-11-04): name, person, what they do, project count.
export default function ClientCard({ client }) {
  const count = client.projectSlugs.length
  return (
    <Link
      to={`/clients/${client.id}`}
      className="lift group flex items-start justify-between gap-4 rounded-[20px] bg-card p-5 ring-1 ring-line"
    >
      <span className="flex min-w-0 items-start gap-4">
        <span
          aria-hidden="true"
          className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent-soft font-display text-base font-bold text-accent"
        >
          {client.name.charAt(0)}
        </span>
        <span className="min-w-0">
          <span className="block font-display text-lg font-bold text-ink group-hover:text-accent">{client.name}</span>
          <span className="block text-sm text-muted">
            {client.contact}, {client.role}
          </span>
          <span className="mt-2 block text-sm">{client.about}</span>
          <span className="mt-2 block text-sm font-semibold text-accent">
            {count} {count === 1 ? 'project' : 'projects'} built
          </span>
        </span>
      </span>
      <ArrowUpRight size={18} aria-hidden="true" className="mt-1 shrink-0 text-muted group-hover:text-accent" />
    </Link>
  )
}
