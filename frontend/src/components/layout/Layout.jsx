import { Suspense, useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { EASE } from '../../lib/motion.js'
import Sidebar from './Sidebar.jsx'
import WorkflowBackdrop from '../WorkflowBackdrop.jsx'
import MobileBar from './MobileBar.jsx'
import RouteErrorBoundary from './RouteErrorBoundary.jsx'

export default function Layout() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0)
      return
    }
    // Pages load on demand, so the #section may appear a moment later: try for up to ~1s.
    let tries = 0
    let timer
    const seek = () => {
      const el = document.getElementById(decodeURIComponent(hash.slice(1)))
      if (el) el.scrollIntoView({ block: 'start' })
      else if (tries++ < 20) timer = setTimeout(seek, 50)
    }
    seek()
    return () => clearTimeout(timer)
  }, [pathname, hash])

  return (
    <div className="min-h-dvh text-ink">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-card focus:px-4 focus:py-2"
      >
        Skip to content
      </a>
      <WorkflowBackdrop />
      <Sidebar />
      {/* Keyed by path: any navigation (name link, Back button, menu link) closes the menu. */}
      <MobileBar key={pathname} />
      <main id="main" className="relative z-10 lg:pl-[264px]">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-8 lg:py-6">
          <RouteErrorBoundary resetKey={pathname}>
            <Suspense fallback={<div className="min-h-[60vh]" aria-busy="true" />}>
              {/* Page transition: each page fades up in, 0.45s. */}
              <motion.div
                key={pathname}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, ease: EASE }}
              >
                <Outlet />
              </motion.div>
            </Suspense>
          </RouteErrorBoundary>
        </div>
      </main>
    </div>
  )
}
