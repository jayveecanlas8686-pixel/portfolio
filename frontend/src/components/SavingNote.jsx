// An estimated cost saving, always labeled as an estimate and showing how it was worked out.
export default function SavingNote({ saving, className = '' }) {
  if (!saving) return null
  const amount = saving.monthly.toLocaleString('en-US')
  return (
    <p className={`text-sm text-ink ${className}`}>
      <span className="font-semibold">≈ ${amount}/month saved</span>{' '}
      <span className="text-muted">(estimate: {saving.basis})</span>
    </p>
  )
}
