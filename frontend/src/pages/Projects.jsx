import Reveal from '../components/motion/Reveal.jsx'
import { PROJECTS, PROJECT_GROUPS } from '../data/projects.js'
import { useDocumentTitle } from '../lib/useDocumentTitle.js'
import { ProjectRow, ProjectTile } from '../components/ProjectCard.jsx'
import ContactBand from '../components/ContactBand.jsx'

const isRow = (p) => p.kind === 'real' || p.kind === 'personal'

export default function Projects() {
  useDocumentTitle('Projects')
  return (
    <div className="flex flex-col gap-16 sm:gap-20">
      <header>
        <h1 className="max-w-[22ch] text-[2.4rem] font-extrabold leading-[1.05] tracking-[-0.03em] sm:text-[3.25rem]">
          Projects that took work off people's plates.
        </h1>
        <p className="mt-4 max-w-[60ch] text-lg text-muted">
          Real automations first, with what changed for the team. Then demos and code you can open yourself.
        </p>
      </header>

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
