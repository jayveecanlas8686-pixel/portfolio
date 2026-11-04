import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

describe('vercel.json', () => {
  it('rewrites every path to index.html so deep links work', () => {
    const config = JSON.parse(readFileSync(resolve(process.cwd(), 'vercel.json'), 'utf8'))
    expect(config.rewrites).toContainEqual({ source: '/(.*)', destination: '/index.html' })
  })
})

describe('share previews', () => {
  it('og:image and og:url are absolute on the live domain (LinkedIn/Facebook need absolute URLs)', () => {
    const html = readFileSync(resolve(process.cwd(), 'index.html'), 'utf8')
    expect(html).toContain('<meta property="og:image" content="https://jayvee-canlas.vercel.app/images/profile/og.png" />')
    expect(html).toContain('<meta property="og:url" content="https://jayvee-canlas.vercel.app/" />')
  })
})
