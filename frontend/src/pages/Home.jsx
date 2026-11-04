import { Link } from 'react-router-dom'
import { profile } from '../data/profile.js'
import { SERVICES, METHOD, HOME_RESULTS } from '../data/services.js'
import { useDocumentTitle } from '../lib/useDocumentTitle.js'
import WorkflowStrip from '../components/WorkflowStrip.jsx'
import ResultsLedger from '../components/ResultsLedger.jsx'
import ServiceCard from '../components/ServiceCard.jsx'
import MethodSteps from '../components/MethodSteps.jsx'
import ContactBand from '../components/ContactBand.jsx'
import DownloadCvButton from '../components/DownloadCvButton.jsx'

// "Less manual work. More reliable data." → two lines, the second in green.
const [line1, line2] = profile.headline.split(/(?<=\.)\s+/)

export default function Home() {
  useDocumentTitle()
  return (
    <div className="flex flex-col gap-20 sm:gap-24">
      {/* Hero */}
      <section className="flex flex-col gap-10">
        <div>
          <h1 className="text-[2.6rem] font-extrabold leading-[1.02] tracking-[-0.03em] sm:text-[3.75rem]">
            <span className="block">{line1}</span>{' '}
            <span className="block text-accent">{line2}</span>
          </h1>
          <p className="mt-5 max-w-[44ch] text-lg text-muted">{profile.tagline}</p>
          <div className="mt-8 flex flex-wrap gap-3">
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
        </div>
        <WorkflowStrip
          steps={['Waybill PDF', 'n8n extracts', 'Clean data', 'Excel ✓']}
          result="2 hrs → 5–10 min, every day"
        />
      </section>

      {/* Results */}
      <section aria-labelledby="results">
        <h2 id="results" className="text-3xl font-extrabold">What changed for the teams I built for</h2>
        <p className="mt-2 max-w-[60ch] text-muted">Before and after, from real work. Open any row for the full story.</p>
        <div className="mt-8">
          <ResultsLedger results={HOME_RESULTS} />
        </div>
      </section>

      {/* Services */}
      <section aria-labelledby="services">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 id="services" className="text-3xl font-extrabold">What I can build for you</h2>
          <Link to="/services" className="text-sm font-semibold text-accent underline underline-offset-4">
            All services
          </Link>
        </div>
        <div className="mt-6 grid divide-y divide-line sm:grid-cols-2 sm:divide-y-0 sm:[&>*:nth-child(-n+2)]:border-b sm:[&>*:nth-child(odd)]:border-r sm:[&>*]:border-line">
          {SERVICES.map((s) => (
            <ServiceCard key={s.id} service={s} />
          ))}
        </div>
      </section>

      {/* Method */}
      <section aria-labelledby="method">
        <h2 id="method" className="text-3xl font-extrabold">How I work</h2>
        <div className="mt-8">
          <MethodSteps steps={METHOD} />
        </div>
      </section>

      {/* About */}
      <section aria-labelledby="about-short" className="grid items-center gap-8 sm:grid-cols-[10rem_1fr]">
        <img
          src={profile.photo}
          alt="Jayvee Canlas"
          width="160"
          height="200"
          loading="lazy"
          className="h-48 w-40 rounded-[20px] object-cover object-top ring-1 ring-line"
        />
        <div>
          <h2 id="about-short" className="text-2xl font-extrabold">I'm Jayvee, a data and automation engineer.</h2>
          <p className="mt-2 max-w-[60ch] text-muted">
            Two years building the pipelines, dashboards and automations a distribution business ran on every day. Now
            I build the same kind of systems for teams that want their hours back.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <DownloadCvButton variant="outline" />
            <Link to="/about" className="inline-flex px-2 py-2.5 text-sm font-semibold text-accent underline underline-offset-4">
              More about me
            </Link>
          </div>
        </div>
      </section>

      <ContactBand />
    </div>
  )
}
