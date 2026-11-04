-- Private CV download counter (spec §9).
--
-- How to apply: Supabase dashboard → SQL Editor → paste this file → Run.
-- How to see the count: Table Editor → cv_downloads, or run
--   select count(*) from public.cv_downloads;
--   select date_trunc('day', downloaded_at) as day, count(*) from public.cv_downloads group by 1 order by 1 desc;
--
-- The website (anon key) may only INSERT. There is no select/update/delete policy for anon,
-- so nobody visiting the site can read or change the numbers. No personal data is stored.

create table if not exists public.cv_downloads (
  id bigint generated always as identity primary key,
  downloaded_at timestamptz not null default now(),
  page text check (char_length(page) <= 200)
);

alter table public.cv_downloads enable row level security;

drop policy if exists "anon can insert" on public.cv_downloads;
create policy "anon can insert" on public.cv_downloads
  for insert to anon
  with check (true);

-- Explicit grants: anon may insert only (Supabase defaults can be broader on new tables).
revoke all on public.cv_downloads from anon;
grant insert (page) on public.cv_downloads to anon;
