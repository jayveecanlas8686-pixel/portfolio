import { Link } from 'react-router-dom'
import { ArrowUpRight } from '@phosphor-icons/react'
import { motion } from 'framer-motion'
import { fadeUp, stagger } from '../lib/motion.js'
import { profile } from '../data/profile.js'
import { SERVICES, HOME_RESULTS } from '../data/services.js'
import { PROJECTS } from '../data/projects.js'
import { CLIENTS } from '../data/clients.js'
import { useDocumentTitle } from '../lib/useDocumentTitle.js'
import WorkflowStrip from '../components/WorkflowStrip.jsx'
import ResultsLedger from '../components/ResultsLedger.jsx'
import DownloadCvButton from '../components/DownloadCvButton.jsx'

// "Less manual work. More reliable data." → two lines, the second in green.
const [line1, line2] = profile.headline.split(/(?<=\.)\s+/)

// Home is a one-screen hub (user request 2026-11-04): on laptops and up everything fits without
// scrolling; each tile leads to its full page. Phones stack the tiles and scroll.
function Tile({ id, title, action, children, className = '' }) {
  return (
    <motion.section
      variants={fadeUp}
      aria-labelledby={id}
      className={`lift flex flex-col rounded-[20px] bg-card p-5 ring-1 ring-line ${className}`}
    >
      <div className="flex items-baseline justify-between gap-3">
        <h2 id={id} className="text-lg font-bold">
          {title}
        </h2>
        {action}
      </div>
      <div className="mt-4">{children}</div>
    </motion.section>
  )
}

function TileLink({ to, children }) {
  return (
    <Link to={to} className="shrink-0 text-sm font-semibold text-accent underline underline-offset-4">
      {children}
    </Link>
  )
}

export default function Home() {
  useDocumentTitle()
  return (
    // One load sequence: headline, then the workflow, then the tiles, 80ms apart.
    <motion.div className="flex flex-col gap-6 lg:gap-5" variants={stagger(0.08)} initial="hidden" animate="show">
      {/* Hero */}
      <section className="grid items-center gap-6 xl:grid-cols-[1fr_minmax(0,27rem)]">
        <motion.div variants={fadeUp}>
          <h1 className="text-[2.4rem] font-extrabold leading-[1.02] tracking-[-0.03em] sm:text-5xl">
            <span className="block">{line1}</span>{' '}
            <span className="block text-accent">{line2}</span>
          </h1>
          <p className="mt-4 max-w-[46ch] text-base text-muted sm:text-lg">{profile.tagline}</p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              to="/contact"
              className="inline-flex rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-accent-ink hover:opacity-90"
            >
              Discuss a project
            </Link>
            <Link
              to="/projects"
              className="inline-flex rounded-full px-5 py-2.5 text-sm font-semibold text-ink ring-1 ring-line hover:bg-card"
            >
              See results
            </Link>
          </div>
        </motion.div>
        <motion.div variants={fadeUp}>
          <WorkflowStrip
          compact
          steps={['Waybill PDF', 'n8n extracts', 'Clean data', 'Excel ✓']}
            result="2 hrs → 5–10 min, every day"
          />
        </motion.div>
      </section>

      {/* Hub tiles */}
      <motion.div className="grid items-start gap-5 lg:grid-cols-[1.1fr_1fr_1fr]" variants={stagger(0.08)}>
        <Tile id="home-services" title="Services" action={<TileLink to="/services">All services</TileLink>}>
          <ul className="divide-y divide-line">
            {SERVICES.map((s) => (
              <li key={s.id} data-testid="service">
                <Link to={`/services#${s.id}`} className="group flex items-start justify-between gap-3 py-2.5 first:pt-0">
                  <span className="min-w-0">
                    <span className="block font-display text-[15px] font-bold text-ink group-hover:text-accent">
                      {s.title}
                    </span>
                    <span className="mt-0.5 block text-sm leading-snug text-muted">{s.outcome}</span>
                  </span>
                  <ArrowUpRight size={16} aria-hidden="true" className="mt-0.5 shrink-0 text-muted group-hover:text-accent" />
                </Link>
              </li>
            ))}
          </ul>
        </Tile>

        <Tile
          id="home-projects"
          title="Projects"
          action={<TileLink to="/projects">All {PROJECTS.length} projects</TileLink>}
        >
          <p className="mb-3 text-sm text-muted">
            Built for{' '}
            {CLIENTS.map((c, i) => (
              <span key={c.id}>
                {i > 0 && (i === CLIENTS.length - 1 ? ' and ' : ', ')}
                <Link to={`/clients/${c.id}`} className="font-semibold text-ink underline decoration-line underline-offset-4 hover:decoration-accent">
                  {c.name}
                </Link>
              </span>
            ))}
            .
          </p>
          <ResultsLedger results={HOME_RESULTS} compact />
        </Tile>

        <Tile id="home-about" title="About me">
          <div className="flex items-start gap-4">
            <img
              src={profile.photo}
              alt="Jayvee Canlas"
              width="72"
              height="96"
              className="h-24 w-[72px] shrink-0 rounded-xl object-cover object-top ring-1 ring-line"
            />
            <div className="min-w-0">
              <p className="font-display text-[15px] font-bold leading-snug">I'm Jayvee, a data and automation engineer.</p>
              <p className="mt-1.5 text-sm leading-snug text-muted">
                Two years building the pipelines, dashboards and automations a distribution business ran on every day.
              </p>
            </div>
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <DownloadCvButton variant="outline" />
            <Link to="/about" className="text-sm font-semibold text-accent underline underline-offset-4">
              More about me
            </Link>
          </div>
        </Tile>
      </motion.div>
    </motion.div>
  )
}
