import { Link } from 'react-router-dom'
import { useDocumentTitle } from '../lib/useDocumentTitle.js'

export default function NotFound() {
  useDocumentTitle('Not found')
  return (
    <section className="py-16">
      <p className="font-mono text-xs uppercase tracking-widest text-accent">404</p>
      <h1 className="mt-2 text-4xl font-extrabold">Page not found</h1>
      <p className="mt-3 text-muted">That page doesn't exist, or it moved.</p>
      <Link to="/" className="mt-6 inline-block rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-accent-ink">
        Back to home
      </Link>
    </section>
  )
}
