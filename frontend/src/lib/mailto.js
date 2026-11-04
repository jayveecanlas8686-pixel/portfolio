// No form backend (spec §6): the contact form opens the visitor's own mail app, pre-filled.
export function buildMailto({ name, message, email }) {
  const subject = encodeURIComponent(`Project inquiry from ${name}`)
  const body = encodeURIComponent(message)
  return `mailto:${email}?subject=${subject}&body=${body}`
}
