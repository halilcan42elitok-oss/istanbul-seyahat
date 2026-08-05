# 🚌 İstanbul Seyahat — Sanal Otomasyon (ETS2)

Euro Truck Simulator 2 için **İstanbul Seyahat** sanal otobüs firmasının web otomasyonu.
7/24 canlı sefer ekranı, gerçekçi bilet kesme, ikram, emanet eşya, plaka tanımlama,
yolcu fişi ve hesap fişi içerir. Yolcu ve yönetici için ayrı paneller vardır.

## Özellikler

- **Canlı sefer ekranı (7/24):** Seferler saat bazlı döngüyle otomatik tekrar eder; kalkış
  saati yaklaştıkça durumlar değişir (BEKLİYOR → KAPIDA → KALKIŞA HAZIR → YOLDA → VARDI).
- **Yolcu paneli:** Ad/soyad ile giriş; sefer seçme, **koltuk + plaka seçimi**, **ikram
  ekleme**, **emanet ekleme**, bilet kesme, **yolcu fişi** ve **hesap fişi** yazdırma.
- **Yönetici paneli:** Sefer ekle/düzenle/sil (hat, saat, sıklık, süre, ücret, peron,
  durak/ortalar), **plaka tanımlama**, ikram ve emanet fiyat yönetimi, kesilen biletlerin
  izlenmesi, iptal/onay, ciro özeti.
- **Ücretsiz yayın:** Next.js + Supabase (ücretsiz plan) + Vercel (ücretsiz plan).

## Giriş Bilgileri

| Panel    | Kullanıcı       | Şifre          |
| -------- | --------------- | -------------- |
| Yönetici | `scsttadmin`    | `scsttadmin34` |

Yönetici bilgilerini `.env.local` veya Vercel ortam değişkenleriyle değiştirebilirsiniz:

```
NEXT_PUBLIC_ADMIN_USER=scsttadmin
NEXT_PUBLIC_ADMIN_PASS=scsttadmin34
```

## Yerel Çalıştırma (Demo Modu)

Supabase anahtarları boşken uygulama **demo modunda** çalışır; tüm veriler tarayıcının
localStorage alanında saklanır. Kurulum gerektirmez:

```bash
npm install
npm run dev
```

Tarayıcıda `http://localhost:3000` açın. (Yolcu girişi serbesttir; yöneticiye
`scsttadmin / scsttadmin34` ile girin.)

## Supabase (Ücretsiz Bulut Veritabanı)

1. [supabase.com](https://supabase.com) → "New project" → bölgeyi **Frankfurt (eu-central-1)**
   seçin ve şifre belirleyin.
2. Soldaki **SQL Editor** → yeni sorgu → `supabase/schema.sql` içeriğini yapıştırıp **Run** deyin.
   (Tablolar ve RLS kuralları otomatik oluşur.)
3. Sol menüden **Project Settings → API** sayfasına gidin.
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` anahtarı → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Bu değerleri `.env.local` içine yazın ve uygulamayı yeniden başlatın.

Artık seferler, plakalar ve biletler tüm cihazlarda ortak olarak Supabase'te saklanır.
İsterseniz Admin panel → Ayarlar → "Örnek Verilere Sıfırla" ile verileri doldurabilirsiniz.

## GitHub'a Yükleme

```bash
git init
git add .
git commit -m "İstanbul Seyahat sanal otomasyonu"
git branch -M main
git remote add origin https://github.com/KULLANICI_ADINIZ/istanbul-seyahat.git
git push -u origin main
```

> `github.com/new` adresinden önce boş bir repo oluşturun ve kendi kullanıcı adınızı yazın.

## Vercel ile Ücretsiz Yayın

1. [vercel.com](https://vercel.com) → GitHub ile giriş yapın → **Add New Project** →
   `istanbul-seyahat` reposunu seçin.
2. **Environment Variables** bölümüne `.env.local` içindeki 4 değişkeni ekleyin
   (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`,
   `NEXT_PUBLIC_ADMIN_USER`, `NEXT_PUBLIC_ADMIN_PASS`).
3. **Deploy** deyin. Birkaç dakikada site yayında olur (`https://<proje>.vercel.app`).
4. Her `git push` sonrası Vercel otomatik yeni sürümü yayınlar.

## Klasör Yapısı

```
src/
  app/
    page.tsx          # Ana sayfa + giriş + canlı sefer önizlemesi
    user/page.tsx     # Yolcu paneli
    admin/page.tsx    # Yönetici paneli
  components/
    LoginScreen.tsx   # Yolcu / yönetici girişi
    LiveBoard.tsx     # 7/24 canlı sefer ekranı
    UserPanel.tsx     # Bilet kesme, ikram, emanet, plaka seçimi
    AdminPanel.tsx    # Sefer/plaka/ikram/emanet/bilet yönetimi
    Slips.tsx         # Yolcu fişi + hesap fişi (yazdırılabilir)
  lib/
    store.ts          # Veri katmanı (Supabase ↔ localStorage)
    live.ts           # Canlı sefer hesabı
    types.ts          # Tip tanımları
    schema.sql → supabase/schema.sql
```

## Teknolojiler

Next.js 16 · TypeScript · Tailwind CSS 4 · Supabase (PostgreSQL + RLS)
