-- Reviews left on /projects/[slug] pages. Apply with: node --env-file=.env.local scripts/apply-schema.mjs
create table if not exists reviews (
  id          bigint generated always as identity primary key,
  project     text        not null,
  rating      smallint    not null check (rating between 1 and 5),
  review      text        check (char_length(review) <= 500),
  created_at  timestamptz not null default now()
);

create index if not exists reviews_project_created_at_idx on reviews (project, created_at desc);

-- Rate limiting: HMAC-SHA256 of the visitor's IP (keyed with IP_HASH_SECRET), never the raw IP.
alter table reviews add column if not exists ip_hash text;
create index if not exists reviews_ip_hash_created_at_idx on reviews (ip_hash, created_at desc);
