-- =====================================================
-- İSTANBUL SEYAHAT · Sanal Otomasyon — Supabase Şeması
-- Supabase Dashboard > SQL Editor'a yapıştırıp "Run" deyin.
-- =====================================================

create table if not exists public.seferler (
  id text primary key,
  hat text not null,
  kalkis text not null,
  varis text not null,
  durak text default '',
  ilk_saat text not null default '08:00',
  siklik integer not null default 60,
  sure integer not null default 300,
  ucret numeric not null default 0,
  peron text default '1',
  otobus text default '',
  aktif boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.plakalar (
  id text primary key,
  plaka text not null,
  model text default '',
  kapasite integer not null default 45,
  aktif boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.ikramlar (
  id text primary key,
  ad text not null,
  kategori text default 'Diğer',
  fiyat numeric not null default 0,
  aktif boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.emanetler (
  id text primary key,
  ad text not null,
  fiyat numeric not null default 0,
  aktif boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.biletler (
  id text primary key,
  bilet_no text not null unique,
  yolcu_ad text not null,
  yolcu_soyad text not null,
  kimlik text default '',
  telefon text default '',
  sefer_id text default '',
  hat text not null,
  kalkis text not null,
  varis text not null,
  durak text default '',
  tarih text not null,
  saat text not null,
  koltuk text not null,
  plaka text not null,
  ucret numeric not null default 0,
  ikramlar jsonb not null default '[]',
  emanetler jsonb not null default '[]',
  ikram_fiyat numeric not null default 0,
  emanet_fiyat numeric not null default 0,
  ara_toplam numeric not null default 0,
  kdv numeric not null default 0,
  toplam numeric not null default 0,
  durum text not null default 'onaylandi',
  kasiyer text default '',
  created_at timestamptz not null default now()
);

create table if not exists public.settings (
  key text primary key,
  value jsonb
);

-- ================= RLS =================
alter table public.seferler enable row level security;
alter table public.plakalar enable row level security;
alter table public.ikramlar enable row level security;
alter table public.emanetler enable row level security;
alter table public.biletler enable row level security;
alter table public.settings enable row level security;

-- Okuma: herkes (anon) okuyabilir
create policy "read seferler" on public.seferler for select using (true);
create policy "read plakalar" on public.plakalar for select using (true);
create policy "read ikramlar" on public.ikramlar for select using (true);
create policy "read emanetler" on public.emanetler for select using (true);
create policy "read biletler" on public.biletler for select using (true);
create policy "read settings" on public.settings for select using (true);

-- Yazma: herkes ekleyebilir/güncelleyebilir/silebilir (sanal demo amaçlı)
create policy "write seferler" on public.seferler for all using (true) with check (true);
create policy "write plakalar" on public.plakalar for all using (true) with check (true);
create policy "write ikramlar" on public.ikramlar for all using (true) with check (true);
create policy "write emanetler" on public.emanetler for all using (true) with check (true);
create policy "write biletler" on public.biletler for all using (true) with check (true);
create policy "write settings" on public.settings for all using (true) with check (true);

-- ================= Index =================
create index if not exists biletler_created_idx on public.biletler (created_at desc);
create index if not exists biletler_no_idx on public.biletler (bilet_no);
create index if not exists seferler_aktif_idx on public.seferler (aktif);
