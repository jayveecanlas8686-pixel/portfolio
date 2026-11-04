import Reveal from '../components/motion/Reveal.jsx'
import { PROJECTS, PROJECT_GROUPS } from '../data/projects.js'
import { useDocumentTitle } from '../lib/useDocumentTitle.js'
import { ProjectRow, ProjectTile } from '../components/ProjectCard.jsx'
import ContactBand from '../components/ContactBand.jsx'
import ClientCard from '../components/ClientCard.jsx'
import { CLIENTS } from '../data/clients.js'

const isRow = (p) => p.kind === 'real' || p.kind === 'personal' || p.kind === 'launching' || p.kind === 'building'

export default function Projects() {
  useDocumentTitle('Projects')
  return (
    <div className="flex flex-col gap-16 sm:gap-20">
      <header>
        <h1 className="max-w-[22ch] text-[2.4rem] font-extrabold leading-[1.05] tracking-[-0.03em] sm:text-[3.25rem]">
          Projects that took work off people's plates.
        </h1>
        <p className="mt-4 max-w-[60ch] text-lg text-muted">
          Client work first, then my work at Brigada Distributions, then things I built on my own.
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
        // A group can mix full stories (wide rows) with demos/repos (compact tiles): rows first, then a tile grid.
        const rows = items.filter(isRow)
        const tiles = items.filter((p) => !isRow(p))
        return (
          <Reveal as="section" key={group.id} aria-labelledby={`group-${group.id}`}>
            <h2 id={`group-${group.id}`} className="text-3xl font-extrabold">
              {group.title}
            </h2>
            <p className="mt-2 max-w-[60ch] text-muted">{group.blurb}</p>
            {rows.length > 0 && (
              <div data-testid="rows" className="mt-8 grid gap-6">
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
          </Reveal>
        )
      })}

      <ContactBand />
    </div>
  )
}
