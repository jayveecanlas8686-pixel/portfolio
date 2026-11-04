import { Link, useParams } from 'react-router-dom'
import { ArrowLeft } from '@phosphor-icons/react'
import { getCollection, subtitleFor } from '../data/clients.js'
import { getProject } from '../data/projects.js'
import { isRow } from '../lib/format.js'
import { useDocumentTitle } from '../lib/useDocumentTitle.js'
import { ProjectRow, ProjectTile } from '../components/ProjectCard.jsx'
import ContactBand from '../components/ContactBand.jsx'
import { ClientMark } from '../components/ClientCard.jsx'
import NotFound from './NotFound.jsx'

const HEADINGS = {
  client: (c) => `What I built for ${c.name}`,
  employer: (c) => `What I built at ${c.name}`,
  personal: () => 'What I built',
}

// The page a Projects card opens: one client, the employer, or the personal set (user request 2026-11-04).
// kind comes from the route; /personal has no id, so it uses its single entry.
export default function ClientDetail({ kind = 'client' }) {
  const { id = kind } = useParams()
  const entry = getCollection(kind, id)
  useDocumentTitle(entry?.name ?? 'Not found')
  if (!entry) return <NotFound />

  const projects = entry.projectSlugs.map(getProject).filter(Boolean)
  const rows = projects.filter(isRow)
  const tiles = projects.filter((p) => !isRow(p))

  return (
    <div className="flex flex-col gap-12">
      <div>
        <Link to="/projects" className="inline-flex items-center gap-1.5 py-1 text-sm font-semibold text-muted hover:text-ink">
          <ArrowLeft size="1rem" aria-hidden="true" />
          All projects
        </Link>
        <div className="mt-6 flex items-center gap-4">
          <ClientMark client={entry} size="h-16" />
          <h1 className="min-w-0 text-[clamp(1.875rem,9.5vw,2.4rem)] font-extrabold leading-[1.05] tracking-[-0.03em] sm:text-5xl">{entry.name}</h1>
        </div>
        <p className="mt-3 text-lg text-muted">{subtitleFor(entry)}</p>
        <p className="mt-2 max-w-[60ch]">{entry.about}</p>
      </div>

      <section aria-labelledby="collection-projects">
        <h2 id="collection-projects" className="text-2xl font-extrabold">
          {HEADINGS[kind](entry)}
        </h2>
        {rows.length > 0 && (
          <div data-testid="rows" className="mt-6 grid gap-6">
            {rows.map((p) => (
              <ProjectRow key={p.slug} project={p} />
            ))}
          </div>
        )}
        {tiles.length > 0 && (
          <div data-testid="tiles" className="mt-6 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {tiles.map((p) => (
              <ProjectTile key={p.slug} project={p} />
            ))}
          </div>
        )}
      </section>

      <ContactBand />
    </div>
  )
}
