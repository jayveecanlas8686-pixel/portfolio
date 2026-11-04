import { existsSync } from 'node:fs'
import { resolve } from 'node:path'
import { PROJECTS, PROJECT_GROUPS, getProject } from './projects.js'
import { SERVICES, METHOD, HOME_RESULTS } from './services.js'
import { ABOUT } from './about.js'
import { profile } from './profile.js'
import { CLIENTS, getClient } from './clients.js'

const publicFile = (p) => resolve(process.cwd(), 'public' + p)

describe('project content honesty (spec §4, §7)', () => {
  it('real projects tell the full story', () => {
    const real = PROJECTS.filter((p) => p.kind === 'real')
    expect(real.length).toBe(9)
    for (const p of real) {
      expect(p.problem, p.slug).toBeTruthy()
      expect(p.built, p.slug).toBeTruthy()
      expect(p.result?.headline, p.slug).toBeTruthy()
    }
  })

  it('demos and repos claim no results', () => {
    const shown = PROJECTS.filter((p) => p.kind === 'demo' || p.kind === 'repo')
    expect(shown.length).toBe(8)
    for (const p of shown) {
      expect(p.result, p.slug).toBeUndefined()
      expect(p.whatItDoes, p.slug).toBeTruthy()
    }
  })

  it('no revenue claims anywhere in results', () => {
    for (const p of PROJECTS) {
      expect(JSON.stringify(p.result ?? {}), p.slug).not.toMatch(/revenue/i)
    }
  })

  it('waybill is an estimate with the stated numbers', () => {
    const { result } = getProject('waybill-pdf-extraction')
    expect(result.estimate).toBe(true)
    expect(result.headline).toContain('2 hrs → 5–10 min')
    expect(result.detail).toContain('~40 hrs/month')
  })

  it('email builder states output, not money', () => {
    const { result } = getProject('ai-email-builder')
    expect(result.headline).toContain('20 → 50+')
    expect(result.headline).toContain('2.5×')
    expect(result.estimate).toBe(false)
  })

  it('personal project is marked personal', () => {
    expect(getProject('youtube-shorts-generator').kind).toBe('personal')
  })
})

describe('content structure', () => {
  it('has 20 projects with unique slugs in known groups', () => {
    expect(PROJECTS.length).toBe(20)
    expect(new Set(PROJECTS.map((p) => p.slug)).size).toBe(20)
    const groupIds = PROJECT_GROUPS.map((g) => g.id)
    expect(groupIds).toEqual(['clients', 'automation', 'data-ai', 'demos', 'repos'])
    for (const p of PROJECTS) expect(groupIds, p.slug).toContain(p.group)
  })

  it('getProject returns undefined for unknown slugs', () => {
    expect(getProject('nope')).toBeUndefined()
  })

  it('exactly 4 services, each with 3 benefits and resolvable proof', () => {
    expect(SERVICES.length).toBe(4)
    expect(SERVICES.map((s) => s.number)).toEqual(['01', '02', '03', '04'])
    for (const s of SERVICES) {
      expect(s.benefits.length, s.id).toBe(3)
      expect(s.proofSlugs.length, s.id).toBeGreaterThan(0)
      for (const slug of s.proofSlugs) expect(getProject(slug), slug).toBeDefined()
    }
  })

  it('method has the three named steps', () => {
    expect(METHOD.map((m) => m.step)).toEqual(['Map it', 'Automate it', 'Hand it over'])
  })

  it('home results are the three stated numbers and resolve', () => {
    expect(HOME_RESULTS.map((r) => r.value)).toEqual(['2.5×', '2h → 10m', '8×/day'])
    expect(HOME_RESULTS.map((r) => r.slug)).toEqual([
      'ai-email-builder',
      'waybill-pdf-extraction',
      'power-bi-refresh-monitor',
    ])
    for (const r of HOME_RESULTS) expect(getProject(r.slug)).toBeDefined()
  })

  it('profile has the headline, tagline and photo', () => {
    expect(profile.headline).toBe('Less manual work. More reliable data.')
    expect(profile.tagline).toBe(
      'I build automations, data pipelines and AI tools that give teams their hours back.',
    )
    expect(existsSync(publicFile(profile.photo))).toBe(true)
  })

  it('about carries experience, education and certifications', () => {
    expect(ABOUT.experience[0].company).toBe('Brigada Distributions Inc.')
    expect(ABOUT.education[0].degree).toBe('BS Computer Engineering')
    expect(ABOUT.certifications.length).toBe(9)
  })
})

