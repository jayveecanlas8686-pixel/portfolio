import Reveal from '../components/motion/Reveal.jsx'
import { useDocumentTitle } from '../lib/useDocumentTitle.js'
import ContactBand from '../components/ContactBand.jsx'
import ClientCard from '../components/ClientCard.jsx'
import { CLIENTS, EMPLOYERS, PERSONAL } from '../data/clients.js'

// Three categories of cards (user request 2026-11-04). Each card opens a page with its projects.
const CATEGORIES = [
  { id: 'clients', title: 'Clients', blurb: 'Open a client to see everything I built for them.', entries: CLIENTS },
  { id: 'employment', title: 'Employment', blurb: 'Pipelines, reports and automations a business ran on every day.', entries: EMPLOYERS },
  { id: 'personal', title: 'Personal', blurb: 'Things I built on my own.', entries: PERSONAL },
]

export default function Projects() {
  useDocumentTitle('Projects')
  return (
    <div className="flex flex-col gap-14 sm:gap-16">
      <header>
        <h1 className="max-w-[22ch] text-[2.4rem] font-extrabold leading-[1.05] tracking-[-0.03em] sm:text-[3.25rem]">
          Projects that took work off people's plates.
        </h1>
        <p className="mt-4 max-w-[60ch] text-lg text-muted">
          Grouped by who the work was for. Open a card to see the projects inside.
        </p>
      </header>

      {CATEGORIES.map((cat) => (
        <Reveal as="section" key={cat.id} aria-labelledby={`cat-${cat.id}`}>
          <h2 id={`cat-${cat.id}`} className="text-3xl font-extrabold">
            {cat.title}
          </h2>
          <p className="mt-2 max-w-[60ch] text-muted">{cat.blurb}</p>
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            {cat.entries.map((entry) => (
              <ClientCard key={entry.id} client={entry} />
            ))}
          </div>
        </Reveal>
      ))}

      <ContactBand />
    </div>
  )
}
