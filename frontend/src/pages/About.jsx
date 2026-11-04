import Reveal from '../components/motion/Reveal.jsx'
import { ABOUT } from '../data/about.js'
import { profile } from '../data/profile.js'
import { useDocumentTitle } from '../lib/useDocumentTitle.js'
import DownloadCvButton from '../components/DownloadCvButton.jsx'
import ToolTags from '../components/ToolTags.jsx'

// A plain vertical timeline: a hairline on the left, a small dot per entry.
function Timeline({ items }) {
  return (
    <ol className="relative space-y-7 border-l border-line pl-6">
      {items.map((item) => (
        <li key={`${item.title}-${item.period}`} className="relative">
          <span aria-hidden="true" className="absolute -left-[29px] top-1.5 h-2.5 w-2.5 rounded-full bg-paper ring-2 ring-line" />
          <p className="text-sm text-muted tabular-nums">{item.period}</p>
          <p className="mt-1 font-semibold">{item.title}</p>
          <p className="text-[15px] text-muted">{item.place}</p>
        </li>
      ))}
    </ol>
  )
}

const experience = ABOUT.experience.map((e) => ({ title: e.role, place: e.company, period: e.period }))
const education = ABOUT.education.map((e) => ({ title: e.degree, place: e.school, period: e.period }))

export default function About() {
  useDocumentTitle('About')
  return (
    <div className="flex flex-col gap-20 sm:gap-24">
      {/* Intro */}
      <section className="grid items-start gap-8 sm:grid-cols-[13rem_1fr] sm:gap-10">
        <img
          src={profile.photo}
          alt="Jayvee Canlas"
          width="208"
          height="260"
          className="h-[13rem] w-[10.5rem] rounded-[20px] object-cover object-top ring-1 ring-line sm:h-[16.25rem] sm:w-[13rem]"
        />
        <div>
          <h1 className="text-[2.4rem] font-extrabold leading-[1.05] tracking-[-0.03em] sm:text-[3.25rem]">
            Hi, I'm Jayvee.
          </h1>
          <div className="mt-5 max-w-[62ch] space-y-4 text-[17px] leading-relaxed">
            {ABOUT.story.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <div className="mt-7">
            <DownloadCvButton />
          </div>
        </div>
      </section>

      {/* Experience and education */}
      <div className="grid gap-14 md:grid-cols-2 md:gap-10">
        <section aria-labelledby="experience">
          <h2 id="experience" className="text-3xl font-extrabold">Experience</h2>
          <div className="mt-7">
            <Timeline items={experience} />
          </div>
        </section>
        <section aria-labelledby="education">
          <h2 id="education" className="text-3xl font-extrabold">Education</h2>
          <div className="mt-7">
            <Timeline items={education} />
          </div>
        </section>
      </div>

      {/* Certifications */}
      <Reveal as="section" aria-labelledby="certifications">
        <h2 id="certifications" className="text-3xl font-extrabold">Certifications</h2>
        <p className="mt-2 max-w-[60ch] text-muted">Open any certificate to see the original.</p>
        <ul className="mt-8 grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-x-6 sm:gap-y-9 lg:grid-cols-3">
          {ABOUT.certifications.map((c) => (
            <li key={c.title}>
              <a
                href={c.pdf || c.image}
                target="_blank"
                rel="noopener noreferrer"
                className="block overflow-hidden rounded-[12px] bg-card ring-1 ring-line hover:ring-accent"
              >
                <img
                  src={c.image}
                  alt={`${c.title} certificate (opens in a new tab)`}
                  width="400"
                  height="283"
                  loading="lazy"
                  className="aspect-[1.414] w-full object-cover object-top"
                />
              </a>
              <p className="mt-3 font-semibold leading-snug">{c.title}</p>
              <p className="mt-0.5 text-sm text-muted">
                {c.issuer}
                {c.date && `, ${c.date}`}
              </p>
            </li>
          ))}
        </ul>
      </Reveal>

      {/* Toolkit */}
      <Reveal as="section" aria-labelledby="toolkit">
        <h2 id="toolkit" className="text-3xl font-extrabold">Toolkit</h2>
        <div className="mt-7 grid gap-8 md:grid-cols-3">
          {ABOUT.toolkit.map((g) => (
            <div key={g.group}>
              <h3 className="mb-3 text-lg font-bold">{g.group}</h3>
              <ToolTags tools={g.tools} showNames label={g.group} />
            </div>
          ))}
        </div>
      </Reveal>
    </div>
  )
}
