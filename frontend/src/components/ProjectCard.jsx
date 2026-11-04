import { Link } from 'react-router-dom'
import { ArrowUpRight } from '@phosphor-icons/react'
import ResultHeadline from './ResultHeadline.jsx'
import ToolTags from './ToolTags.jsx'
import SavingNote from './SavingNote.jsx'
import { EXTERNAL, contextLine } from '../lib/format.js'

// Images have no stored size in the data; width/height give the browser a ratio to reserve until they load.
function ProjectImage({ project, className = '' }) {
  if (!project.image) return null
  return (
    <img
      src={project.image}
      alt={`${project.title} screenshot`}
      width="1600"
      height="900"
      loading="lazy"
      decoding="async"
      className={`block ${className}`}
    />
  )
}

// One block of the mini flow. The number lives in its own span so the label reads cleanly.
// Every node after the first draws a thin connector up to the one before it (echoes the hero canvas).
const CONNECTOR =
  "mt-3 before:absolute before:-top-3 before:left-6 before:h-3 before:w-px before:bg-line before:content-['']"

function FlowNode({ n, label, lit = false, children }) {
  return (
    <li
      className={`relative rounded-xl p-3.5 ring-1 ${n > 1 ? CONNECTOR : ''} ${
        lit ? 'bg-accent-soft ring-accent/30' : 'bg-paper ring-line'
      }`}
    >
      <p className="flex items-center gap-2 text-sm font-semibold text-ink">
        <span
          aria-hidden="true"
          className={`inline-flex h-5 w-5 items-center justify-center rounded-full font-display text-[11px] font-bold ${
            lit ? 'bg-accent text-accent-ink' : 'bg-ink text-paper'
          }`}
        >
          {n}
        </span>
        <span>{label}</span>
      </p>
      <div className="mt-1.5 text-[15px] leading-relaxed">{children}</div>
    </li>
  )
}

// Real and personal projects: a wide row whose whole surface opens the detail page (stretched title link).
export function ProjectRow({ project }) {
  const href = `/projects/${project.slug}`
  return (
    <article
      className={`lift group relative grid overflow-hidden rounded-[20px] bg-card ring-1 ring-line has-[a:focus-visible]:ring-2 has-[a:focus-visible]:ring-accent ${
        project.image ? 'md:grid-cols-[2fr_3fr]' : ''
      }`}
    >
      {project.image && (
        <div className="flex items-center justify-center px-5 pt-5 sm:px-6 sm:pt-6 md:pb-6 md:pr-0">
          <ProjectImage project={project} className="h-auto w-full rounded-xl bg-paper-2 ring-1 ring-line" />
        </div>
      )}
      <div className="flex min-w-0 flex-col gap-4 p-5 sm:p-6">
        <div>
          <h3 className="text-xl font-bold">
            <Link
              to={href}
              className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none group-hover:text-accent"
            >
              {project.title}
            </Link>
          </h3>
          <p className="mt-1 text-sm text-muted">{contextLine(project)}</p>
        </div>

        <ol className="flex flex-col">
          <FlowNode n={1} label="Problem">
            <p className="text-muted">{project.problem}</p>
          </FlowNode>
          {/* Not built yet: say "Building", never "Built" (honesty rule). */}
          <FlowNode n={2} label={project.kind === 'building' ? 'Building' : 'Built'}>
            <p className="text-muted">{project.built ?? project.building}</p>
          </FlowNode>
          {project.kind === 'launching' || project.kind === 'building' ? (
            <FlowNode n={3} label="Status">
              <p className="font-display text-lg font-bold text-ink">{project.status}</p>
            </FlowNode>
          ) : (
            <FlowNode n={3} label="Result" lit>
              <ResultHeadline result={project.result} className="text-lg" />
              <SavingNote saving={project.saving} revenue={project.revenue} className="mt-1" />
            </FlowNode>
          )}
        </ol>

        <ToolTags tools={project.tools} />
      </div>
    </article>
  )
}

function primaryExternalLink(project) {
  if (project.links?.demo) return { href: project.links.demo, label: 'Open demo' }
  if (project.links?.code) return { href: project.links.code, label: 'View code' }
  return null
}

// Demos and repos: a compact tile. They claim no results (spec §4), so there is no Result label here.
export function ProjectTile({ project }) {
  const link = primaryExternalLink(project)
  return (
    <article className="lift flex flex-col overflow-hidden rounded-[20px] bg-card ring-1 ring-line">
      {project.image && (
        <div className="aspect-[16/10] border-b border-line bg-paper-2">
          <ProjectImage project={project} className="h-full w-full object-cover object-top" />
        </div>
      )}
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div>
          <h3 className="text-lg font-bold">
            <Link
              to={`/projects/${project.slug}`}
              className="underline decoration-line underline-offset-4 hover:decoration-accent"
            >
              {project.title}
            </Link>
          </h3>
          <p className="mt-1 text-[15px] text-muted">{project.problem}</p>
        </div>
        <div>
          <p className="text-sm font-semibold text-ink">What it does</p>
          <p className="mt-0.5 text-[15px] leading-relaxed text-ink">{project.whatItDoes}</p>
        </div>
        <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-1">
          <ToolTags tools={project.tools} />
          {link && (
            <a
              href={link.href}
              {...EXTERNAL}
              className="inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold text-ink ring-1 ring-line hover:bg-paper"
            >
              {link.label}
              <ArrowUpRight size={14} aria-hidden="true" />
            </a>
          )}
        </div>
      </div>
    </article>
  )
}
