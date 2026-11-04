// "Tools I work with" strip: logos scroll slowly, pause on hover, and stand still with reduced motion.
const TOOLS = [
  ['n8n', 'n8n.svg'],
  ['Power BI', 'powerbi.svg'],
  ['SQL Server', 'sqlserver.svg'],
  ['Python', 'python.svg'],
  ['Claude', 'anthropic.svg'],
  ['Power Automate', 'powerautomate.svg'],
  ['Azure', 'azure.svg'],
  ['Airflow', 'apacheairflow.svg'],
  ['dbt', 'dbt.svg'],
  ['Supabase', 'supabase.svg'],
  ['React', 'react.svg'],
  ['TypeScript', 'typescript.svg'],
  ['Node.js', 'nodedotjs.svg'],
  ['Docker', 'docker.svg'],
  ['OpenAI', 'openai-mark.svg'],
  ['Figma', 'figma.svg'],
  ['Google Sheets', 'googlesheets.svg'],
  ['Railway', 'railway.svg'],
]

function ToolList({ hidden = false }) {
  return (
    <ul className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {TOOLS.map(([name, file]) => (
        <li key={name} className="flex items-center gap-2 border-r border-line px-5 text-sm font-semibold whitespace-nowrap text-ink">
          <img src={`/icons/${file}`} alt="" width="18" height="18" className="h-[1.125rem] w-[1.125rem] opacity-80 dark:invert" />
          {name}
        </li>
      ))}
    </ul>
  )
}

export default function ToolsMarquee() {
  return (
    <section
      aria-labelledby="tools-heading"
      className="flex items-center gap-4 overflow-hidden rounded-[1.25rem] bg-card py-3 pl-5 ring-1 ring-line"
    >
      <h2 id="tools-heading" className="shrink-0 font-display text-sm font-bold leading-tight text-ink">
        Tools I<br className="hidden sm:block" /> work with
      </h2>
      <div className="marquee-mask relative min-w-0 flex-1 overflow-hidden">
        <div className="marquee-track flex w-max">
          <ToolList />
          <ToolList hidden />
        </div>
      </div>
    </section>
  )
}
