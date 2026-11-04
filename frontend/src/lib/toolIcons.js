// Official tool logos (user request 2026-11-04). Files live in public/icons/tools/.
// Sources: Simple Icons (official brand marks in brand colour); the brand's own site for Firecrawl and
// code.to.design; the repo's existing icons for OpenRouter, Express, Power BI, SQL Server and Azure.
// Logos always sit on a white tile (both themes), so black marks stay visible; dark is kept for reference.
// Tools with no official logo available (e.g. Klaviyo, Excel, Grok) are left out and show as text.
const icon = (file, dark = false) => ({ src: `/icons/tools/${file}`, dark })

export const TOOL_ICONS = {
  'Claude API': icon('claude.svg'),
  Claude: icon('claude.svg'),
  Gemini: icon('googlegemini.svg'),
  OpenRouter: icon('openrouter.svg', true),
  OpenAI: icon('openai.svg', true),
  Figma: icon('figma.svg'),
  'Figma API': icon('figma.svg'),
  Firecrawl: icon('firecrawl.png'),
  'code.to.design': icon('codetodesign.png'),
  Slack: icon('slack.svg'),
  'Slack Bolt': icon('slack.svg'),
  Cloudflare: icon('cloudflare.svg'),
  'Cloudflare Turnstile': icon('cloudflare.svg'),
  Supabase: icon('supabase.svg'),
  Postgres: icon('postgresql.svg'),
  Puppeteer: icon('puppeteer.svg'),
  'Socket.io': icon('socketdotio.svg', true),
  Railway: icon('railway.svg', true),
  React: icon('react.svg'),
  Express: icon('express.svg', true),
  n8n: icon('n8n.svg'),
  Python: icon('python.svg'),
  'Power BI': icon('powerbi.svg'),
  'SQL Server': icon('sqlserver.svg'),
  Azure: icon('azure.svg'),
  'Google Sheets': icon('googlesheets.svg'),
  'YouTube API': icon('youtube.svg'),
  JavaScript: icon('javascript.svg'),
  TypeScript: icon('typescript.svg'),
  'Node.js': icon('nodedotjs.svg'),
  Airflow: icon('apacheairflow.svg'),
  dbt: icon('dbt.svg'),
  Terraform: icon('terraform.svg'),
  Prometheus: icon('prometheus.svg'),
  Grafana: icon('grafana.svg'),
  'GitHub Actions': icon('githubactions.svg'),
  // Spellings used in the About toolkit
  'Apache Airflow': icon('apacheairflow.svg'),
  'Claude Code': icon('claude.svg'),
  Codex: icon('openai.svg', true),
  Docker: icon('docker.svg'),
  PHP: icon('php.svg'),
}
