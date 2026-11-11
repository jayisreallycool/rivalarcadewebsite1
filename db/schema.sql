-- RivalArcade marketing site schema (PostgreSQL 14+). Idempotent: safe to run repeatedly.

create table if not exists admin_users (
  id            bigserial primary key,
  email         text not null unique,
  name          text not null default '',
  password_hash text not null,
  role          text not null default 'editor' check (role in ('owner', 'editor')),
  active        boolean not null default true,
  created_at    timestamptz not null default now(),
  last_login_at timestamptz
);

create table if not exists admin_sessions (
  token_hash text primary key,
  user_id    bigint not null references admin_users(id) on delete cascade,
  created_at timestamptz not null default now(),
  expires_at timestamptz not null,
  ip         text,
  user_agent text
);
create index if not exists admin_sessions_user on admin_sessions(user_id);

create table if not exists posts (
  id              bigserial primary key,
  slug            text not null unique,
  kind            text not null default 'blog' check (kind in ('blog', 'news')),
  title           text not null,
  excerpt         text not null default '',
  body            text not null default '',
  category        text not null default 'Guides',
  tags            text[] not null default '{}',
  cover_image     text,
  cover_alt       text not null default '',
  author          text not null default 'RivalArcade Team',
  status          text not null default 'draft' check (status in ('draft', 'published')),
  featured        boolean not null default false,
  publish_at      timestamptz,
  seo_title       text,
  seo_description text,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);
create index if not exists posts_live on posts(status, publish_at desc);

create table if not exists media (
  id           bigserial primary key,
  filename     text not null,
  content_type text not null,
  bytes        bytea not null,
  size         integer not null,
  width        integer,
  height       integer,
  alt          text not null default '',
  created_at   timestamptz not null default now()
);

-- Key/value site settings: social links, homepage copy, banner, SEO overrides, sponsorship packages.
create table if not exists settings (
  key        text primary key,
  value      jsonb not null,
  updated_at timestamptz not null default now()
);

create table if not exists announcements (
  id         bigserial primary key,
  message    text not null,
  link_url   text,
  link_label text,
  tone       text not null default 'gold' check (tone in ('gold', 'electric', 'neutral')),
  active     boolean not null default true,
  starts_at  timestamptz,
  ends_at    timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists landing_pages (
  id              bigserial primary key,
  slug            text not null unique,
  title           text not null,
  headline        text not null,
  subheadline     text not null default '',
  body            text not null default '',
  cta_label       text not null default 'Play RivalArcade',
  utm_campaign    text not null default '',
  hero_image      text,
  status          text not null default 'draft' check (status in ('draft', 'published')),
  publish_at      timestamptz,
  seo_title       text,
  seo_description text,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

create table if not exists subscribers (
  id                bigserial primary key,
  email             text not null unique,
  status            text not null default 'pending' check (status in ('pending', 'confirmed', 'unsubscribed')),
  confirm_token     text,
  unsubscribe_token text not null,
  source            text,
  utm               jsonb not null default '{}',
  consent_text      text not null,
  consent_ip        text,
  created_at        timestamptz not null default now(),
  confirmed_at      timestamptz,
  unsubscribed_at   timestamptz
);
create index if not exists subscribers_status on subscribers(status);

create table if not exists newsletters (
  id          bigserial primary key,
  slug        text not null unique,
  subject     text not null,
  preview     text not null default '',
  body        text not null,
  status      text not null default 'draft' check (status in ('draft', 'sent')),
  public      boolean not null default true,
  sent_at     timestamptz,
  sent_count  integer not null default 0,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- Contact, advertising, sponsorship and media inquiries.
create table if not exists inquiries (
  id         bigserial primary key,
  kind       text not null check (kind in ('general', 'support', 'advertising', 'sponsorship', 'partnership', 'media')),
  name       text not null,
  email      text not null,
  company    text,
  subject    text,
  message    text not null,
  meta       jsonb not null default '{}',
  status     text not null default 'new' check (status in ('new', 'in_progress', 'closed')),
  ip         text,
  created_at timestamptz not null default now()
);

create table if not exists creator_applications (
  id            bigserial primary key,
  name          text not null,
  email         text not null,
  handle        text not null,
  platforms     text[] not null default '{}',
  channel_url   text not null,
  audience_size text,
  content_focus text,
  pitch         text not null,
  status        text not null default 'new' check (status in ('new', 'reviewing', 'approved', 'declined')),
  referral_code text,
  notes         text,
  ip            text,
  created_at    timestamptz not null default now()
);

-- First-party, cookieless analytics. visitor_hash = sha256(daily salt + ip + user agent): it cannot be
-- reversed and changes every day, so it counts unique visitors per day without tracking anyone.
create table if not exists events (
  id           bigserial primary key,
  type         text not null,
  path         text not null default '/',
  label        text,
  referrer     text,
  utm_source   text,
  utm_medium   text,
  utm_campaign text,
  device       text,
  visitor_hash text,
  created_at   timestamptz not null default now()
);
create index if not exists events_time on events(created_at);
create index if not exists events_type_time on events(type, created_at);

create table if not exists rate_limits (
  key          text primary key,
  window_start timestamptz not null,
  count        integer not null
);
