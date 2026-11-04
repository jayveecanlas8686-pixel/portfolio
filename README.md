# Jayvee Canlas portfolio

Personal portfolio for clients and employers. Every project reads as problem → what I built → result, with a privately counted Download CV button.

## Structure

```
frontend/     React + Vite site (Tailwind v4, React Router, Vitest), frontend/.env
backend/      Supabase SQL for the CV counter (backend/supabase/), tooling tokens in backend/.env
Context/      reference material, notes, access list (gitignored)
.docs/.superpowers/   specs → plans → sdd task docs (gitignored)
.claude/      standing rules and skills (not committed)
```

All site content lives in `frontend/src/data/` (`profile.js`, `projects.js`, `services.js`, `about.js`). Images, certificates and the CV PDF are in `frontend/public/`.

## Run locally

```bash
cd frontend
npm ci
npm run dev        # http://localhost:5173
npm test           # Vitest
npm run build      # production build to frontend/dist
```

Copy `frontend/.env.example` to `frontend/.env` only if you want to test the CV counter locally. It stays off unless `VITE_CV_COUNTER=on`.

## Environments & deploy

- **Branches:** work and push on `staging` only. `main` is promoted by a manual PR on GitHub.
- **Hosting:** Vercel project `jayvee-canlas`, live at https://jayvee-canlas.vercel.app. It's connected to this repo with **Root Directory = `frontend`** (framework: Vite). `staging` gets preview deploys; `main` is the production branch. `frontend/vercel.json` rewrites every path to `index.html`, so deep links like `/projects/ai-email-builder` work.
- **Share previews:** `og:image`, `og:url` and the canonical link in `frontend/index.html` use the absolute live domain. Update them if the domain changes.
- **Old site:** still served by the old Vercel project (`portfolio-tau-black-54.vercel.app`) and GitHub Pages until they're retired.

## CV download counter (private)

1. Create a Supabase project, then open **SQL Editor**, paste `backend/supabase/cv_downloads.sql` and run it.
2. In Vercel → Project → Settings → Environment Variables, set these for **Production only**:
   `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, `VITE_CV_COUNTER=on`. Then redeploy.
3. Read the count in Supabase → Table Editor → `cv_downloads`, or run `select count(*) from cv_downloads;`.

The site can only insert rows; visitors can't read the numbers. Preview and local clicks never count.

## Operations runbook

- **Deploy:** push `staging` → check the Vercel preview → open a PR `staging` → `main` on GitHub and merge it.
- **Roll back:** in Vercel → Deployments, promote the previous production deployment, then revert the commit on `staging`.
- **Rotate the anon key:** Supabase → Project Settings → API, then update `VITE_SUPABASE_ANON_KEY` in Vercel (Production) and redeploy.
- **Tokens** for GitHub, Vercel, Railway and Supabase tooling live in `backend/.env`. Never commit them.
- **Logs:** Vercel → Deployments → Build Logs; Supabase → Logs.
