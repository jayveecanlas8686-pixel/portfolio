import { render, screen, within } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Projects from './Projects.jsx'
import { PROJECT_GROUPS } from '../data/projects.js'

function renderProjects() {
  return render(
    <MemoryRouter>
      <Projects />
    </MemoryRouter>,
  )
}

function articleFor(title) {
  const heading = screen.getByRole('heading', { name: title })
  return heading.closest('article')
}

describe('Projects', () => {
  it('groups render in order with all projects', () => {
    renderProjects()
    const h2s = screen.getAllByRole('heading', { level: 2 }).map((h) => h.textContent)
    const groupTitles = PROJECT_GROUPS.map((g) => g.title)
    expect(h2s.filter((t) => groupTitles.includes(t))).toEqual(groupTitles)
    expect(screen.getAllByRole('article')).toHaveLength(19)
  })

  it('real card shows Problem / Built / Result', () => {
    renderProjects()
    const card = within(articleFor('Waybill PDF Extraction'))
    expect(card.getByText('Problem')).toBeInTheDocument()
    expect(card.getByText('Built')).toBeInTheDocument()
    expect(card.getByText('Result')).toBeInTheDocument()
    expect(card.getByText(/2 hrs → 5–10 min a day/)).toBeInTheDocument()
    expect(card.getByText(/estimate/)).toBeInTheDocument()
  })

  it('demo card shows What it does and no Result label', () => {
    renderProjects()
    const card = within(articleFor('ShopHub'))
    expect(card.getByText('What it does')).toBeInTheDocument()
    expect(card.queryByText('Result')).not.toBeInTheDocument()
    const link = card.getByRole('link', { name: 'Open demo' })
    expect(link).toHaveAttribute('target', '_blank')
    expect(link.getAttribute('rel')).toContain('noreferrer')
  })

  it('personal project is labeled', () => {
    renderProjects()
    expect(within(articleFor('YouTube Shorts Generator')).getByText(/Personal project/)).toBeInTheDocument()
  })

  it('cards link to detail pages', () => {
    renderProjects()
    const hrefs = screen.getAllByRole('link').map((a) => a.getAttribute('href'))
    expect(hrefs).toContain('/projects/ai-email-builder')
  })

  it('context is shown without dot separators', () => {
    const { container } = renderProjects()
    expect(screen.getByText('Operations team, n8n, daily')).toBeInTheDocument()
    expect(container.textContent).not.toContain(' · ')
  })
})

describe('Projects: every detail page is reachable', () => {
  it('demo and repo tiles link to their detail pages', () => {
    renderProjects()
    for (const [title, slug] of [
      ['ShopHub', 'shophub'],
      ['Azure Data Quality Framework', 'azure-data-quality-framework'],
    ]) {
      const tile = articleFor(title)
      expect(within(tile).getByRole('link', { name: title })).toHaveAttribute('href', `/projects/${slug}`)
    }
  })
})

describe('Projects: client work', () => {
  it('starts with client cards that open each client page', () => {
    renderProjects()
    const clients = screen.getByRole('region', { name: 'Clients' })
    expect(within(clients).getByRole('link', { name: /Nest Marketing/ })).toHaveAttribute('href', '/clients/nest-marketing')
    expect(within(clients).getByRole('link', { name: /Resét Skin & Aesthetics/ })).toHaveAttribute('href', '/clients/reset')
    expect(within(clients).getByText(/Umar Shaikh/)).toBeInTheDocument()
    expect(within(clients).getByText(/Sebastian Larsen/)).toBeInTheDocument()
  })

  it('client project cards name the client', () => {
    renderProjects()
    expect(within(articleFor('Nest Brain')).getByText(/Nest Marketing/)).toBeInTheDocument()
  })
})
