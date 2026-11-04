import { vi } from 'vitest'
import { recordCvDownload } from './cvCounter.js'

const ON = {
  VITE_CV_COUNTER: 'on',
  VITE_SUPABASE_URL: 'https://abc.supabase.co',
  VITE_SUPABASE_ANON_KEY: 'anon-key',
}

describe('recordCvDownload', () => {
  it('does nothing unless VITE_CV_COUNTER is "on"', async () => {
    const fetchImpl = vi.fn()
    const ok = await recordCvDownload({ env: { ...ON, VITE_CV_COUNTER: '' }, fetchImpl, page: '/' })
    expect(fetchImpl).not.toHaveBeenCalled()
    expect(ok).toBe(false)
  })

  it('does nothing when url or key is missing', async () => {
    const fetchImpl = vi.fn()
    expect(await recordCvDownload({ env: { ...ON, VITE_SUPABASE_URL: '' }, fetchImpl, page: '/' })).toBe(false)
    expect(await recordCvDownload({ env: { ...ON, VITE_SUPABASE_ANON_KEY: undefined }, fetchImpl, page: '/' })).toBe(false)
    expect(fetchImpl).not.toHaveBeenCalled()
  })

  it('posts one row when enabled', async () => {
    const fetchImpl = vi.fn().mockResolvedValue({ ok: true })
    const ok = await recordCvDownload({ env: ON, fetchImpl, page: '/about' })
    expect(ok).toBe(true)
    expect(fetchImpl).toHaveBeenCalledTimes(1)
    const [url, init] = fetchImpl.mock.calls[0]
    expect(url).toBe('https://abc.supabase.co/rest/v1/cv_downloads')
    expect(init.method).toBe('POST')
    expect(init.keepalive).toBe(true)
    expect(init.headers).toMatchObject({
      apikey: 'anon-key',
      Authorization: 'Bearer anon-key',
      'Content-Type': 'application/json',
      Prefer: 'return=minimal',
    })
    expect(JSON.parse(init.body)).toEqual({ page: '/about' })
  })

  it('never rejects when the network fails', async () => {
    const fetchImpl = vi.fn().mockRejectedValue(new TypeError('Failed to fetch'))
    await expect(recordCvDownload({ env: ON, fetchImpl, page: '/' })).resolves.toBe(false)
  })

  it('returns false on a rejected insert (e.g. 401)', async () => {
    const fetchImpl = vi.fn().mockResolvedValue({ ok: false, status: 401 })
    await expect(recordCvDownload({ env: ON, fetchImpl, page: '/' })).resolves.toBe(false)
  })

  it('caps the page value at 200 characters', async () => {
    const fetchImpl = vi.fn().mockResolvedValue({ ok: true })
    await recordCvDownload({ env: ON, fetchImpl, page: '/' + 'x'.repeat(500) })
    expect(JSON.parse(fetchImpl.mock.calls[0][1].body).page.length).toBe(200)
  })
})
