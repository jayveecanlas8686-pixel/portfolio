const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");
const navLinks = document.querySelectorAll(".site-nav a");
const imageModal = document.querySelector("#image-modal");
const imageModalImg = imageModal.querySelector("img");
const imageModalClose = imageModal.querySelector(".image-modal-close");
const imageZoomTriggers = document.querySelectorAll(".image-zoom-trigger");
const sitePreviewModal = document.querySelector("#site-preview-modal");
const sitePreviewFrame = sitePreviewModal.querySelector("iframe");
const sitePreviewClose = sitePreviewModal.querySelector(".site-preview-close");
const sitePreviewTriggers = document.querySelectorAll(".preview-site-trigger");

navToggle.addEventListener("click", () => {
  const isOpen = siteNav.classList.toggle("is-open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    siteNav.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

imageZoomTriggers.forEach((trigger) => {
  trigger.addEventListener("click", () => {
    const image = trigger.querySelector("img");
    imageModalImg.src = image.src;
    imageModalImg.alt = image.alt;
    imageModal.classList.add("is-open");
    imageModal.setAttribute("aria-hidden", "false");
    imageModalClose.focus();
  });
});

const closeImageModal = () => {
  imageModal.classList.remove("is-open");
  imageModal.setAttribute("aria-hidden", "true");
  imageModalImg.src = "";
  imageModalImg.alt = "";
};

imageModalClose.addEventListener("click", closeImageModal);

imageModal.addEventListener("click", (event) => {
  if (event.target === imageModal) {
    closeImageModal();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && imageModal.classList.contains("is-open")) {
    closeImageModal();
  }

  if (event.key === "Escape" && sitePreviewModal.classList.contains("is-open")) {
    closeSitePreview();
  }
});

const attachSitePreviewTrigger = (trigger) => {
  trigger.addEventListener("click", () => {
    sitePreviewFrame.src = trigger.dataset.previewUrl;
    sitePreviewModal.classList.add("is-open");
    sitePreviewModal.setAttribute("aria-hidden", "false");
    sitePreviewClose.focus();
  });
};

sitePreviewTriggers.forEach(attachSitePreviewTrigger);

const closeSitePreview = () => {
  sitePreviewModal.classList.remove("is-open");
  sitePreviewModal.setAttribute("aria-hidden", "true");
  sitePreviewFrame.src = "";
};

sitePreviewClose.addEventListener("click", closeSitePreview);

sitePreviewModal.addEventListener("click", (event) => {
  if (event.target === sitePreviewModal) {
    closeSitePreview();
  }
});

const revealTargets = document.querySelectorAll(
  ".project-card, .expertise-item, .skill-card, .contact-panel, .stat-card, .cert-card"
);

revealTargets.forEach((el, i) => {
  el.classList.add("reveal-item");
  el.style.transitionDelay = `${(i % 3) * 80}ms`;
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.07, rootMargin: "0px 0px -36px 0px" }
);

revealTargets.forEach((el) => revealObserver.observe(el));

const navSections = Array.from(navLinks)
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

const setActiveNavLink = () => {
  const threshold = document.querySelector(".site-header").offsetHeight + 40;
  let currentId = navSections[0].id;

  navSections.forEach((section) => {
    if (section.getBoundingClientRect().top <= threshold) {
      currentId = section.id;
    }
  });

  const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
  if (atBottom) currentId = navSections[navSections.length - 1].id;

  navLinks.forEach((link) => {
    link.classList.toggle("is-active", link.getAttribute("href") === `#${currentId}`);
  });
};

let navSpyTicking = false;
window.addEventListener("scroll", () => {
  if (navSpyTicking) return;
  navSpyTicking = true;
  requestAnimationFrame(() => {
    setActiveNavLink();
    navSpyTicking = false;
  });
});

setActiveNavLink();

const PROJECT_DETAILS = {
  "ai-email-builder": [
    "Brand diagnostics via Firecrawl (website crawl) and the Figma REST API (style reference) build a persistent per-brand profile, so context doesn't need re-explaining on every run",
    "Claude writes on-brand copy, then designs the full HTML email — rendered headlessly with Puppeteer, screenshotted, self-critiqued, and fixed in a loop until it looks right",
    "Real product photos are matched to template slots, deduped, and restaged into premium hero/lifestyle shots via an AI image model, with brand-matched icon generation",
    "Finished HTML is converted into editable Figma layers via code.to.design/html.to.design, with a manual clipboard-paste fallback",
    "Live pipeline progress streamed over Socket.io; a startup sweep fails orphaned jobs after a restart instead of running a queue/cron system",
    "Grew into a fuller agency-ops dashboard: a Slack-integrated task/review system, audit logging per entity, brand asset management, and usage analytics",
  ],
  "consolidate-raw-collection-data": [
    "OneDrive trigger for newly uploaded collection files",
    "AI-assisted column matching and correction",
    "Cleaned records appended into an Excel table",
  ],
  "power-bi-refresh-monitor": [
    "Scheduled Power BI dataset refresh workflow",
    "Refresh history and status validation",
    "Success and failure alerts sent to Microsoft Teams",
  ],
  "waybill-pdf-extraction": [
    "Folder trigger for new waybill PDF uploads",
    "Automated PDF data extraction and formatting",
    "Excel table append for organized tracking",
  ],
  "ai-sales-forecast": [
    "Daily-triggered SQL extraction covering revenue trends, top products/customers, YoY comparisons, discounts, and seasonality",
    "PH holiday data enrichment combined with LightGBM machine learning forecasts",
    "Gemini AI forecasting agent blended into a dynamic weighted hybrid ensemble with automated report generation",
  ],
  "etl-pbi-sql-server": [
    "Power BI dataset extraction and refresh-status handling",
    "SQL Server insert and update logic for synced records",
    "Operational notifications for process success or failure",
  ],
  "onedrive-excel-sql-sync": [
    "Recursive OneDrive folder and subfolder scanning across multiple collectors",
    "Excel table extraction via Microsoft Graph with header-to-row JSON mapping",
    "Automated insert/update sync of consolidated records into SQL Server",
  ],
  "youtube-shorts-generator": [
    "Idea generation — reads past ideas from Google Sheets to avoid repeats, searches trending “did you know” videos for context, then uses Gemini to generate a new trivia script and logs it back to the Sheet",
    "Per-segment video generation (looped) — generates a reference image, submits to Veo, polls until complete, retries if the safety filter blocks it, then uploads the clean segment to Drive",
    "Final assembly & publish — stitches all segments via json2video.com, polls until rendering completes, uploads to Drive, prepares title/description/tags, publishes to YouTube, and marks as published in the Sheet",
  ],
  "sharepoint-graph-webhook": [
    "Webhook intake & validation — receives Graph change notifications, branches on subscription handshake vs. real notification, responds with a validation token or 202 acknowledgement, and verifies client state for security",
    "Delta sync — retrieves the stored delta token, queries Graph's delta API, merges paginated results, persists the new delta link, then filters and normalizes only the relevant changed files",
    "Per-file loop — for each changed file, reads named Excel tables via Graph API, resolves the target SQL table, cleans the data, and performs a delete-then-insert refresh to keep SQL Server in sync",
  ],
  "azure-ecommerce-etl": [
    "Medallion architecture (Bronze raw → Silver clean → Gold analytics-ready) with Hive-style partitioning for predicate pushdown",
    "Idempotent re-runs via _row_hash deduplication; rejected rows written to an audit path with a rejection reason",
    "Incremental dbt models (fct_orders, dim_customers) with CI/CD via GitHub Actions on every push",
  ],
  "azure-realtime-stock": [
    "Async stock tick producer publishing to Event Hubs with a partition key per ticker for guaranteed ordering",
    "Consumer computing OHLCV windows and writing via idempotent MERGE operations; offset-tracked via Blob Checkpoint Store",
    "Stream processor computing SMA, RSI (Wilder's EWM), Bollinger Bands, and 3σ anomaly detection",
  ],
  "azure-data-quality": [
    "Expectation suites as version-controlled Python (products, orders, stock OHLCV) running via an Airflow DAG after ETL completion",
    "DQ results written to Synapse for queryable trend history — success-rate drops are visible over time, not just pass/fail per run",
    "HTML report + Prometheus metrics endpoint (dq_success_pct, dq_failed_expectations) for Grafana dashboards",
  ],
  shophub: [
    "Product catalog with categories and search",
    "Shopping cart and checkout flow",
    "Customer account and order management",
  ],
  nexuscrm: [
    "Customer, lead, and deal pipeline management",
    "Sales automation and workflow tools",
    "Analytics dashboards and reporting",
  ],
  "medicare-plus": [
    "Doctor search by specialty and location",
    "Real-time availability and appointment booking",
    "Patient-friendly booking and account interface",
  ],
  stayease: [
    "Room browsing and availability display",
    "Reservation and booking workflow",
    "Guest management interface",
  ],
  "ai-chat-support": [
    "AI-powered live chat widget for websites",
    "Automated customer support and FAQ handling",
    "Analytics dashboard for chat performance",
  ],
};

const projectCards = document.querySelectorAll(".project-card[data-project]");
const projectModal = document.querySelector("#project-modal");
const projectModalClose = projectModal.querySelector(".project-modal-close");
const projectModalMedia = projectModal.querySelector(".project-modal-media");
const projectModalCategory = projectModal.querySelector(".project-modal-category");
const projectModalStack = projectModal.querySelector(".project-modal-stack");
const projectModalTitle = projectModal.querySelector("#project-modal-title");
const projectModalDesc = projectModal.querySelector(".project-modal-desc");
const projectModalPoints = projectModal.querySelector(".project-modal-points");
const projectModalTags = projectModal.querySelector(".project-tags");
const projectModalActions = projectModal.querySelector(".project-actions");

const openProjectModal = (card) => {
  const slug = card.dataset.project;
  const categoryHeading = card.closest(".project-category")?.querySelector(".project-category-heading h3");
  const thumbTag = card.querySelector(".thumb-tag");
  const thumbImg = card.querySelector(".project-thumb img");
  const codeThumb = card.querySelector(".project-thumb-code");

  projectModalMedia.replaceChildren();
  if (thumbImg) {
    const img = document.createElement("img");
    img.src = thumbImg.src;
    img.alt = thumbImg.alt;
    projectModalMedia.classList.toggle("is-contain", card.querySelector(".workflow-thumb") !== null);
    projectModalMedia.appendChild(img);
  } else if (codeThumb) {
    projectModalMedia.classList.remove("is-contain");
    projectModalMedia.appendChild(codeThumb.cloneNode(true));
  }

  projectModalCategory.textContent = categoryHeading ? categoryHeading.textContent.trim() : "";
  projectModalStack.textContent = thumbTag ? thumbTag.textContent.trim() : "";
  projectModalTitle.textContent = card.querySelector(".project-body h3")?.textContent.trim() || "";
  projectModalDesc.textContent = card.querySelector(".project-body p")?.textContent.trim() || "";

  projectModalPoints.replaceChildren(
    ...(PROJECT_DETAILS[slug] || []).map((point) => {
      const li = document.createElement("li");
      li.textContent = point;
      return li;
    })
  );

  const tagsSource = card.querySelector(".project-tags");
  projectModalTags.replaceChildren(
    ...(tagsSource ? Array.from(tagsSource.children).map((el) => el.cloneNode(true)) : [])
  );

  const actionsSource = card.querySelector(".project-actions");
  projectModalActions.replaceChildren(
    ...(actionsSource ? Array.from(actionsSource.children).map((el) => el.cloneNode(true)) : [])
  );
  projectModalActions.querySelectorAll(".preview-site-trigger").forEach(attachSitePreviewTrigger);

  projectModal.classList.add("is-open");
  projectModal.setAttribute("aria-hidden", "false");
  projectModalClose.focus();
};

const closeProjectModal = () => {
  projectModal.classList.remove("is-open");
  projectModal.setAttribute("aria-hidden", "true");
};

projectCards.forEach((card) => {
  card.addEventListener("click", (event) => {
    if (event.target.closest("a, button")) return;
    openProjectModal(card);
  });
});

projectModalClose.addEventListener("click", closeProjectModal);

projectModal.addEventListener("click", (event) => {
  if (event.target === projectModal) closeProjectModal();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && projectModal.classList.contains("is-open")) {
    closeProjectModal();
  }
});
