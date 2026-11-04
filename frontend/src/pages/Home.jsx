import { Link } from 'react-router-dom'
import {
  ArrowUpRight,
  Briefcase,
  Certificate,
  ChartLineUp,
  EnvelopeSimple,
  FlowArrow,
  FolderSimple,
  Handshake,
  Robot,
} from '@phosphor-icons/react'
import { motion } from 'framer-motion'
import { fadeUp, stagger } from '../lib/motion.js'
import { profile } from '../data/profile.js'
import { SERVICES, HOME_RESULTS } from '../data/services.js'
import { PROJECTS, getProject } from '../data/projects.js'
import { CLIENTS } from '../data/clients.js'
import { ABOUT } from '../data/about.js'
import { useDocumentTitle } from '../lib/useDocumentTitle.js'
import ResultsLedger from '../components/ResultsLedger.jsx'
import DownloadCvButton from '../components/DownloadCvButton.jsx'
import ToolsMarquee from '../components/ToolsMarquee.jsx'

// "Less manual work. More reliable data." → first sentence ink, second green.
const [line1, line2] = profile.headline.split(/(?<=\.)\s+/)

// One icon per service, matching what the service does.
const SERVICE_ICONS = {
  'ai-assistants': Robot,
  dashboards: ChartLineUp,
  automation: FlowArrow,
  'ai-content': EnvelopeSimple,
}

function ServiceIcon({ id }) {
  const Icon = SERVICE_ICONS[id] ?? Briefcase
  return (
    <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-accent-soft text-accent">
      <Icon size={14} weight="bold" aria-hidden="true" data-service-icon={id} />
    </span>
  )
}

const AI_BUILDS = ['nest-brain', 'ai-email-builder', 'ai-sales-forecast', 'nest-audit-engine']
const CERT_PREVIEW = ABOUT.certifications.filter((c) => c.image).slice(3, 6)

// Home = one-screen bento hub (layout Jayvee shared 2026-11-04, his own content and palette).
// Laptops and up: everything fits without scrolling. Phones: cards stack and scroll.
function Card({ id, title, icon, action, children, className = '' }) {
  const Icon = icon
  return (
    <motion.section
      variants={fadeUp}
      aria-labelledby={id}
      className={`lift flex min-h-0 flex-col rounded-[18px] bg-card p-4 ring-1 ring-line ${className}`}
    >
      <div className="flex items-center justify-between gap-3">
        <h2 id={id} className="flex items-center gap-2.5 text-base font-bold">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-accent text-accent-ink">
            <Icon size={17} weight="fill" aria-hidden="true" />
          </span>
          {title}
        </h2>
        {action}
      </div>
      <div className="mt-3 min-h-0 flex-1">{children}</div>
    </motion.section>
  )
}

function CardLink({ to, children }) {
  return (
    <Link to={to} className="shrink-0 text-xs font-semibold text-accent underline underline-offset-4">
      {children}
    </Link>
  )
}

