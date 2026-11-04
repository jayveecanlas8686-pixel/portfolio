import { Component } from 'react'

// A page chunk that fails to load (stale tab after a deploy, offline) must not blank the whole site.
export default class RouteErrorBoundary extends Component {
  state = { failed: false }

  static getDerivedStateFromError() {
    return { failed: true }
  }

  componentDidUpdate(prevProps) {
    // Navigating to another page gives it a fresh chance to load.
    if (this.state.failed && prevProps.resetKey !== this.props.resetKey) this.setState({ failed: false })
  }

  render() {
    if (!this.state.failed) return this.props.children
    return (
      <section className="py-16">
        <h1 className="text-3xl font-extrabold">This page couldn't load</h1>
        <p className="mt-3 max-w-[52ch] text-muted">
          The site may have been updated since you opened it, or the connection dropped. Reloading gets the latest version.
        </p>
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="mt-6 inline-flex rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-accent-ink hover:opacity-90"
        >
          Reload page
        </button>
      </section>
    )
  }
}
