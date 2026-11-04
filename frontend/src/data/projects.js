// Source of truth for every claim: spec §7 (.docs/.superpowers/specs/2026-11-04-portfolio-redesign-design.md).
// Rules: no invented numbers, estimates flagged, no revenue claims, demos/repos claim no results.

export const PROJECT_GROUPS = [
  {
    id: 'clients',
    title: 'Client work',
    blurb: 'Systems I built and run for clients, named with their OK.',
  },
  {
    id: 'employment',
    title: 'Employment: Brigada Distributions',
    blurb: 'Data Engineer / Analyst, Jan 2024 – Mar 2026. Pipelines, reports and automations the business ran on every day.',
  },
  {
    id: 'personal',
    title: 'Personal projects',
    blurb: 'Things I built on my own: a content automation and web apps you can open and click through.',
  },
]

export const PROJECTS = [
  // ── Client work ────────────────────────────────────────────────────
  // Facts from the client project folders (NEST PROJECT/, RESET PROJECT/ Context and READMEs, 2026-11-04).
  // Left out on purpose: their customers' and staff names, money figures, internal URLs.
  {
    slug: 'ai-email-builder',
    title: 'AI Email Builder',
    group: 'clients',
    client: 'nest-marketing',
    kind: 'real',
    context: 'Nest Marketing · AI tool',
    problem:
      'The agency built every campaign email by hand, which capped them at about 20 email flows a day.',
    built:
      'An AI pipeline that researches the brand, writes on-brand copy, designs the HTML email (checking its own render and fixing it), restages product photos, and exports an editable Figma file, all on a schedule.',
    result: {
      headline: '20 → 50+ emails a day (2.5×)',
      detail: 'More campaigns shipped every day, depending on the schedule set.',
      estimate: false,
    },
    // Estimated added revenue capacity (Jayvee, 2026-11-04): ~$50 per email (his figure), 30 extra emails/day, 22 workdays.
    // Capacity the tool makes possible, not revenue earned; shown as an estimate with its math.
    revenue: { monthly: 33000, basis: '30 extra emails/day × 22 workdays × ~$50/email' },
    highlights: [
      'Brand research, copywriting and email design in one run',
      'Self-critique loop: renders each email and fixes what looks wrong',
      'Exports straight to an editable Figma file',
      'Grew into an agency ops dashboard with task review, audit log and analytics',
    ],
    // From the project's code: .env key names and the APIs it calls (checked 2026-11-04).
    tools: ['Claude API', 'Gemini', 'OpenRouter', 'Figma API', 'Firecrawl', 'code.to.design', 'Slack', 'Cloudflare Turnstile', 'Supabase', 'Puppeteer', 'Socket.io', 'Railway'],
    links: {
      site: 'https://nestmarketing-emailbuilder.com/',
      video: 'https://www.loom.com/share/835389e31e2d4231bcfa530c9ab91598',
    },
    image: '/images/projects/ai-email-builder-preview.png',
  },
  {
    slug: 'nest-brain',
    title: 'Nest Brain',
    group: 'clients',
    client: 'nest-marketing',
    kind: 'real',
    context: 'Nest Marketing · Slack AI assistant · live',
    problem:
      'The team needed one place to ask about clients, channels and tasks, and task docs had to be turned into posts by hand. It also had to answer only people inside the agency.',
    built:
      'A Slack assistant that answers from the team’s own Slack history, turns uploaded task docs into task posts and schedule lists in the right channels, sends a daily health report, and refuses anyone outside the workspace.',
    result: {
      headline: '840+ tasks routed in its first 3 weeks',
      detail: 'Design and scheduling tasks posted from task docs, none sent twice; now in 226 channels.',
      estimate: false,
    },
    highlights: [
      'Answers questions from indexed Slack history',
      'Task docs become task posts and schedule lists automatically',
      'Members-only: nobody outside the workspace gets a reply',
      'Daily health report',
    ],
    tools: ['Node.js', 'TypeScript', 'Slack Bolt', 'Claude API', 'Postgres', 'Railway'],
    links: {},
  },
  {
    slug: 'campaign-alerts',
    title: 'Campaign Alerts',
    group: 'clients',
    client: 'nest-marketing',
    kind: 'real',
    context: 'Nest Marketing · n8n · live',
    problem:
      'A brand that was doing fine could suddenly perform badly, and nobody noticed until much later because every brand was checked by hand.',
    built:
      'n8n workflows that watch each brand’s Klaviyo flows and post to an alerts channel: week-over-week drops, zero-revenue days, outliers, and a weekly review.',
    result: {
      headline: 'Drops flagged automatically, every day',
      detail: 'Any brand whose flow results fall 25%+ week over week gets flagged; it already caught a brand that had stopped making sales.',
      estimate: false,
    },
    tools: ['n8n', 'Klaviyo', 'Slack', 'TypeScript'],
    links: {},
  },
  {
    slug: 'nest-audit-engine',
    title: 'Nest Audit Engine',
    group: 'clients',
    client: 'nest-marketing',
    kind: 'launching',
    status: 'Launching November 2026',
    context: 'Nest Marketing · outreach automation',
    problem:
      'Winning new clients meant researching each brand by hand, building a 9-page audit PDF, and emailing it one at a time.',
    built:
      'A pipeline that finds leads, skips existing clients, writes a branded 9-page audit with a check that nothing is invented, sends it for approval in Slack, then emails it with timed follow-ups and reply alerts.',
    highlights: [
      'Lead finder plus a daily exclusion list of current clients',
      'Every claim in the audit is checked against its source',
      'One-click approval in Slack before anything is sent',
    ],
    tools: ['Node.js', 'TypeScript', 'Claude API', 'Postgres', 'Railway'],
    links: {},
  },
  {
    slug: 'reset-dashboard',
    title: 'Business & CFO Dashboard',
    group: 'clients',
    client: 'reset',
    kind: 'real',
    context: 'Resét Skin & Aesthetics · live',
    problem:
      'The clinic’s numbers lived in separate tools and a finance spreadsheet that had to be updated by hand, so there was no single live view of bookings, marketing and finances.',
    built:
      'Two sign-in dashboards: a business board (bookings, capacity, customers, marketing, targets) and a CFO board (P&L, budget, cash, bank reconciliation), fed by a daily sync with health alerts.',
    result: {
      headline: 'No more manual finance updates',
      detail: 'Data syncs every morning from 6 sources, so the finance tab no longer needs updating by hand.',
      estimate: false,
    },
    highlights: [
      'Daily sync from bookings, accounting, email, analytics, ads and OneDrive',
      'CFO board limited to the finance team',
      'Danish and English',
    ],
    tools: ['TypeScript', 'Supabase', 'React', 'Cloudflare', 'GitHub Actions'],
    links: {},
  },

  {
    // Approved by Umar 2026-11-02 from Ryan's proposal; design decided, no code yet (Context/Project Details, 2026-11-02).
    slug: 'nest-guardrails',
    title: 'Nest Guardrails',
    group: 'clients',
    client: 'nest-marketing',
    kind: 'building',
    status: 'In progress',
    context: 'Nest Marketing · design QA assistant',
    problem:
      'Clients asked the team not to use a certain asset or element, and it still ended up in a design again, because their feedback was spread across people and months-old conversations.',
    building:
      'A Slack bot the team posts brand rules to, naming the brand and the rule. It saves each rule as its memory, updates it when a client changes their mind, and turns it into a Do’s and Don’ts checklist designers see before they finish a design.',
    highlights: [
      'One channel for every client’s brand rules',
      'Rules saved per brand and updated when they change',
      'A checklist designers see before finalising',
    ],
    tools: ['Slack', 'Grok', 'Figma'], // database not chosen yet; Grok per Umar 2026-11-02
    links: {},
  },
  {
    // Resét automation (RESET PROJECT/Rest n8n Automation/HANDOVER.md, 2026-11-03): sync live, first flows going live.
    // The plan's January figures are targets, not results, so none are shown.
    slug: 'reset-automation',
    title: 'Marketing Automation',
    group: 'clients',
    client: 'reset',
    kind: 'launching',
    status: 'Rolling out November 2026',
    context: 'Resét Skin & Aesthetics · n8n',
    problem:
      'The clinic wanted more repeat bookings without annoying customers: the right message at each step of the customer journey, and quality over quantity.',
    built:
      'A nightly n8n sync from the booking system into the email and SMS tool (live), plus journey flows for cancelled bookings, consultation follow-ups and treatments that are due, each with a stop-or-pause page and consent respected.',
    highlights: [
      'Nightly booking → email platform sync, live',
      'Each flow pinned to a step of the customer journey',
      'Customers can stop or pause messages themselves',
    ],
    tools: ['n8n', 'ActiveCampaign', 'Gecko Booking'],
    links: {},
  },
  {
    // User asked for SimGolf (2026-11-04): no mockup link, no mention of the data-collection robot, no results yet.
    slug: 'simgolf-platform',
    title: 'SimGolf Intelligence Platform',
    group: 'clients',
    client: 'simgolf',
    kind: 'launching',
    status: 'In progress',
    context: 'SimGolf · operations platform',
    problem:
      'Operations, finances, bookings and customers were spread across separate systems, with no single place to see how each centre was doing.',
    built:
      'One platform with clubhouse KPI dashboards, a steering-meeting view, a staff league and TV screens (Danish and English), on a database and API with team roles and an audit log, plus automated weekly reports.',
    highlights: [
      'Clubhouse KPI dashboard and steering-meeting view',
      'Team roles with an audit log',
      'Danish and English',
    ],
    tools: ['React', 'TypeScript', 'Postgres', 'Express', 'n8n'],
    links: {},
  },

  // ── Employment: Brigada Distributions (user grouping 2026-11-04) ────
  {
    slug: 'waybill-pdf-extraction',
    title: 'Waybill PDF Extraction',
    group: 'employment',
    kind: 'real',
    context: 'Operations team · n8n · daily',
    problem: 'Staff retyped data from scanned waybill PDFs into Excel by hand, about 2 hours every day.',
    built:
      'An n8n workflow that watches the upload folder, downloads each waybill PDF, extracts the fields, normalizes them, and appends a clean row to the Excel table.',
    result: {
      headline: '2 hrs → 5–10 min a day',
      detail: '~40 hrs/month of manual entry removed (about 110 min × 22 workdays).',
      estimate: true,
    },
    // Estimated cost saving: hours saved × staff rate ($25/hour, Jayvee's choice 2026-11-04). 40.3 h × $25 ≈ $1,000.
    saving: { monthly: 1000, basis: '~40 hrs/month × $25/hour' },
    highlights: ['Folder watcher picks up every new upload', 'Consistent field format before anything is saved'],
    tools: ['n8n', 'PDF extraction', 'JavaScript', 'Excel'],
    links: {},
    image: '/images/projects/extract-waybill-pdf-data-workflow.png',
  },
  {
    slug: 'power-bi-refresh-monitor',
    title: 'Power BI Refresh Monitor',
    group: 'employment',
    kind: 'real',
    context: 'Reporting · n8n + Power BI',
    problem: 'Power BI datasets were refreshed by hand in the app, so a missed or failed refresh meant people read stale numbers.',
    built:
      'An n8n workflow that refreshes the datasets up to 8 times a day, checks the refresh history to confirm each run really finished, and posts the outcome to Microsoft Teams.',
    result: {
      headline: 'Zero manual refreshes',
      detail: 'Up to 8 verified refreshes a day, with a Teams alert if one fails.',
      estimate: false,
    },
    highlights: ['Confirms each refresh actually completed', 'Success and failure both reported in Teams'],
    tools: ['n8n', 'Power BI', 'Microsoft Teams'],
    links: {},
    image: '/images/projects/power-bi-refresh-workflow.png',
  },
  {
    slug: 'consolidate-raw-collection-data',
    title: 'Consolidate Raw Collection Data',
    group: 'employment',
    kind: 'real',
    context: 'Collections team · n8n + AI',
    problem: 'Collectors checked every incoming file by hand for renamed, missing or wrong column names before the data could be appended.',
    built:
      'An n8n workflow that detects new files in OneDrive, compares their columns with the target Excel structure, lets an AI step work out the correct mapping, and appends the cleaned records.',
    result: {
      headline: 'Manual column checks removed',
      detail: 'Files land in the right structure without anyone checking them first.',
      estimate: false,
    },
    tools: ['n8n', 'OneDrive', 'AI', 'Excel'],
    links: {},
    image: '/images/projects/consolidate-raw-collection-data-workflow.png',
  },
  {
    slug: 'data-sync-sql-server',
    title: 'Data Sync to SQL Server',
    group: 'employment',
    kind: 'real',
    context: 'Data team · n8n + Microsoft Graph',
    problem: 'Data was spread across Power BI datasets and many collectors’ Excel files, so keeping one central table current meant exporting and pasting by hand.',
    built:
      'Three automated syncs into one SQL Server source: Power BI datasets (only after a successful refresh), OneDrive Excel files across every collector’s folders, and SharePoint files via a secured Graph webhook that reprocesses only what changed.',
    result: {
      headline: 'Zero manual exports',
      detail: 'Data lands in SQL Server on its own, with success and failure alerts.',
      estimate: false,
    },
    highlights: [
      'Power BI → SQL Server: checks refresh status first so stale data is never synced',
      'OneDrive Excel → SQL Server: scans every collector’s folders via Microsoft Graph',
      'SharePoint → SQL Server: validated webhook + delta queries, only changed files reprocessed',
    ],
    tools: ['n8n', 'SQL Server', 'Power BI', 'Microsoft Graph', 'Webhooks'],
    links: {},
    image: '/images/projects/onedrive-excel-sql-sync-workflow.png',
  },
  {
    slug: 'ai-sales-forecast',
    title: 'AI Sales Forecast',
    group: 'employment',
    kind: 'real',
    context: 'Sales team · n8n + Python',
    problem: 'There was no automated daily sales forecast; any forecast meant pulling the numbers together by hand.',
    built:
      'A daily 8:00 AM workflow that pulls multi-year sales data from SQL Server (trends, top products and customers, year-on-year, discounts, seasonality), adds PH holidays, and blends a LightGBM model with a Gemini forecasting agent into one report.',
    result: {
      headline: 'A forecast report every morning at 8:00 AM',
      detail: 'Built and delivered automatically, with nobody assembling it.',
      estimate: false,
    },
    highlights: [
      'Multi-year SQL history with seasonality and PH holiday enrichment',
      'LightGBM model blended with a Gemini agent (weighted hybrid)',
      'Runs on a daily schedule, no manual step',
    ],
    tools: ['n8n', 'SQL Server', 'Python', 'LightGBM', 'Gemini'],
    links: {},
    image: '/images/projects/ai-sales-hybrid-forecast-workflow.png',
  },
  {
    slug: 'azure-ecommerce-etl',
    title: 'Azure E-Commerce ETL Pipeline',
    group: 'employment',
    kind: 'repo',
    context: 'Data engineering · Python',
    problem: 'Raw API data isn’t ready for analytics until it’s cleaned, modeled and served reliably.',
    whatItDoes: 'Ingests e-commerce data from a REST API through a Bronze → Silver → Gold medallion design on ADLS Gen2, models it with dbt, serves it from Synapse, orchestrated by Airflow.',
    tools: ['Airflow', 'ADLS Gen2', 'dbt', 'Synapse'],
    links: { code: 'https://github.com/jayveecanlas8686-pixel/azure-ecommerce-etl-pipeline' },
  },
  {
    slug: 'azure-realtime-stock-pipeline',
    title: 'Azure Real-Time Stock Pipeline',
    group: 'employment',
    kind: 'repo',
    context: 'Streaming · Python',
    problem: 'Live market data is only useful if it’s aggregated and enriched in near real time.',
    whatItDoes: 'Streams live stock ticks through Event Hubs, computes OHLCV micro-batches and indicators (SMA, RSI, Bollinger Bands), and serves them from Synapse. Infrastructure in Terraform, monitored with Prometheus and Grafana.',
    tools: ['Event Hubs', 'Terraform', 'Prometheus', 'Grafana'],
    links: { code: 'https://github.com/jayveecanlas8686-pixel/azure-realtime-stock-pipeline' },
  },
  {
    slug: 'azure-data-quality-framework',
    title: 'Azure Data Quality Framework',
    group: 'employment',
    kind: 'repo',
    context: 'Data quality · Python',
    problem: 'Bad data quietly breaks reports long before anyone notices.',
    whatItDoes: 'A reusable framework where every table has a Great Expectations suite that runs daily, results are kept for trending, and failures alert Teams immediately.',
    tools: ['Great Expectations', 'Airflow', 'Synapse'],
    links: { code: 'https://github.com/jayveecanlas8686-pixel/azure-data-quality-framework' },
  },

  // ── Personal projects ──────────────────────────────────────────────
  {
    slug: 'youtube-shorts-generator',
    title: 'YouTube Shorts Generator',
    group: 'personal',
    kind: 'personal',
    context: 'Personal project · content automation',
    problem: 'Making short videos eats a content creator’s time: scripting, generating, editing and uploading, every single day.',
    built:
      'A scheduled n8n workflow: Gemini writes each script (checking a Google Sheet so ideas never repeat), Veo generates the clips with retries, json2video stitches them, and the YouTube API publishes.',
    result: {
      headline: '2 Shorts a day, hands-off',
      detail: 'From idea to published video with no editing time.',
      estimate: false,
    },
    tools: ['n8n', 'Gemini', 'Veo', 'json2video', 'YouTube API'],
    links: {},
    image: '/images/projects/yt-content-and-posting.png',
  },
  {
    slug: 'shophub',
    title: 'ShopHub',
    group: 'personal',
    kind: 'demo',
    context: 'E-commerce · live demo',
    problem: 'Small shops need a store customers can actually finish buying from.',
    whatItDoes: 'A marketplace with catalog, categories and search, cart and checkout, and customer accounts with order history.',
    tools: ['E-commerce'],
    links: { demo: 'https://jayveecanlas8686-pixel.github.io/ShopHub/' },
    image: '/images/projects/shophub-preview.png',
  },
  {
    slug: 'nexuscrm',
    title: 'NexusCRM',
    group: 'personal',
    kind: 'demo',
    context: 'CRM · live demo',
    problem: 'Sales teams lose deals when leads live in spreadsheets and inboxes.',
    whatItDoes: 'Customer, lead and deal pipelines with sales automation, workflow tools and reporting dashboards.',
    tools: ['CRM'],
    links: { demo: 'https://jayveecanlas8686-pixel.github.io/CRM/' },
    image: '/images/projects/nexuscrm-preview.png',
  },
  {
    slug: 'medicare-plus',
    title: 'MediCare+',
    group: 'personal',
    kind: 'demo',
    context: 'Healthcare · live demo',
    problem: 'Patients waste time calling clinics to find a free slot.',
    whatItDoes: 'Search doctors by specialty and location, see real-time availability, and book online.',
    tools: ['Healthcare'],
    links: { demo: 'https://jayveecanlas8686-pixel.github.io/HealthCare/' },
    image: '/images/projects/healthcare-preview.png',
  },
  {
    slug: 'stayease',
    title: 'StayEase',
    group: 'personal',
    kind: 'demo',
    context: 'Hospitality · live demo',
    problem: 'Hotels lose bookings to clunky reservation flows.',
    whatItDoes: 'End-to-end hotel and resort reservations: room browsing, booking and guest management.',
    tools: ['Booking'],
    links: { demo: 'https://jayveecanlas8686-pixel.github.io/HotelBooking/' },
    image: '/images/projects/hotel-booking-preview.png',
  },
  {
    slug: 'ai-chat-support',
    title: 'AI Chat Support',
    group: 'personal',
    kind: 'demo',
    context: 'Customer support · live demo',
    problem: 'Support teams answer the same questions all day.',
    whatItDoes: 'A website chat widget that handles FAQs automatically, with an analytics dashboard for chat performance.',
    tools: ['AI chatbot'],
    links: { demo: 'https://jayveecanlas8686-pixel.github.io/ChatbotPlatform/' },
    image: '/images/projects/chatbot-platform-preview.png',
  },
]

export function getProject(slug) {
  return PROJECTS.find((p) => p.slug === slug)
}
