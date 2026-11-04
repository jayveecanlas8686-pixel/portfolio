// Private CV download counter (spec §9). Inserts one row into Supabase's cv_downloads table.
// Only runs where VITE_CV_COUNTER === 'on' (set in Vercel Production only), so local and
// preview clicks never touch the real count. Never throws: the download must work regardless.

export async function recordCvDownload({
  env = import.meta.env,
  fetchImpl = globalThis.fetch,
  page = globalThis.location?.pathname ?? '/',
} = {}) {
  const url = env.VITE_SUPABASE_URL
  const key = env.VITE_SUPABASE_ANON_KEY
  if (env.VITE_CV_COUNTER !== 'on' || !url || !key || !fetchImpl) return false

  try {
    const res = await fetchImpl(`${url.replace(/\/$/, '')}/rest/v1/cv_downloads`, {
      method: 'POST',
      keepalive: true,
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
        'Content-Type': 'application/json',
        Prefer: 'return=minimal',
      },
      body: JSON.stringify({ page: String(page).slice(0, 200) }),
    })
    return Boolean(res?.ok)
  } catch {
    return false
  }
}
