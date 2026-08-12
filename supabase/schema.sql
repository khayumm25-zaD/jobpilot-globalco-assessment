-- JobPilot database schema
create extension if not exists "uuid-ossp";

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  created_at timestamptz default now()
);

create table if not exists public.applications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  company text not null,
  role text not null,
  location text,
  job_url text,
  status text not null default 'Applied'
    check (status in ('Applied','Assessment','Interview','Offer','Rejected')),
  salary text,
  notes text,
  applied_date date default current_date,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index if not exists applications_user_id_idx on public.applications(user_id);

alter table public.profiles enable row level security;
alter table public.applications enable row level security;

create policy "profiles own row" on public.profiles
  for all using (auth.uid() = id) with check (auth.uid() = id);

create policy "applications own rows" on public.applications
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, coalesce(new.raw_user_meta_data->>'full_name', ''));
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure public.handle_new_user();
