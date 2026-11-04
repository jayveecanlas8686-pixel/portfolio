# <Project name>

<One or two lines: what this project is and who it's for.>

## Structure

```
backend/      server, DB, services, backend/.env
frontend/     UI, frontend/.env
shared/       code used by both sides (types, schemas, constants)
Context/      client brief, plan, brand, messages, access list (gitignored)
.docs/.superpowers/   specs → plans → sdd task docs (gitignored)
.claude/      standing rules (rules/) and skill routing (skills/)
```

## Run locally

```bash
cd backend && npm ci && npm run dev
cd frontend && npm ci && npm run dev
```

## Environments & deploy

- Branch: work on `staging`; `main` is promoted by a manual PR on GitHub.
- Hosting: <Vercel / Railway / other>
- Database: <Supabase / SQL Server / other>

## Operations runbook

<How to deploy, roll back, rotate a key, and where logs live.>
