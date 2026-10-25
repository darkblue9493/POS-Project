-- Run this once in Supabase: SQL Editor > New query > Run.
-- Vedrix POS keeps its shared stores, orders, inventory, users, and receipts
-- together in one versioned state document.

create table if not exists public.pos_state (
  id text primary key,
  state jsonb not null,
  updated_at timestamptz not null default now()
);

alter table public.pos_state enable row level security;

-- No public policies are created. Vedrix POS writes through its server using
-- SUPABASE_SERVICE_ROLE_KEY, which must never be placed in browser code.
