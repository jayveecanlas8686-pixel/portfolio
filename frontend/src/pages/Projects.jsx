import Reveal from '../components/motion/Reveal.jsx'
import { PROJECTS, PROJECT_GROUPS } from '../data/projects.js'
import { useDocumentTitle } from '../lib/useDocumentTitle.js'
import { ProjectRow, ProjectTile } from '../components/ProjectCard.jsx'
import ContactBand from '../components/ContactBand.jsx'
import ClientCard from '../components/ClientCard.jsx'
import { CLIENTS } from '../data/clients.js'

const isRow = (p) => p.kind === 'real' || p.kind === 'personal' || p.kind === 'launching'

export default function Projects() {
  useDocumentTitle('Projects')
  return (
    <div className="flex flex-col gap-16 sm:gap-20">
      <header>
        <h1 className="max-w-[22ch] text-[2.4rem] font-extrabold leading-[1.05] tracking-[-0.03em] sm:text-[3.25rem]">
          Projects that took work off people's plates.
        </h1>
        <p className="mt-4 max-w-[60ch] text-lg text-muted">
          Client work first, then automations with what changed for the team, then demos and code you can open yourself.
        </p>
      </header>

      <Reveal as="section" aria-labelledby="clients">
        <h2 id="clients" className="text-3xl font-extrabold">
          Clients
        </h2>
        <p className="mt-2 max-w-[60ch] text-muted">Open a client to see everything I built for them.</p>
        <div className="mt-6 grid gap-5 md:grid-cols-2">
          {CLIENTS.map((c) => (
            <ClientCard key={c.id} client={c} />
          ))}
        </div>
      </Reveal>

      {PROJECT_GROUPS.map((group) => {
        const items = PROJECTS.filter((p) => p.group === group.id)
        if (!items.length) return null
        const rows = items.every(isRow)
        return (
          <Reveal as="section" key={group.id} aria-labelledby={`group-${group.id}`}>
            <h2 id={`group-${group.id}`} className="text-3xl font-extrabold">
              {group.title}
            </h2>
            <p className="mt-2 max-w-[60ch] text-muted">{group.blurb}</p>
            <div className={`mt-8 grid gap-6 ${rows ? '' : 'sm:grid-cols-2 xl:grid-cols-3'}`}>
              {items.map((p) =>
                isRow(p) ? <ProjectRow key={p.slug} project={p} /> : <ProjectTile key={p.slug} project={p} />,
              )}
            </div>
          </Reveal>
        )
      })}

      <ContactBand />
    </div>
  )
}
