// Final-review fix pass: each test reproduces one finding before its fix.
import { vi } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { AppRoutes } from './App.jsx'
import RouteErrorBoundary from './components/layout/RouteErrorBoundary.jsx'
import { HOME_RESULTS } from './data/services.js'
import { getProject } from './data/projects.js'

function renderAt(path) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <AppRoutes />
    </MemoryRouter>,
  )
}

describe('final review fixes', () => {
  beforeEach(() => {
    delete document.documentElement.dataset.theme
  })

  it('theme survives closing and reopening the mobile menu when storage is blocked', async () => {
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => { throw new Error('blocked') })
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => { throw new Error('blocked') })
    const user = userEvent.setup()
    renderAt('/')
    await user.click(screen.getByRole('button', { name: /menu/i }))
    await user.click(within(screen.getByRole('dialog')).getByRole('button', { name: 'Switch to dark mode' }))
    expect(document.documentElement.dataset.theme).toBe('dark')
    await user.click(within(screen.getByRole('dialog')).getByRole('link', { name: 'Contact' }))
    await user.click(screen.getByRole('button', { name: /menu/i }))
    expect(document.documentElement.dataset.theme).toBe('dark')
  })

  it('every theme toggle agrees after one is used', async () => {
    const user = userEvent.setup()
    renderAt('/')
    await user.click(screen.getByRole('button', { name: /menu/i }))
    await user.click(within(screen.getByRole('dialog')).getByRole('button', { name: 'Switch to dark mode' }))
    const labels = screen.getAllByRole('button', { name: /^Switch to/ }).map((b) => b.getAttribute('aria-label'))
    expect(new Set(labels)).toEqual(new Set(['Switch to light mode']))
  })

  it('mobile menu closes on any navigation, including the name link', async () => {
    const user = userEvent.setup()
    renderAt('/projects')
    await user.click(screen.getByRole('button', { name: /menu/i }))
    expect(screen.getByRole('dialog')).toBeInTheDocument()
    const banner = screen.getByRole('banner')
    await user.click(within(banner).getByRole('link', { name: /Jayvee Canlas/ }))
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('a page that fails to load shows a reload option instead of a blank site', () => {
    vi.spyOn(console, 'error').mockImplementation(() => {})
    function Broken() {
      throw new Error('Failed to fetch dynamically imported module')
    }
    render(
      <RouteErrorBoundary>
        <Broken />
      </RouteErrorBoundary>,
    )
    expect(screen.getByRole('heading', { name: /couldn.t load/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Reload page' })).toBeInTheDocument()
  })

  it('refresh result keeps the "up to" from the stated fact', () => {
    const refresh = HOME_RESULTS.find((r) => r.slug === 'power-bi-refresh-monitor')
    expect(refresh.after).toMatch(/^Up to 8×\/day/)
  })

  it('waybill problem makes no claim the user never made', () => {
    expect(getProject('waybill-pdf-extraction').problem).not.toMatch(/typo/i)
  })
})
