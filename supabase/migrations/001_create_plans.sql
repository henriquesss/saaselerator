create table if not exists plans (
  id              text primary key default gen_random_uuid()::text,
  idea            text not null,
  business_canvas jsonb not null,
  mvp_plan        jsonb not null,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

-- Auto-update updated_at on row modification
create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger plans_updated_at
  before update on plans
  for each row
  execute function update_updated_at();
