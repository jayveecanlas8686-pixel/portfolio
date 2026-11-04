import { profile } from '../../data/profile.js'

// Photo when profile.photo exists (added with the content in Task 2), initials otherwise.
export default function Avatar({ size = 44 }) {
  const style = { width: size, height: size }
  if (profile.photo) {
    return (
      <img
        src={profile.photo}
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