export default function Home() {
  useDocumentTitle()
  return (
    <motion.div className="flex flex-col gap-4 [@media(max-height:760px)]:gap-2.5" variants={stagger(0.07)} initial="hidden" animate="show">
      {/* Headline + call to action */}
      <motion.header variants={fadeUp} className="flex flex-wrap items-start justify-between gap-4 lg:flex-nowrap">
        <div>
          <h1 className="text-[2.2rem] font-extrabold leading-[1.05] tracking-[-0.03em] sm:text-4xl lg:text-[2rem] min-[1400px]:text-[2.75rem]">
            {line1} <span className="text-accent">{line2}</span>
          </h1>
          <p className="mt-2 text-base text-muted sm:text-lg [@media(max-height:760px)]:mt-1">{profile.tagline}</p>
        </div>
        <Link
          to="/contact"
          className="inline-flex shrink-0 items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-semibold text-paper hover:opacity-90"
        >
          Discuss a project
          <ArrowUpRight size={16} weight="bold" aria-hidden="true" />
        </Link>
      </motion.header>

      <motion.div variants={fadeUp}>
        <ToolsMarquee />
      </motion.div>

      {/* Bento */}
      <motion.div
        variants={stagger(0.07)}
        className="grid gap-3 rounded-[24px] bg-paper-2/70 p-3 ring-1 ring-line [@media(max-height:760px)]:gap-2 [@media(max-height:760px)]:p-2 md:grid-cols-2 lg:grid-cols-4 lg:grid-rows-[auto_auto]"
      >
        {/* Profile: tall card on the left */}
        <motion.section
          variants={fadeUp}
          aria-labelledby="home-about"
          className="lift flex min-h-0 flex-col items-center rounded-[18px] bg-card p-4 text-center ring-1 ring-line lg:row-span-2"
        >
          <h2 id="home-about" className="sr-only">
            About me
          </h2>
          {/* The photo takes all the height the card has to spare (user request 2026-11-04); fixed height when stacked. */}
          <div className="relative h-72 w-full overflow-hidden rounded-2xl bg-paper-2 ring-1 ring-line lg:h-auto lg:min-h-[120px] lg:flex-1">
            <img
              src={profile.photo}
              alt="Jayvee Canlas"
              width="480"
              height="672"
              className="absolute inset-0 h-full w-full object-cover object-[50%_18%]"
            />
          </div>
          <p className="mt-3 text-xs text-muted">Hi, I'm</p>
          <p className="font-display text-2xl font-extrabold leading-tight tracking-[-0.02em]">{profile.name}</p>
          <p className="mt-1 text-xs text-muted">Data engineer, automation & AI</p>
          <p className="mt-3 font-display text-[15px] font-bold leading-snug">
            {line1}
            <br />
            <span className="text-accent">{line2}</span>
          </p>
          <div className="flex w-full flex-col items-center gap-2 pt-3">
            <DownloadCvButton variant="outline" />
            <Link to="/about" className="text-xs font-semibold text-accent underline underline-offset-4">
              More about me
            </Link>
          </div>
        </motion.section>

        {/* Projects: before → after results */}
        <Card
          id="home-projects"
          title="Projects"
          icon={FolderSimple}
          className="md:col-span-2"
          action={<CardLink to="/projects">All {PROJECTS.length} projects</CardLink>}
        >
          <ResultsLedger results={HOME_RESULTS} compact />
        </Card>

        {/* AI builds */}
        <Card id="home-ai" title="AI builds" icon={Robot}>
          <p className="text-xs text-muted">AI that does real work inside a team.</p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {AI_BUILDS.map(getProject).map((p) => (
              <li key={p.slug}>
                <Link
                  to={`/projects/${p.slug}`}
                  className="inline-flex items-center gap-1.5 rounded-full bg-paper px-3 py-1.5 text-xs font-semibold text-ink ring-1 ring-line hover:ring-accent"
                >
                  <span
                    aria-hidden="true"
                    className={`h-1.5 w-1.5 rounded-full ${p.kind === 'launching' ? 'bg-muted/50' : 'bg-accent'}`}
                  />
                  {p.title}
                </Link>
              </li>
            ))}
          </ul>
        </Card>

        {/* Credentials */}
        <Card id="home-credentials" title="Credentials" icon={Certificate}>
          <p className="text-xs text-muted">
            {ABOUT.certifications.length} certifications: SQL Server, Python, Power BI, n8n.
          </p>
          <div className="mt-3 flex -space-x-3">
            {CERT_PREVIEW.map((c) => (
              <img
                key={c.title}
                src={c.image}
                alt=""
                width="64"
                height="46"
                loading="lazy"
                className="h-12 w-16 rounded-md object-cover ring-2 ring-card"
              />
            ))}
          </div>
          <Link to="/about" className="mt-3 inline-block text-xs font-semibold text-accent underline underline-offset-4">
            See certificates
          </Link>
        </Card>

        {/* Services: numbered list */}
        <Card id="home-services" title="Services" icon={Briefcase} action={<CardLink to="/services">All</CardLink>}>
          <ul className="divide-y divide-line">
            {SERVICES.map((s) => (
              <li key={s.id} data-testid="service">
                <Link
                  to={`/services#${s.id}`}
                  className="group flex min-w-0 items-center justify-between gap-2 py-1.5 text-[13px] font-semibold text-ink"
                >
                  <span className="flex min-w-0 items-center gap-2">
                    <ServiceIcon id={s.id} />
                    <span className="truncate group-hover:text-accent" title={s.title}>
                      {s.short ?? s.title}
                    </span>
                  </span>
                  <span className="font-mono text-[11px] text-muted">{s.number}</span>
                </Link>
              </li>
            ))}
          </ul>
        </Card>

        {/* Clients (no quotes yet, by Jayvee's choice) */}
        <Card id="home-clients" title="Clients" icon={Handshake}>
          <ul className="flex flex-col gap-1.5">
            {CLIENTS.map((c) => (
              <li key={c.id}>
                <Link
                  to={`/clients/${c.id}`}
                  className="group block rounded-lg bg-paper px-2.5 py-1.5 ring-1 ring-line hover:ring-accent"
                >
                  <span className="block text-[13px] font-bold text-ink group-hover:text-accent">{c.name}</span>
                  <span className="block text-[11px] text-muted">
                    {c.role ? `${c.contact}, ${c.role}` : c.contact}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Card>
      </motion.div>
    </motion.div>
  )
}
