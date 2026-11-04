import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { AppRoutes } from './App.jsx'

function renderAt(path) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <AppRoutes />
    </MemoryRouter>,
  )
}

describe('app shell', () => {
  it('renders every nav item', () => {
    renderAt('/')
    for (const name of ['Home', 'Projects', 'Services', 'About', 'Contact']) {
      expect(screen.getAllByRole('link', { name }).length).toBeGreaterThanOrEqual(1)
    }
  })

  it('unknown route shows not found', () => {
    renderAt('/nope')
    expect(screen.getByRole('heading', { name: /not found/i })).toBeInTheDocument()
  })

  it('download CV reachable on every route', () => {
    renderAt('/about')
    const link = screen.getAllByTestId('download-cv')[0]
    expect(link.getAttribute('href')).toMatch(/\/cv\/jayvee-canlas-cv\.pdf$/)
  })

  it('mobile menu opens, and closes on link click', async () => {
    const user = userEvent.setup()
    renderAt('/')
    const button = screen.getByRole('button', { name: /menu/i })
    expect(button).toHaveAttribute('aria-expanded', 'false')
    await user.click(button)
    expect(button).toHaveAttribute('aria-expanded', 'true')
    const dialog = screen.getByRole('dialog')
    await user.click(within(dialog).getByRole('link', { name: 'Projects' }))
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })
})
