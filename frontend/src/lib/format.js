// Data stores context as "A · B · C"; the UI shows it as a plain comma list (design doc: no dot-joined meta strings).
export function formatContext(context = '') {
  return context.split(' · ').filter(Boolean).join(', ')
}
