import { useState } from 'react'
import { GithubLogo, LinkedinLogo, FacebookLogo, EnvelopeSimple } from '@phosphor-icons/react'
import { profile } from '../data/profile.js'
import { useDocumentTitle } from '../lib/useDocumentTitle.js'

const ICONS = { GitHub: GithubLogo, LinkedIn: LinkedinLogo, Facebook: FacebookLogo }

// No form backend (spec §6): the form opens the visitor's own mail app, pre-filled.
export function buildMailto({ name, message, email }) {
  const subject = encodeURIComponent(`Project inquiry from ${name}`)
  const body = encodeURIComponent(message)
  return `mailto:${email}?subject=${subject}&body=${body}`
}

const FIELD =
  'mt-2 block w-full rounded-xl bg-card px-4 py-3 text-[16px] text-ink ring-1 ring-line placeholder:text-muted/70 focus:ring-2 focus:ring-accent'

export default function Contact() {
  useDocumentTitle('Contact')
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    window.location.href = buildMailto({ name: name.trim(), message: message.trim(), email: profile.email })
  }

  return (
    <div className="flex flex-col gap-12">
      <section>
        <h1 className="max-w-[18ch] text-[2.4rem] font-extrabold leading-[1.05] tracking-[-0.03em] sm:text-[3.25rem]">
          Tell me what your team does by hand.
        </h1>
        <p className="mt-4 max-w-[56ch] text-lg text-muted">
          A few lines is enough. I'll reply with what could run on its own and roughly what it would save.
        </p>
      </section>

      <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-14">
        <form onSubmit={handleSubmit} className="max-w-[40rem] space-y-6" aria-label="Project inquiry">
          <div>
            <label htmlFor="contact-name" className="font-semibold">
              Your name
            </label>
            <input
              id="contact-name"
              name="name"
              type="text"
              autoComplete="name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={FIELD}
            />
          </div>
          <div>
            <label htmlFor="contact-message" className="font-semibold">
              What do you need?
            </label>
            <textarea
              id="contact-message"
              name="message"
              rows={6}
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="For example: we copy order details from PDFs into Excel every morning."
              className={`${FIELD} resize-y`}
            />
          </div>
          <div>
            <button
              type="submit"
              className="inline-flex rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-ink hover:opacity-90"
            >
              Send email
            </button>
            <p className="mt-3 text-sm text-muted">This opens your email app with the message filled in.</p>
          </div>
        </form>

        <aside aria-labelledby="contact-direct" className="lg:border-l lg:border-line lg:pl-10">
          <h2 id="contact-direct" className="text-xl font-bold">Or write to me directly</h2>
          <a
            href={`mailto:${profile.email}`}
            className="mt-3 inline-flex items-center gap-2 font-semibold [overflow-wrap:anywhere] text-accent underline underline-offset-4"
          >
            <EnvelopeSimple size={18} weight="bold" aria-hidden="true" className="shrink-0" />
            {profile.email}
          </a>
          <h2 className="mt-8 text-xl font-bold">Elsewhere</h2>
          <ul className="mt-3 space-y-2.5">
            {profile.socials.map((s) => {
              const Icon = ICONS[s.label]
              return (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 font-semibold text-ink underline decoration-line underline-offset-4 hover:decoration-accent"
                  >
                    {Icon && <Icon size={18} aria-hidden="true" className="shrink-0 text-muted" />}
                    {s.label}
                  </a>
                </li>
              )
            })}
          </ul>
        </aside>
      </div>
    </div>
  )
}
