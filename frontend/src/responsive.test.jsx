import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join, resolve } from 'node:path'
import { fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Home from './pages/Home.jsx'
import MobileBar from './components/layout/MobileBar.jsx'
import ToolTags from './components/ToolTags.jsx'

const SRC = resolve(process.cwd(), 'src')
const sources = (dir = SRC) =>
  readdirSync(dir).flatMap((name) => {
    const p = join(dir, name)
    if (statSync(p).isDirectory()) return sources(p)
    return /\.jsx$/.test(name) && !/\.test\./.test(name) ? [[p, readFileSync(p, 'utf8')]] : []
  })

// User request 2026-11-04: works from a 320px phone to a 1440p/4K screen.
describe('large screens: everything scales from the root font size', () => {
  it('the root font size grows with the screen, and never below the browser default', () => {
    const css = readFileSync(join(SRC, 'styles/index.css'), 'utf8')
    expect(css).toMatch(/font-size:\s*clamp\(100%,\s*min\([^)]*vw[^)]*vh[^)]*\),\s*200%\)/)
  })

  it('no size in a component is fixed in px, or it would stay small on a big screen', () => {
    for (const [file, text] of sources()) {
      // Breakpoints like min-[1400px] are the exception: media queries stay in px.
      expect(text.match(/(?<!\bm[ia][nx])-\[\d+(\.\d+)?px\]/g), file).toBeNull()
      expect(text.match(/<(?!Avatar)\w+[^>]*\bsize=\{\d+\}/g), file).toBeNull()
    }
  })
})

describe('Home bento layout', () => {
  const bento = () => {
    const { container } = render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>,
    )
    return container.querySelector('[data-testid="bento"]').className
  }

  it('leaves no hole beside the photo on tablets, and only goes 4 columns when there is room', () => {
    const cls = bento()
    expect(cls).toContain('md:grid-flow-dense')
    expect(cls).toContain('xl:grid-cols-4')
    expect(cls).not.toContain('lg:grid-cols-4')
  })

  it('a phone column can shrink, so a long line never pushes the page sideways', () => {
    expect(bento()).toContain('grid-cols-1')
  })
})

describe('phones', () => {
  it('the tool tooltip moves back on screen when it would run off the edge', () => {
    render(<ToolTags tools={['Claude API']} />)
    const tip = screen.getByRole('tooltip', { hidden: true })
    tip.getBoundingClientRect = () => ({ left: 300, right: 360 })
    Object.defineProperty(document.documentElement, 'clientWidth', { configurable: true, value: 320 })
    fireEvent.mouseEnter(tip.parentElement)
    expect(tip.style.getPropertyValue('--nudge')).toBe('-48px')
  })

  it('the open menu scrolls on a short screen, so every link stays reachable', () => {
    render(
      <MemoryRouter>
        <MobileBar />
      </MemoryRouter>,
    )
    fireEvent.click(screen.getByRole('button', { name: 'Menu' }))
    expect(screen.getByRole('dialog').className).toContain('overflow-y-auto')
  })

  it('the CV button keeps its full name for screen readers when the label shortens', () => {
    render(
      <MemoryRouter>
        <MobileBar />
      </MemoryRouter>,
    )
    expect(screen.getByRole('link', { name: 'Download CV' })).toHaveTextContent('CV')
  })
})
