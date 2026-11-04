import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import ProjectDetail from './ProjectDetail.jsx'

function renderAt(path) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route path="/projects/:slug" element={<ProjectDetail />} />
      </Routes>
    </MemoryRouter>,
  )
}

function expectExternal(link, href) {
  expect(link).toHaveAttribute('href', href)
  expect(link).toHaveAttribute('target', '_blank')
  expect(link.getAttribute('rel')).toContain('noreferrer')
}

describe('ProjectDetail', () => {
  it('detail page renders the project', () => {
    renderAt('/projects/ai-email-builder')
    expect(screen.getByRole('heading', { level: 1, name: 'AI Email Builder' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'All projects' })).toHaveAttribute('href', '/projects')
    expectExternal(screen.getByRole('link', { name: 'Open site' }), 'https://nestmarketing-emailbuilder.com/')
    expectExternal(
      screen.getByRole('link', { name: 'Watch demo' }),
      'https://www.loom.com/share/835389e31e2d4231bcfa530c9ab91598',
    )
    expect(screen.getByText('20 → 50+ emails a day (2.5×)')).toBeInTheDocument()
    expect(document.title).toContain('AI Email Builder')
  })

  it('demo detail shows What it does and its demo link, no Result', () => {
    renderAt('/projects/shophub')
    expect(screen.getByText('What it does')).toBeInTheDocument()
    expect(screen.queryByText('Result')).not.toBeInTheDocument()
    expectExternal(screen.getByRole('link', { name: 'Open demo' }), 'https://jayveecanlas8686-pixel.github.io/ShopHub/')
  })

  it('unknown slug shows not found', () => {
    renderAt('/projects/does-not-exist')
    expect(screen.getByRole('heading', { name: /not found/i })).toBeInTheDocument()
  })
})
