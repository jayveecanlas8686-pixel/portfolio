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
      <Icon size="0.875rem" weight="bold" aria-hidden="true" data-service-icon={id} />
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
      className={`lift flex min-h-0 flex-col rounded-[1.125rem] bg-card p-4 ring-1 ring-line ${className}`}
    >
      <div className="flex items-center justify-between gap-3">
        <h2 id={id} className="flex items-center gap-2.5 text-base font-bold">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-accent text-accent-ink">
            <Icon size="1.0625rem" weight="fill" aria-hidden="true" />
          </span>
          {title}
        </h2>
        {action}
      </div>
      <div className="mt-3 flex min-h-0 flex-1 flex-col">{children}</div>
    </motion.section>
  )
}

function CardLink({ to, children }) {
  return (
    <Link to={to} className="shrink-0 py-1.5 text-xs font-semibold text-accent underline underline-offset-4 xl:py-0">
      {children}
    </Link>
  )
}

export default function Home() {
  useDocumentTitle()
  return (
    <motion.div className="flex flex-col gap-4 [@media(max-height:760px)]:gap-2.5 xl:min-h-[min(100dvh_-_3rem,60rem)]" variants={stagger(0.07)} initial="hidden" animate="show">
      {/* Headline + call to action */}
      <motion.header variants={fadeUp} className="flex flex-wrap items-start justify-between gap-4 xl:flex-nowrap">
        <div>
          <h1 className="text-[clamp(1.75rem,9vw,2.2rem)] font-extrabold leading-[1.05] tracking-[-0.03em] sm:text-4xl xl:text-[2rem] min-[1400px]:text-[2.75rem]">
            <span className="inline-block">{line1}</span> <span className="inline-block text-accent">{line2}</span>
          </h1>
          <p className="mt-2 text-base text-muted sm:text-lg [@media(max-height:760px)]:mt-1">{profile.tagline}</p>
        </div>
        <Link
          to="/contact"
          className="inline-flex shrink-0 items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-semibold text-paper hover:opacity-90"
        >
          Discuss a project
          <ArrowUpRight size="1rem" weight="bold" aria-hidden="true" />
        </Link>
      </motion.header>

      <motion.div variants={fadeUp}>
        <ToolsMarquee />
      </motion.div>

      {/* Bento */}
      {/* Phones 1 column, tablets 2 (dense: AI builds and Credentials fill the space beside the photo),
          4 only from xl where they fit; there the two rows share whatever height the screen has spare. */}
      <motion.div
        data-testid="bento"
        variants={stagger(0.07)}
        className="grid grid-cols-1 gap-3 rounded-[1.5rem] bg-paper-2/70 p-3 ring-1 ring-line [@media(max-height:760px)]:gap-2 [@media(max-height:760px)]:p-2 md:grid-cols-2 md:grid-flow-dense xl:flex-1 xl:grid-cols-4 xl:grid-rows-[minmax(max-content,1fr)_minmax(max-content,1fr)] [@media(max-height:800px)]:xl:grid-rows-[auto_auto]"
      >
        {/* Profile: tall card on the left */}
        <motion.section
          variants={fadeUp}
          aria-labelledby="home-about"
          className="lift flex min-h-0 flex-col items-center rounded-[1.125rem] bg-card p-4 text-center ring-1 ring-line md:row-span-2"
        >
          <h2 id="home-about" className="sr-only">
            About me
          </h2>
          {/* The photo takes all the height the card has to spare (user request 2026-11-04); fixed height when stacked. */}
          <div className="relative h-72 w-full overflow-hidden rounded-2xl bg-paper-2 ring-1 ring-line md:h-auto md:min-h-[14rem] md:flex-1 xl:min-h-[7.5rem]">
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
          <p className="mt-3 font-display text-[0.9375rem] font-bold leading-snug">
            {line1}
            <br />
            <span className="text-accent">{line2}</span>
          </p>
          <div className="flex w-full flex-col items-center gap-2 pt-3">
            <DownloadCvButton variant="outline" />
            <Link to="/about" className="py-1.5 text-xs font-semibold text-accent underline underline-offset-4 xl:py-0">
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
                className="h-12 w-16 rounded-md object-cover ring-2 ring-card [@media(min-height:900px)]:xl:h-[3.75rem] [@media(min-height:900px)]:xl:w-20"
              />
            ))}
          </div>
          <Link to="/about" className="mt-2 inline-block self-start py-1.5 text-xs font-semibold text-accent underline underline-offset-4 xl:mt-3 xl:py-0">
            See certificates
          </Link>
        </Card>

        {/* Services: numbered list */}
        <Card id="home-services" title="Services" icon={Briefcase} action={<CardLink to="/services">All</CardLink>}>
          <ul className="flex flex-1 flex-col divide-y divide-line">
            {SERVICES.map((s) => (
              <li key={s.id} data-testid="service" className="flex flex-1 items-center">
                <Link
                  to={`/services#${s.id}`}
                  className="group flex w-full min-w-0 items-center justify-between gap-2 py-2.5 text-[0.8125rem] font-semibold text-ink xl:py-1.5"
                >
                  <span className="flex min-w-0 items-center gap-2">
                    <ServiceIcon id={s.id} />
                    <span className="truncate group-hover:text-accent" title={s.title}>
                      {s.short ?? s.title}
                    </span>
                  </span>
                  <span className="font-mono text-[0.6875rem] text-muted">{s.number}</span>
                </Link>
              </li>
            ))}
          </ul>
        </Card>

        {/* Clients (no quotes yet, by Jayvee's choice) */}
        <Card id="home-clients" title="Clients" icon={Handshake}>
          <ul className="flex flex-1 flex-col gap-1.5">
            {CLIENTS.map((c) => (
              <li key={c.id} className="flex flex-1">
                <Link
                  to={`/clients/${c.id}`}
                  className="group flex w-full flex-col justify-center rounded-lg bg-paper px-2.5 py-1.5 ring-1 ring-line hover:ring-accent"
                >
                  <span className="block text-[0.8125rem] font-bold text-ink group-hover:text-accent">{c.name}</span>
                  <span className="block text-[0.6875rem] text-muted">
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
