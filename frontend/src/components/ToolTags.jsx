// Tool names are the only place the mono face is used (design doc).
export default function ToolTags({ tools = [] }) {
  if (!tools.length) return null
  return (
    <ul className="flex flex-wrap gap-1.5" aria-label="Tools used">
      {tools.map((t) => (
        <li key={t} className="rounded-md bg-paper px-2 py-0.5 font-mono text-xs text-muted ring-1 ring-line">
          {t}
        </li>
      ))}
    </ul>
  )
}
