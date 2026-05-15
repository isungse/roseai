-- ROSE-AI contact form submissions
-- Run via: Supabase Studio -> SQL Editor -> paste -> Run

create table public.contact_inquiries (
  id          uuid primary key default gen_random_uuid(),
  company     text not null check (char_length(company) between 1 and 200),
  email       text not null check (char_length(email) between 3 and 320),
  message     text not null check (char_length(message) between 1 and 5000),
  locale      text not null check (locale in ('ko', 'en')),
  user_agent  text check (char_length(user_agent) <= 512),
  ip_hash     text check (char_length(ip_hash) <= 64),
  status      text not null default 'new'
              check (status in ('new', 'contacted', 'spam', 'archived')),
  notes       text,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create index contact_inquiries_created_at_desc_idx
  on public.contact_inquiries (created_at desc);

create index contact_inquiries_status_idx
  on public.contact_inquiries (status);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger contact_inquiries_set_updated_at
  before update on public.contact_inquiries
  for each row execute function public.set_updated_at();

-- RLS on: anon and authenticated roles have no policies = no access.
-- service_role (used by /api/contact server route) bypasses RLS.
alter table public.contact_inquiries enable row level security;
