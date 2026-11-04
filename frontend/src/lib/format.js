// Data stores context as "A · B · C"; the UI shows it as a plain comma list (design doc: no dot-joined meta strings).
export function formatContext(context = '') {
  return context.split(' · ').filter(Boolean).join(', ')
}

// Personal projects must say so (spec §7). Most already carry it in their context; add it only when missing.
export function contextLine(project) {
  const text = formatContext(project.context)
  if (project.kind === 'personal' && !text.startsWith('Personal project')) return `Personal project, ${text}`
  return text
}

// Props for every link that leaves the site.
export const EXTERNAL = { target: '_blank', rel: 'noopener noreferrer' }

// Full problem → built → result stories show as wide rows; demos and repos as compact tiles.
export const isRow = (p) => ['real', 'personal', 'launching', 'building'].includes(p.kind)
