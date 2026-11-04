import Reveal from '../components/motion/Reveal.jsx'
import { SERVICES, METHOD } from '../data/services.js'
import { useDocumentTitle } from '../lib/useDocumentTitle.js'
import ServiceCard from '../components/ServiceCard.jsx'
import MethodSteps from '../components/MethodSteps.jsx'
import ContactBand from '../components/ContactBand.jsx'

export default function Services() {
  useDocumentTitle('Services')
  return (
    <div className="flex flex-col gap-20 sm:gap-24">
      <section>
        <h1 className="text-[clamp(1.875rem,9.5vw,2.4rem)] font-extrabold leading-[1.05] tracking-[-0.03em] sm:text-[3.25rem]">
          What I can build for you.
        </h1>
        <p className="mt-4 max-w-[56ch] text-lg text-muted">
          Four kinds of work, each backed by something I've already built and run.
        </p>
        {/* Same 2×2 hairline grid as Home: dividers, not boxes (design doc). */}
        <div className="mt-8 grid divide-y divide-line sm:grid-cols-2 sm:divide-y-0 sm:[&>*:nth-child(-n+2)]:border-b sm:[&>*:nth-child(odd)]:border-r sm:[&>*]:border-line">
          {SERVICES.map((s) => (
            <ServiceCard key={s.id} service={s} showProofResults headingLevel={2} />
          ))}
        </div>
      </section>

      <Reveal as="section" aria-labelledby="method">
        <h2 id="method" className="text-3xl font-extrabold">How I work</h2>
        <div className="mt-8">
          <MethodSteps steps={METHOD} />
        </div>
      </Reveal>

      <ContactBand />
    </div>
  )
}
