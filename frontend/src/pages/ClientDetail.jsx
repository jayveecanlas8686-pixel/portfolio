import { Link, useParams } from 'react-router-dom'
import { ArrowLeft } from '@phosphor-icons/react'
import { getClient } from '../data/clients.js'
import { getProject } from '../data/projects.js'
import { useDocumentTitle } from '../lib/useDocumentTitle.js'
import { ProjectRow } from '../components/ProjectCard.jsx'
import ContactBand from '../components/ContactBand.jsx'
import NotFound from './NotFound.jsx'

// Everything built for one client (user request: click a client to see the projects made for their company).
export default function ClientDetail() {
  const { id } = useParams()
  const client = getClient(id)
  useDocumentTitle(client?.name ?? 'Not found')
  if (!client) return <NotFound />
  const projects = client.projectSlugs.map(getProject).filter(Boolean)

  return (
    <div className="flex flex-col gap-12">
      <div>
        <Link to="/projects" className="inline-flex items-center gap-1.5 text-sm font-semibold text-muted hover:text-ink">
          <ArrowLeft size={16} aria-hidden="true" />
          All projects
        </Link>
        <h1 className="mt-6 text-[2.4rem] font-extrabold leading-[1.05] tracking-[-0.03em] sm:text-5xl">{client.name}</h1>
        <p className="mt-3 text-lg text-muted">{client.role ? `${client.contact}, ${client.role}` : client.contact}</p>
        <p className="mt-2 max-w-[60ch]">{client.about}</p>
      </div>

      <section aria-labelledby="client-projects">
        <h2 id="client-projects" className="text-2xl font-extrabold">
          What I built for {client.name}
        </h2>
        <div className="mt-6 grid gap-6">
          {projects.map((p) => (
            <ProjectRow key={p.slug} project={p} />
          ))}
        </div>
      </section>

      <ContactBand />
    </div>
  )
}
