-- Profiles table with roles
create type user_role as enum ('admin', 'welearn_student', 'student');

create table if not exists profiles (
  id            uuid references auth.users(id) on delete cascade primary key,
  email         text unique not null,
  full_name     text,
  avatar_url    text,
  role          user_role not null default 'student',
  enrolled_at   timestamptz,
  language      text,          -- active learning language
  level         text,          -- current level (A1, A2, etc.)
  created_at    timestamptz default now(),
  updated_at    timestamptz default now()
);

-- Auto-create profile on signup
create or replace function handle_new_user()
returns trigger language plpgsql security definer as $$
declare
  assigned_role user_role;
begin
  -- Assign admin role by email
  if new.email in ('josedavidduartesilva@gmail.com', 'david.duartes182@gmail.com') then
    assigned_role := 'admin';
  elsif new.email = 'zhanna.korzh@gmail.com' then
    assigned_role := 'admin';
  else
    assigned_role := 'student';
  end if;

  insert into profiles (id, email, full_name, role)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1)),
    assigned_role
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure handle_new_user();

-- RLS
alter table profiles enable row level security;

create policy "Users can view own profile"
  on profiles for select using (auth.uid() = id);

create policy "Admins can view all profiles"
  on profiles for select
  using (exists (
    select 1 from profiles p where p.id = auth.uid() and p.role = 'admin'
  ));

create policy "Users can update own profile"
  on profiles for update using (auth.uid() = id);

-- Exam results table
create table if not exists exam_results (
  id          uuid default gen_random_uuid() primary key,
  user_id     uuid references profiles(id) on delete cascade not null,
  exam_slug   text not null,
  mock_id     text not null,
  score       int,
  time_taken  int,  -- seconds
  answers     jsonb,
  completed_at timestamptz default now()
);

alter table exam_results enable row level security;

create policy "Users can view own results"
  on exam_results for select using (auth.uid() = user_id);

create policy "Users can insert own results"
  on exam_results for insert with check (auth.uid() = user_id);

create policy "Admins can view all results"
  on exam_results for select
  using (exists (
    select 1 from profiles p where p.id = auth.uid() and p.role = 'admin'
  ));
