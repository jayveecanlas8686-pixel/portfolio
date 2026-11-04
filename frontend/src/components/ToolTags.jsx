import { TOOL_ICONS } from '../lib/toolIcons.js'

// Tools as official logos (user request 2026-11-04). The name stays available on hover and to screen readers.
// No official logo for a tool: its name shows instead (mono face, as before).
// showNames: logo + name side by side (About page toolkit, where the names are the content).
export default function ToolTags({ tools = [], showNames = false, label = 'Tools used' }) {
  if (!tools.length) return null
  return (
    <ul className="flex flex-wrap items-center gap-1.5" aria-label={label}>
      {tools.map((t) => {
        const icon = TOOL_ICONS[t]
        if (!icon) {
          return (
            <li key={t} className="rounded-md bg-paper px-2 py-1 font-mono text-xs text-muted ring-1 ring-line">
              {t}
            </li>
          )
        }
        return (
          <li
            key={t}
            title={t}
            className={`inline-flex items-center gap-1.5 rounded-md bg-white ring-1 ring-line ${showNames ? 'px-2 py-1' : 'p-1.5'}`}
          >
            <img
              src={icon.src}
              alt={showNames ? '' : t}
              width="18"
              height="18"
              loading="lazy"
              className="h-[18px] w-[18px] object-contain"
            />
            {showNames && <span className="font-mono text-xs text-[#4c566a]">{t}</span>}
          </li>
        )
      })}
    </ul>
  )
}
