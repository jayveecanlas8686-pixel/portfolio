import { Link } from 'react-router-dom'

export default function ContactBand() {
  return (
    <section aria-labelledby="contact-band" className="rounded-[1.25rem] bg-paper-2 px-6 py-10 sm:px-10">
      <h2 id="contact-band" className="max-w-[22ch] text-3xl font-extrabold leading-tight">
        Have work your team still does by hand?
      </h2>
      <p className="mt-3 max-w-[52ch] text-muted">
        Tell me what it is. I'll tell you what can run on its own, and roughly what it would save.
      </p>
      <Link
        to="/contact"
        className="mt-6 inline-flex rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-accent-ink hover:opacity-90"
      >
        Discuss a project
      </Link>
    </section>
  )
}
