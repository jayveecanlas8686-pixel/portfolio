import { render, screen, within } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Home from './Home.jsx'

function renderHome() {
  return render(
    <MemoryRouter>
      <Home />
    </MemoryRouter>,
  )
}

// Home is a one-screen hub (user request 2026-11-04): promise + services + projects + about, each linking deeper.
describe('Home hub', () => {
  it('shows the promise and both CTAs', () => {
    renderHome()
    expect(screen.getByRole('heading', { level: 1, name: 'Less manual work. More reliable data.' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Discuss a project' })).toHaveAttribute('href', '/contact')
    expect(screen.getByRole('link', { name: 'See results' })).toHaveAttribute('href', '/projects')
  })

  it('has a services tile listing all 4 services, each linking to its section', () => {
    renderHome()
    const tile = screen.getByRole('region', { name: 'Services' })
    const items = within(tile).getAllByTestId('service')
    expect(items).toHaveLength(4)
    expect(within(tile).getByRole('link', { name: /Kill the manual work/ })).toHaveAttribute('href', '/services#automation')
    expect(within(tile).getByRole('link', { name: 'All services' })).toHaveAttribute('href', '/services')
  })

  it('has a projects tile with the three before → after results linking to their projects', () => {
    renderHome()
    const tile = screen.getByRole('region', { name: 'Projects' })
    const cases = [
      [/2\.5×/, '/projects/ai-email-builder', '20 emails/day', '50+ emails/day'],
      [/2h → 10m/, '/projects/waybill-pdf-extraction', '2 hrs/day', '5–10 min/day'],
      [/8×\/day/, '/projects/power-bi-refresh-monitor', 'Refreshed by hand', 'Up to 8×/day, verified'],
    ]
    for (const [name, href, before, after] of cases) {
      const link = within(tile).getByRole('link', { name })
      expect(link).toHaveAttribute('href', href)
      expect(link).toHaveTextContent(before)
      expect(link).toHaveTextContent(after)
    }
    expect(within(tile).getByRole('link', { name: /All 19 projects/ })).toHaveAttribute('href', '/projects')
  })

  it('has an about tile with the CV and a link to the about page', () => {
    renderHome()
    const tile = screen.getByRole('region', { name: 'About me' })
    expect(within(tile).getByTestId('download-cv')).toBeInTheDocument()
    expect(within(tile).getByRole('link', { name: 'More about me' })).toHaveAttribute('href', '/about')
  })

  it('keeps the running workflow', () => {
    renderHome()
    expect(screen.getAllByRole('listitem').map((li) => li.textContent)).toEqual(
      expect.arrayContaining(['Waybill PDF', 'n8n extracts', 'Clean data', 'Excel ✓']),
    )
  })
})

describe('Home hub: clients', () => {
  it('projects tile names both clients and links to their pages', () => {
    renderHome()
    const tile = screen.getByRole('region', { name: 'Projects' })
    expect(within(tile).getByRole('link', { name: 'Nest Marketing' })).toHaveAttribute('href', '/clients/nest-marketing')
    expect(within(tile).getByRole('link', { name: 'Resét Skin & Aesthetics' })).toHaveAttribute('href', '/clients/reset')
  })
})
