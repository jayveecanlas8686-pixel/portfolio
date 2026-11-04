import { render, screen, within } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Projects from './Projects.jsx'

function renderProjects() {
  return render(
    <MemoryRouter>
      <Projects />
    </MemoryRouter>,
  )
}

const region = (name) => screen.getByRole('region', { name })

// Projects = three categories of cards (user request 2026-11-04); each card opens a page with its projects.
describe('Projects: three categories of cards', () => {
  it('shows Clients, Employment and Personal in that order', () => {
    renderProjects()
    const h2s = screen.getAllByRole('heading', { level: 2 }).map((h) => h.textContent)
    expect(h2s.slice(0, 3)).toEqual(['Clients', 'Employment', 'Personal'])
  })

  it('client cards open each client page', () => {
    renderProjects()
    const clients = region('Clients')
    expect(within(clients).getByRole('link', { name: /Nest Marketing/ })).toHaveAttribute('href', '/clients/nest-marketing')
    expect(within(clients).getByRole('link', { name: /Resét Skin & Aesthetics/ })).toHaveAttribute('href', '/clients/reset')
    expect(within(clients).getByRole('link', { name: /SimGolf/ })).toHaveAttribute('href', '/clients/simgolf')
    expect(within(clients).getByText(/Umar Shaikh, Founder/)).toBeInTheDocument()
  })

  it('employment card opens the Brigada page with its role, dates and 8 projects', () => {
    renderProjects()
    const card = within(region('Employment')).getByRole('link', { name: /Brigada Distributions/ })
    expect(card).toHaveAttribute('href', '/employment/brigada')
    expect(card).toHaveTextContent('Data Engineer / Analyst, Jan 2024 – Mar 2026')
    expect(card).toHaveTextContent('8 projects built')
  })

  it('personal card opens the personal projects page', () => {
    renderProjects()
    const card = within(region('Personal')).getByRole('link', { name: /Personal projects/ })
    expect(card).toHaveAttribute('href', '/personal')
    expect(card).toHaveTextContent('6 projects built')
  })

  it('no long project lists on this page, and no dot-joined text', () => {
    const { container } = renderProjects()
    expect(screen.queryAllByRole('article')).toHaveLength(0)
    expect(container.textContent).not.toContain(' · ')
  })
})

describe('Projects: logos on cards', () => {
  it('shows the official logo where we have one, and the letter tile otherwise', () => {
    renderProjects()
    const clients = region('Clients')
    expect(within(clients).getByRole('img', { name: 'Nest Marketing logo' })).toHaveAttribute('src', '/images/clients/nest-marketing.webp')
    expect(within(clients).getByRole('img', { name: 'Resét Skin & Aesthetics logo' })).toBeInTheDocument()
    expect(within(clients).queryByRole('img', { name: 'SimGolf logo' })).not.toBeInTheDocument()
  })
})
