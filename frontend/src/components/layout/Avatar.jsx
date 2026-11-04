import { profile } from '../../data/profile.js'

// Small web-sized avatar (profile.avatar); initials if it is ever missing.
export default function Avatar({ size = 44 }) {
  // size is in px at the default root size; rem so it scales up on big screens.
  const style = { width: `${size / 16}rem`, height: `${size / 16}rem` }
  if (profile.avatar) {
    return (
      <img
        src={profile.avatar}
        alt=""
        width={size}
        height={size}
        style={style}
        className="shrink-0 rounded-xl object-cover object-top ring-1 ring-line"
      />
    )
  }
  return (
    <span
      style={style}
      aria-hidden="true"
      className="inline-flex shrink-0 items-center justify-center rounded-xl bg-accent-soft font-display text-sm font-bold text-accent"
    >
      JC
    </span>
  )
}
