# Agent guardrails

Short, hard limits for any agent working in this repo. The full standing
rules are indexed in [`CLAUDE.md`](CLAUDE.md); this file is only the
must-not-break list. Add project-specific guardrails below (e.g. upload
size limits, tables that must never be truncated, rate-limited APIs).

- Read the relevant files in `Context/` before planning or building.
- Commit and push to `staging` only. Never touch `main`.
- `.env` and `node_modules/` live only in `backend/` or `frontend/`. Never
  print, log or commit a secret.
- Authenticate GitHub, Vercel, Railway and Supabase with the tokens in
  `backend/.env`, never an ambient CLI login.
- Never run destructive DB operations (drop, truncate, mass delete,
  migrations against production) without the user's explicit go-ahead.
- Plans, specs and task docs go in `.docs/.superpowers/` (gitignored).

## Project-specific guardrails

(none yet)
