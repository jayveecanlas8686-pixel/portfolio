import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowUpRight, Check } from '@phosphor-icons/react'
import { getProject } from '../data/projects.js'
import { useDocumentTitle } from '../lib/useDocumentTitle.js'
import ResultHeadline from '../components/ResultHeadline.jsx'
import ToolTags from '../components/ToolTags.jsx'
import SavingNote from '../components/SavingNote.jsx'
import WorkflowCard from '../components/WorkflowCard.jsx'
import { EXTERNAL, contextLine } from '../lib/format.js'
import NotFound from './NotFound.jsx'

const LINKS = [
  ['site', 'Open site'],
  ['video', 'Watch demo'],
  ['demo', 'Open demo'],
  ['code', 'View code'],
]

// Real/personal projects tell Problem → What I built → Result; demos and repos claim no result (spec §4).
function steps(project) {
  const problem = { label: 'Problem', body: <p className="text-muted">{project.problem}</p> }
  if (project.kind === 'demo' || project.kind === 'repo') {
    return [problem, { label: 'What it does', body: <p>{project.whatItDoes}</p> }]
  }
  if (project.kind === 'building') {
    // Approved and designed, not built yet: describe what is being built, never a result.
    return [
      problem,
      { label: 'What I’m building', body: <p>{project.building}</p> },
      {
        label: 'Status',
        body: (
          <>
            <p className="font-display text-xl font-bold text-ink">{project.status}</p>
            <SavingNote conversion={project.conversion} className="mt-2" />
          </>
        ),
      },
    ]
  }
  if (project.kind === 'launching') {
    // Built but not yet running for long enough to have results: say so instead of claiming one.
    return [
      problem,
      { label: 'What I built', body: <p>{project.built}</p> },
      {
        label: 'Status',
        body: (
          <>
            <p className="font-display text-xl font-bold text-ink">{project.status}</p>
            <SavingNote conversion={project.conversion} className="mt-2" />
          </>
        ),
      },
    ]
  }
  return [
    problem,
    { label: 'What I built', body: <p>{project.built}</p> },
    {
      label: 'Result',
      lit: true,
      body: (
        <>
          <ResultHeadline result={project.result} className="text-2xl" />
          {project.result?.detail && <p className="mt-1 text-muted">{project.result.detail}</p>}
          <SavingNote saving={project.saving} revenue={project.revenue} conversion={project.conversion} className="mt-2" />
        </>
      ),
    },
  ]
}

export default function ProjectDetail() {
  const { slug } = useParams()
  const project = getProject(slug)
  if (!project) return <NotFound />
  return <Detail project={project} />
}

function Detail({ project }) {
  useDocumentTitle(project.title)
  const links = LINKS.filter(([key]) => project.links?.[key])

  return (
    <article className="flex flex-col gap-10">
      <div>
        <Link
          to="/projects"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent underline underline-offset-4"
        >
          <ArrowLeft size={14} aria-hidden="true" />
          All projects
        </Link>
        <h1 className="mt-6 text-[2.4rem] font-extrabold leading-[1.05] tracking-[-0.03em] sm:text-[3.25rem]">
          {project.title}
        </h1>
        <p className="mt-3 text-lg text-muted">{contextLine(project)}</p>
      </div>

      {project.image && (
        <img
          src={project.image}
          alt={`${project.title} screenshot`}
          width="1600"
          height="900"
          className="h-auto w-full rounded-[20px] bg-card ring-1 ring-line"
        />
      )}
      {!project.image && project.flow && (
        <div className="max-w-3xl">
          <WorkflowCard title={project.title} steps={project.flow} />
        </div>
      )}

      <ol className="relative flex max-w-[70ch] flex-col gap-8">
        <span aria-hidden="true" className="absolute bottom-4 left-[15px] top-4 w-px bg-line" />
        {steps(project).map((s, i) => (
          <li key={s.label} className="relative pl-12">
            <span
              aria-hidden="true"
              className={`absolute left-0 top-0 inline-flex h-8 w-8 items-center justify-center rounded-full font-display text-sm font-bold ${
                s.lit ? 'bg-accent text-accent-ink' : 'bg-ink text-paper'
              }`}
            >
              {i + 1}
            </span>
            <h2 className="pt-1 text-lg font-bold">{s.label}</h2>
            <div className={`mt-2 text-[17px] leading-relaxed ${s.lit ? 'rounded-xl bg-accent-soft p-4' : ''}`}>
              {s.body}
            </div>
          </li>
        ))}
      </ol>

      {project.highlights?.length > 0 && (
        <section aria-labelledby="highlights" className="max-w-[70ch]">
          <h2 id="highlights" className="text-xl font-bold">
            Highlights
          </h2>
          <ul className="mt-4 flex flex-col gap-2.5">
            {project.highlights.map((h) => (
              <li key={h} className="flex gap-2.5">
                <Check size={18} weight="bold" aria-hidden="true" className="mt-0.5 shrink-0 text-accent" />
                <span>{h}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section aria-labelledby="tools">
        <h2 id="tools" className="text-xl font-bold">
          Tools
        </h2>
        <div className="mt-3">
          <ToolTags tools={project.tools} />
        </div>
      </section>

      {links.length > 0 && (
        <div className="flex flex-wrap gap-3">
          {links.map(([key, label], i) => (
            <a
              key={key}
              href={project.links[key]}
              {...EXTERNAL}
              className={`inline-flex items-center gap-1.5 rounded-full px-5 py-2.5 text-sm font-semibold ${
                i === 0 ? 'bg-accent text-accent-ink hover:opacity-90' : 'text-ink ring-1 ring-line hover:bg-card'
              }`}
            >
              {label}
              <ArrowUpRight size={14} aria-hidden="true" />
            </a>
          ))}
        </div>
      )}
    </article>
  )
}
