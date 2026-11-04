import { Suspense, useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Sidebar from './Sidebar.jsx'
import MobileBar from './MobileBar.jsx'
import RouteErrorBoundary from './RouteErrorBoundary.jsx'

export default function Layout() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (!hash) window.scrollTo(0, 0)
  }, [pathname, hash])

  return (
    <div className="min-h-dvh bg-paper text-ink">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-card focus:px-4 focus:py-2"
      >
        Skip to content
      </a>
      <Sidebar />
      {/* Keyed by path: any navigation (name link, Back button, menu link) closes the menu. */}
      <MobileBar key={pathname} />
      <main id="main" className="lg:pl-[264px]">
        <div className="mx-auto max-w-5xl px-4 py-10 sm:px-8 lg:py-14">
          <RouteErrorBoundary resetKey={pathname}>
            <Suspense fallback={<div className="min-h-[60vh]" aria-busy="true" />}>
              <Outlet />
            </Suspense>
          </RouteErrorBoundary>
        </div>
      </main>
    </div>
  )
}
