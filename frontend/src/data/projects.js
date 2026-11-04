// Source of truth for every claim: spec §7 (.docs/.superpowers/specs/2026-11-04-portfolio-redesign-design.md).
// Rules: no invented numbers, estimates flagged, no revenue claims, demos/repos claim no results.

export const PROJECT_GROUPS = [
  {
    id: 'automation',
    title: 'Automation',
    blurb: 'Workflows that took manual work off a team, every day.',
  },
  {
    id: 'data-ai',
    title: 'Data & AI tools',
    blurb: 'AI built into real work: content at scale and daily forecasts.',
  },
  {
    id: 'demos',
    title: 'Builds & demos',
    blurb: 'Working web apps you can open and click through.',
  },
  {
    id: 'repos',
    title: 'Data engineering repos',
    blurb: 'Production-style pipelines, open on GitHub.',
  },
]

export const PROJECTS = [
  // ── Data & AI tools ────────────────────────────────────────────────
  {
    slug: 'ai-email-builder',
    title: 'AI Email Builder',
    group: 'data-ai',
    kind: 'real',
    context: 'Marketing agency · AI tool',
    problem:
      'The agency built every campaign email by hand, which capped them at about 20 email flows a day.',
    built:
      'An AI pipeline that researches the brand, writes on-brand copy, designs the HTML email (checking its own render and fixing it), restages product photos, and exports an editable Figma file, all on a schedule.',
    result: {
      headline: '20 → 50+ emails a day (2.5×)',
      detail: 'More campaigns shipped every day, depending on the schedule set.',
      estimate: false,
    },
    highlights: [
      'Brand research, copywriting and email design in one run',
      'Self-critique loop: renders each email and fixes what looks wrong',
      'Exports straight to an editable Figma file',
      'Grew into an agency ops dashboard with task review, audit log and analytics',
    ],
    tools: ['Claude API', 'Figma API', 'Puppeteer', 'Socket.io', 'Supabase'],
    links: {
      site: 'https://nestmarketing-emailbuilder.com/',
      video: 'https://www.loom.com/share/835389e31e2d4231bcfa530c9ab91598',
    },
    image: '/images/projects/ai-email-builder-preview.png',
  },
  {
    slug: 'ai-sales-forecast',
    title: 'AI Sales Forecast',
    group: 'data-ai',
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

  // ── Automation ─────────────────────────────────────────────────────
  {
    slug: 'waybill-pdf-extraction',
    title: 'Waybill PDF Extraction',
    group: 'automation',
    kind: 'real',
    context: 'Operations team · n8n · daily',
    problem: 'Staff retyped data from scanned waybill PDFs into Excel by hand: about 2 hours every day, with typos slipping into reports.',
    built:
      'An n8n workflow that watches the upload folder, downloads each waybill PDF, extracts the fields, normalizes them, and appends a clean row to the Excel table.',
    result: {
      headline: '2 hrs → 5–10 min a day',
      detail: '~40 hrs/month of manual entry removed (about 110 min × 22 workdays).',
      estimate: true,
    },
    highlights: ['Folder watcher picks up every new upload', 'Consistent field format before anything is saved'],
    tools: ['n8n', 'PDF extraction', 'JavaScript', 'Excel'],
    links: {},
    image: '/images/projects/extract-waybill-pdf-data-workflow.png',
  },
  {
    slug: 'power-bi-refresh-monitor',
    title: 'Power BI Refresh Monitor',
    group: 'automation',
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
    group: 'automation',
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
    group: 'automation',
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
    slug: 'youtube-shorts-generator',
    title: 'YouTube Shorts Generator',
    group: 'automation',
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

  // ── Builds & demos ─────────────────────────────────────────────────
  {
    slug: 'shophub',
    title: 'ShopHub',
    group: 'demos',
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
    group: 'demos',
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
    group: 'demos',
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
    group: 'demos',
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
    group: 'demos',
    kind: 'demo',
    context: 'Customer support · live demo',
    problem: 'Support teams answer the same questions all day.',
    whatItDoes: 'A website chat widget that handles FAQs automatically, with an analytics dashboard for chat performance.',
    tools: ['AI chatbot'],
    links: { demo: 'https://jayveecanlas8686-pixel.github.io/ChatbotPlatform/' },
    image: '/images/projects/chatbot-platform-preview.png',
  },

  // ── Data engineering repos ─────────────────────────────────────────
  {
    slug: 'azure-ecommerce-etl',
    title: 'Azure E-Commerce ETL Pipeline',
    group: 'repos',
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
    group: 'repos',
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
    group: 'repos',
    kind: 'repo',
    context: 'Data quality · Python',
    problem: 'Bad data quietly breaks reports long before anyone notices.',
    whatItDoes: 'A reusable framework where every table has a Great Expectations suite that runs daily, results are kept for trending, and failures alert Teams immediately.',
    tools: ['Great Expectations', 'Airflow', 'Synapse'],
    links: { code: 'https://github.com/jayveecanlas8686-pixel/azure-data-quality-framework' },
  },
]

export function getProject(slug) {
  return PROJECTS.find((p) => p.slug === slug)
}
