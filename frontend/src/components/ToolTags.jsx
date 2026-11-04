import { TOOL_ICONS } from '../lib/toolIcons.js'

// Tools as official logos (user request 2026-11-04). Hovering or focusing a logo shows its name in a tooltip.
// The list sits above a card's full-size link overlay (relative z-10), otherwise hover never reaches it.
// A tooltip near the screen edge shifts back inside (--nudge), so it stays readable on phones.
function keepOnScreen(e) {
  const tip = e.currentTarget.querySelector('[role="tooltip"]')
  if (!tip) return
  tip.style.setProperty('--nudge', '0px')
  const { left, right } = tip.getBoundingClientRect()
  const max = document.documentElement.clientWidth - 8
  const shift = left < 8 ? 8 - left : right > max ? max - right : 0
  tip.style.setProperty('--nudge', `${shift}px`)
}

// showNames: logo + name side by side (About page toolkit, where the names are the content).
export default function ToolTags({ tools = [], showNames = false, label = 'Tools used' }) {
  if (!tools.length) return null
  return (
    <ul className="relative z-10 flex flex-wrap items-center gap-1.5" aria-label={label}>
      {tools.map((t) => {
        const icon = TOOL_ICONS[t]
        if (!icon) {
          return (
            <li key={t} className="rounded-md bg-paper px-2 py-1 font-mono text-xs text-muted ring-1 ring-line">
              {t}
            </li>
          )
        }
        const mark = icon.src ? (
          <img
            src={icon.src}
            alt={showNames ? '' : t}
            width="18"
            height="18"
            loading="lazy"
            className="h-[1.125rem] w-[1.125rem] object-contain"
          />
        ) : (
          <icon.Icon
            size="1.125rem"
            weight="duotone"
            role={showNames ? undefined : 'img'}
            aria-label={showNames ? undefined : t}
            aria-hidden={showNames ? 'true' : undefined}
            className="text-[#14202f]"
          />
        )
        return (
          <li
            key={t}
            tabIndex={showNames ? undefined : 0}
            onMouseEnter={showNames ? undefined : keepOnScreen}
            onFocus={showNames ? undefined : keepOnScreen}
            className={`group/tool relative inline-flex items-center gap-1.5 rounded-md bg-white ring-1 ring-line outline-none focus-visible:ring-2 focus-visible:ring-accent ${
              showNames ? 'px-2 py-1' : 'p-1.5'
            }`}
          >
            {mark}
            {showNames ? (
              <span className="font-mono text-xs text-[#4c566a]">{t}</span>
            ) : (
              <span
                role="tooltip"
                className="pointer-events-none absolute bottom-full left-1/2 z-20 mb-1.5 [translate:calc(-50%_+_var(--nudge,0px))_0] rounded-md bg-ink px-2 py-1 text-xs font-semibold whitespace-nowrap text-paper opacity-0 shadow-lg transition-opacity duration-150 group-hover/tool:opacity-100 group-focus/tool:opacity-100"
              >
                {t}
              </span>
            )}
          </li>
        )
      })}
    </ul>
  )
}
