import { Link } from 'react-router-dom'
import { ArrowUpRight } from '@phosphor-icons/react'
import { hrefFor, subtitleFor } from '../data/clients.js'

// Official logo when we have one (from the client's own files), otherwise a letter tile.
export function ClientMark({ client, size = 'h-11' }) {
  if (client.logo) {
    return (
      <img
        src={client.logo}
        alt={`${client.name} logo`}
        className={`${size} w-auto max-w-[110px] shrink-0 rounded-xl bg-white object-contain ring-1 ring-line`}
      />
    )
  }
  return (
    <span
      aria-hidden="true"
      className={`inline-flex ${size} aspect-square shrink-0 items-center justify-center rounded-xl bg-accent-soft font-display text-base font-bold text-accent`}
    >
      {client.name.charAt(0)}
    </span>
  )
}

// One card per client, employer or personal set (user request 2026-11-04). No quotes yet.
export default function ClientCard({ client }) {
  const count = client.projectSlugs.length
  return (
    <Link
      to={hrefFor(client)}
      className="lift group flex items-start justify-between gap-4 rounded-[20px] bg-card p-5 ring-1 ring-line"
    >
      <span className="flex min-w-0 items-start gap-4">
        <ClientMark client={client} />
        <span className="min-w-0">
          <span className="block font-display text-lg font-bold text-ink group-hover:text-accent">{client.name}</span>
          <span className="block text-sm text-muted">{subtitleFor(client)}</span>
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
