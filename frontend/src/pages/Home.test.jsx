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

const region = (name) => screen.getByRole('region', { name })

// Home = one-screen bento hub modelled on the layout Jayvee shared (2026-11-04), with his own content.
describe('Home bento', () => {
  it('shows the promise and the main call to action', () => {
    renderHome()
    expect(screen.getByRole('heading', { level: 1, name: 'Less manual work. More reliable data.' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Discuss a project/ })).toHaveAttribute('href', '/contact')
  })

  it('has a tools strip listing the tools I work with', () => {
    renderHome()
    const tools = region('Tools I work with')
    for (const name of ['n8n', 'Power BI', 'SQL Server', 'Python', 'Claude']) {
      expect(within(tools).getAllByText(name).length).toBeGreaterThanOrEqual(1)
    }
  })

  it('has a profile card with name, CV and a link to About', () => {
    renderHome()
    const card = region('About me')
    expect(within(card).getByText('Jayvee Canlas')).toBeInTheDocument()
    expect(within(card).getByTestId('download-cv')).toBeInTheDocument()
    expect(within(card).getByRole('link', { name: 'More about me' })).toHaveAttribute('href', '/about')
  })

  it('projects card shows the three before → after results and links to all projects', () => {
    renderHome()
    const card = region('Projects')
    const cases = [
      [/AI Email Builder/, '/projects/ai-email-builder', '20 emails/day', '50+ emails/day'],
      [/Nest Brain/, '/projects/nest-brain', 'Posted by hand', '840+ tasks routed in 3 weeks'],
      [/Business & CFO Dashboard/, '/projects/reset-dashboard', 'Updated by hand', 'Synced daily from 6 sources'],
    ]
    for (const [name, href, before, after] of cases) {
      const link = within(card).getByRole('link', { name })
      expect(link).toHaveAttribute('href', href)
      expect(link).toHaveTextContent(before)
      expect(link).toHaveTextContent(after)
    }
    expect(within(card).getByRole('link', { name: /All 22 projects/ })).toHaveAttribute('href', '/projects')
    expect(within(card).getAllByText('Nest Marketing').length).toBe(2)
    expect(within(card).getByText('Resét Skin & Aesthetics')).toBeInTheDocument()
  })

  it('AI builds card links to the AI projects', () => {
    renderHome()
    const card = region('AI builds')
    expect(within(card).getByRole('link', { name: 'Nest Brain' })).toHaveAttribute('href', '/projects/nest-brain')
    expect(within(card).getByRole('link', { name: 'AI Email Builder' })).toHaveAttribute('href', '/projects/ai-email-builder')
  })

  it('services card lists all 4 services, each linking to its section', () => {
    renderHome()
    const card = region('Services')
    expect(within(card).getAllByTestId('service')).toHaveLength(4)
    expect(within(card).getByRole('link', { name: /Automations & alerts/ })).toHaveAttribute('href', '/services#automation')
    expect(within(card).getByRole('link', { name: /AI assistants/ })).toHaveAttribute('href', '/services#ai-assistants')
  })

  it('credentials card links to the certificates', () => {
    renderHome()
    const card = region('Credentials')
    expect(within(card).getByText(/9 certifications/)).toBeInTheDocument()
    expect(within(card).getByRole('link', { name: /See certificates/ })).toHaveAttribute('href', '/about')
  })

  it('clients card opens each client page', () => {
    renderHome()
    const card = region('Clients')
    expect(within(card).getByRole('link', { name: /Nest Marketing/ })).toHaveAttribute('href', '/clients/nest-marketing')
    expect(within(card).getByRole('link', { name: /Resét Skin & Aesthetics/ })).toHaveAttribute('href', '/clients/reset')
    expect(within(card).getByRole('link', { name: /SimGolf/ })).toHaveAttribute('href', '/clients/simgolf')
  })
})

describe('Home bento: service icons', () => {
  it('every service row has its own icon', () => {
    renderHome()
    const rows = within(region('Services')).getAllByTestId('service')
    for (const row of rows) expect(row.querySelector('svg[data-service-icon]')).not.toBeNull()
    const kinds = rows.map((r) => r.querySelector('svg[data-service-icon]').getAttribute('data-service-icon'))
    expect(new Set(kinds).size).toBe(4)
  })
})