describe('asset paths exist', () => {
  it('every project image and certificate file exists in public/', () => {
    const paths = [
      ...PROJECTS.map((p) => p.image).filter(Boolean),
      ...ABOUT.certifications.flatMap((c) => [c.image, c.pdf]).filter(Boolean),
      profile.cvPath,
    ]
    for (const p of paths) expect(existsSync(publicFile(p)), p).toBe(true)
  })
})

describe('performance: profile images are web-sized', () => {
  it('sidebar avatar and portrait are small webp files', () => {
    for (const p of [profile.avatar, profile.photo]) {
      expect(p, 'path').toMatch(/\.webp$/)
      expect(existsSync(publicFile(p)), p).toBe(true)
    }
  })
})


// Client work (user request 2026-11-04): names + company shown, no quotes, facts only from the project files.
describe('client work', () => {
  it('lists Nest Marketing (Umar Shaikh) and Resét (Sebastian Larsen), no quotes', () => {
    expect(CLIENTS.map((c) => c.id)).toEqual(['nest-marketing', 'reset', 'simgolf'])
    expect(getClient('simgolf')).toMatchObject({ name: 'SimGolf', contact: 'Keld Jensen', role: 'Owner' })
    expect(getClient('nest-marketing')).toMatchObject({ name: 'Nest Marketing', contact: 'Umar Shaikh', role: 'Founder' })
    expect(getClient('reset')).toMatchObject({ name: 'Resét Skin & Aesthetics', contact: 'Sebastian Larsen', role: 'Owner' })
    for (const c of CLIENTS) expect(c.quote, c.id).toBeUndefined()
  })

  it('every client project exists, sits in the clients group and points back to its client', () => {
    expect(getClient('nest-marketing').projectSlugs).toEqual(['ai-email-builder', 'nest-brain', 'campaign-alerts', 'nest-audit-engine'])
    expect(getClient('reset').projectSlugs).toEqual(['reset-dashboard'])
    expect(getClient('simgolf').projectSlugs).toEqual(['simgolf-platform'])
    for (const c of CLIENTS) {
      for (const slug of c.projectSlugs) {
        const p = getProject(slug)
        expect(p, slug).toBeDefined()
        expect(p.group, slug).toBe('clients')
        expect(p.client, slug).toBe(c.id)
      }
    }
  })

  it('a launching project shows its status and claims no result', () => {
    const p = getProject('nest-audit-engine')
    expect(p.kind).toBe('launching')
    expect(p.status).toBe('Launching November 2026')
    expect(p.result).toBeUndefined()
  })

  it('SimGolf is in progress: no result, no public link, no data robot', () => {
    const p = getProject('simgolf-platform')
    expect(p.kind).toBe('launching')
    expect(p.status).toBe('In progress')
    expect(p.result).toBeUndefined()
    expect(p.links).toEqual({})
    expect(JSON.stringify(p)).not.toMatch(/robot|scrap|vercel/i)
  })

  it('client results use only facts from the project files', () => {
    expect(getProject('nest-brain').result.headline).toContain('840+')
    expect(getProject('nest-brain').result.detail).toContain('226 channels')
    expect(getProject('campaign-alerts').result.detail).toContain('25%')
    expect(getProject('reset-dashboard').result.detail).toContain('6 sources')
  })

  it('no client money figures or client-of-client names leak into public text', () => {
    const text = JSON.stringify(PROJECTS.filter((p) => p.client))
    for (const banned of [/\d\s?kr\b/i, /\bDKK\b/, /Klone|Amour|Ava Rosier|Living Word|Code 118|TrackMan|Hims|Phoenix/i]) {
      expect(text).not.toMatch(banned)
    }
  })

  it('getClient returns undefined for unknown ids', () => {
    expect(getClient('nope')).toBeUndefined()
  })
})

// Services rebuilt around client work (user request 2026-11-04).
describe('services follow the client work', () => {
  it('are the four client-backed services, in order', () => {
    expect(SERVICES.map((s) => s.id)).toEqual(['ai-assistants', 'dashboards', 'automation', 'ai-content'])
    expect(SERVICES.map((s) => s.title)).toEqual([
      'AI assistants for your team',
      'Live dashboards and internal apps',
      'Automations and alerts',
      'AI content and outreach',
    ])
  })

  it('each service leads with at least one client project as proof', () => {
    for (const s of SERVICES) {
      expect(getProject(s.proofSlugs[0]).group, s.id).toBe('clients')
    }
  })
})
