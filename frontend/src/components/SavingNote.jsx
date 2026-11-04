// Estimated money figures, always labeled as an estimate and showing how they were worked out.
// saving  = hours saved × staff rate; revenue = added revenue capacity (what the tool makes possible, not revenue earned).
function Line({ amount, label, basis }) {
  return (
    <p className="text-sm text-ink">
      <span className="font-semibold">
        ≈ ${amount.toLocaleString('en-US')}/month {label}
      </span>{' '}
      <span className="text-muted">(estimate: {basis})</span>
    </p>
  )
}

export default function SavingNote({ saving, revenue, className = '' }) {
  if (!saving && !revenue) return null
  return (
    <div className={`flex flex-col gap-0.5 ${className}`}>
      {revenue && <Line amount={revenue.monthly} label="added revenue capacity" basis={revenue.basis} />}
      {saving && <Line amount={saving.monthly} label="saved" basis={saving.basis} />}
    </div>
  )
}
