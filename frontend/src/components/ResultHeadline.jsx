// A project's result headline in green, with "(estimate)" when the number is estimated (spec §4).
export default function ResultHeadline({ result, className = '' }) {
  if (!result) return null
  return (
    <span className={`font-display font-bold text-accent ${className}`}>
      {result.headline}
      {result.estimate && <span className="ml-1 font-body text-sm font-normal text-muted">(estimate)</span>}
    </span>
  )
}
