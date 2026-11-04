// "How I work" is a real sequence, so it is the one place steps are numbered (design doc).
export default function MethodSteps({ steps }) {
  return (
    <ol className="relative grid gap-8 sm:grid-cols-3 sm:gap-6">
      <span aria-hidden="true" className="absolute left-[0.9375rem] top-4 bottom-4 w-px bg-line sm:left-4 sm:right-4 sm:top-[0.9375rem] sm:bottom-auto sm:h-px sm:w-auto" />
      {steps.map((s, i) => (
        <li key={s.step} data-testid="method-step" className="relative pl-12 sm:pl-0 sm:pt-12">
          <span
            aria-hidden="true"
            className="absolute left-0 top-0 inline-flex h-8 w-8 items-center justify-center rounded-full bg-ink font-display text-sm font-bold text-paper"
          >
            {i + 1}
          </span>
          <h3 className="text-lg font-bold">{s.step}</h3>
          <p className="mt-1 max-w-[34ch] text-[0.9375rem] text-muted">{s.text}</p>
        </li>
      ))}
    </ol>
  )
}
