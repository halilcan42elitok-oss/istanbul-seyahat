import type { Bilet, Emanet, Ikram, Kayit, Plaka, Sefer } from "./types";

const NOW = new Date().toISOString();

export const SEED_PLAKALAR: Plaka[] = [
  { id: "p_IST2001", plaka: "34 IST 2001", model: "Mercedes Tourismo 2", kapasite: 45, aktif: true, created_at: NOW },
  { id: "p_IST2002", plaka: "34 IST 2002", model: "Mercedes Travego SHD", kapasite: 47, aktif: true, created_at: NOW },
  { id: "p_IST2003", plaka: "34 IST 2003", model: "Temsa Safir Plus", kapasite: 44, aktif: true, created_at: NOW },
  { id: "p_IST2004", plaka: "34 IST 2004", model: "MAN Lions Coach", kapasite: 46, aktif: true, created_at: NOW },
  { id: "p_IST2005", plaka: "34 IST 2005", model: "Setra S431 DT", kapasite: 50, aktif: true, created_at: NOW },
  { id: "p_IST2006", plaka: "34 IST 2006", model: "Neoplan Tourliner", kapasite: 45, aktif: true, created_at: NOW },
  { id: "p_IST2007", plaka: "34 IST 2007", model: "Mercedes Tourismo RHD", kapasite: 46, aktif: true, created_at: NOW },
  { id: "p_IST2008", plaka: "34 IST 2008", model: "Temsa Diamond", kapasite: 43, aktif: true, created_at: NOW },
  { id: "p_IST2009", plaka: "34 IST 2009", model: "Otokar Kent 50", kapasite: 48, aktif: true, created_at: NOW },
  { id: "p_IST2010", plaka: "34 IST 2010", model: "Setra TopClass 515 HD", kapasite: 51, aktif: true, created_at: NOW },
  { id: "p_IST2011", plaka: "34 IST 2011", model: "Mercedes Travego 15 RHD", kapasite: 47, aktif: true, created_at: NOW },
  { id: "p_IST2012", plaka: "34 IST 2012", model: "MAN Neoplan Skyliner", kapasite: 49, aktif: true, created_at: NOW },
];

export const SEED_IKRAMLAR: Ikram[] = [
  { id: "i_cay", ad: "Çay (İnce Barda)", kategori: "Sıcak İçecek", fiyat: 15, aktif: true, created_at: NOW },
  { id: "i_sallama", ad: "Sallama Çay", kategori: "Sıcak İçecek", fiyat: 20, aktif: true, created_at: NOW },
  { id: "i_kahve", ad: "Türk Kahvesi", kategori: "Sıcak İçecek", fiyat: 35, aktif: true, created_at: NOW },
  { id: "i_ihlamur", ad: "Ihlamur (Bitki Çayı)", kategori: "Sıcak İçecek", fiyat: 30, aktif: true, created_at: NOW },
  { id: "i_su", ad: "Su (0,5 L)", kategori: "Soğuk İçecek", fiyat: 25, aktif: true, created_at: NOW },
  { id: "i_ayran", ad: "Ayran", kategori: "Soğuk İçecek", fiyat: 30, aktif: true, created_at: NOW },
  { id: "i_soda", ad: "Soda", kategori: "Soğuk İçecek", fiyat: 30, aktif: true, created_at: NOW },
  { id: "i_kola", ad: "Kola (33 cl)", kategori: "Soğuk İçecek", fiyat: 45, aktif: true, created_at: NOW },
  { id: "i_gazoz", ad: "Portakallı Gazoz", kategori: "Soğuk İçecek", fiyat: 30, aktif: true, created_at: NOW },
  { id: "i_meyvesuyu", ad: "Meyve Suyu", kategori: "Soğuk İçecek", fiyat: 40, aktif: true, created_at: NOW },
  { id: "i_limonata", ad: "Limonata", kategori: "Soğuk İçecek", fiyat: 45, aktif: true, created_at: NOW },
  { id: "i_simit", ad: "Simit", kategori: "Atıştırmalık", fiyat: 40, aktif: true, created_at: NOW },
  { id: "i_pogaca", ad: "Peynirli Poğaça", kategori: "Atıştırmalık", fiyat: 45, aktif: true, created_at: NOW },
  { id: "i_kek", ad: "Kek Dilimi", kategori: "Atıştırmalık", fiyat: 55, aktif: true, created_at: NOW },
  { id: "i_kurabiye", ad: "Kurabiye", kategori: "Atıştırmalık", fiyat: 40, aktif: true, created_at: NOW },
  { id: "i_gofret", ad: "Gofret", kategori: "Atıştırmalık", fiyat: 40, aktif: true, created_at: NOW },
  { id: "i_cikolata", ad: "Çikolata", kategori: "Atıştırmalık", fiyat: 60, aktif: true, created_at: NOW },
  { id: "i_biskuvi", ad: "Bisküvi", kategori: "Atıştırmalık", fiyat: 35, aktif: true, created_at: NOW },
  { id: "i_cips", ad: "Cips", kategori: "Atıştırmalık", fiyat: 60, aktif: true, created_at: NOW },
  { id: "i_leblebi", ad: "Leblebi", kategori: "Atıştırmalık", fiyat: 35, aktif: true, created_at: NOW },
  { id: "i_kuruyemis", ad: "Kuruyemiş Karışımı", kategori: "Atıştırmalık", fiyat: 85, aktif: true, created_at: NOW },
  { id: "i_tost", ad: "Kaşarlı Tost", kategori: "Yemek", fiyat: 120, aktif: true, created_at: NOW },
  { id: "i_sandvic", ad: "Sandviç", kategori: "Yemek", fiyat: 150, aktif: true, created_at: NOW },
  { id: "i_tavuklu", ad: "Tavuklu Sandviç", kategori: "Yemek", fiyat: 170, aktif: true, created_at: NOW },
  { id: "i_milfoy", ad: "Milföy", kategori: "Yemek", fiyat: 90, aktif: true, created_at: NOW },
];

export const SEED_EMANETLER: Emanet[] = [
  { id: "e_el", ad: "El Bagajı (0-5 kg)", fiyat: 40, aktif: true, created_at: NOW },
  { id: "e_kabin", ad: "Kabin Çantası (5-10 kg)", fiyat: 60, aktif: true, created_at: NOW },
  { id: "e_standart", ad: "Standart Bavul (10-20 kg)", fiyat: 120, aktif: true, created_at: NOW },
  { id: "e_buyuk", ad: "Büyük Bavul (20-30 kg)", fiyat: 180, aktif: true, created_at: NOW },
  { id: "e_ekstra", ad: "Ekstra Bagaj (30 kg üzeri)", fiyat: 300, aktif: true, created_at: NOW },
  { id: "e_bisiklet", ad: "Bisiklet", fiyat: 300, aktif: true, created_at: NOW },
  { id: "e_bebek", ad: "Bebek Arabası", fiyat: 180, aktif: true, created_at: NOW },
  { id: "e_kargo", ad: "Kargo Paketi", fiyat: 150, aktif: true, created_at: NOW },
  { id: "e_muzik", ad: "Müzik Aleti (Gitar / Keman)", fiyat: 200, aktif: true, created_at: NOW },
  { id: "e_pet", ad: "Evcil Hayvan (Taşıma Kafesi)", fiyat: 250, aktif: true, created_at: NOW },
];

export const SEED_SEFERLER: Sefer[] = [
  { id: "IST-ANK", hat: "İSTANBUL → ANKARA", kalkis: "İstanbul (Esenler Otogarı)", varis: "Ankara (AŞTİ)", durak: "Gerede · Bolu", ilk_saat: "00:00", siklik: 60, sure: 420, ucret: 700, peron: "12", otobus: "34 IST 2001", aktif: true, created_at: NOW },
  { id: "ANK-IST", hat: "ANKARA → İSTANBUL", kalkis: "Ankara (AŞTİ)", varis: "İstanbul (Esenler Otogarı)", durak: "Beypazarı · Bolu · Gerede", ilk_saat: "00:30", siklik: 60, sure: 420, ucret: 700, peron: "2", otobus: "34 IST 2002", aktif: true, created_at: NOW },
  { id: "IST-IZM", hat: "İSTANBUL → İZMİR", kalkis: "İstanbul (Esenler Otogarı)", varis: "İzmir (Otogar)", durak: "Bursa · Balıkesir · Manisa", ilk_saat: "01:00", siklik: 120, sure: 540, ucret: 950, peron: "15", otobus: "34 IST 2003", aktif: true, created_at: NOW },
  { id: "IST-BRS", hat: "İSTANBUL → BURSA", kalkis: "İstanbul (Esenler Otogarı)", varis: "Bursa (Otogar)", durak: "Gebze · İzmit · Yalova", ilk_saat: "02:00", siklik: 60, sure: 180, ucret: 380, peron: "4", otobus: "34 IST 2004", aktif: true, created_at: NOW },
  { id: "IST-KNY", hat: "İSTANBUL → KONYA", kalkis: "İstanbul (Esenler Otogarı)", varis: "Konya (Otogar)", durak: "Eskişehir · Afyonkarahisar", ilk_saat: "03:00", siklik: 180, sure: 540, ucret: 800, peron: "9", otobus: "34 IST 2005", aktif: true, created_at: NOW },
  { id: "IST-ESK", hat: "İSTANBUL → ESKİŞEHİR", kalkis: "İstanbul (Esenler Otogarı)", varis: "Eskişehir (Otogar)", durak: "İzmit · Bozüyük", ilk_saat: "04:00", siklik: 90, sure: 240, ucret: 450, peron: "5", otobus: "34 IST 2006", aktif: true, created_at: NOW },
  { id: "IST-ANT", hat: "İSTANBUL → ANTALYA", kalkis: "İstanbul (Esenler Otogarı)", varis: "Antalya (Otogar)", durak: "Afyonkarahisar · Konya · Seydişehir", ilk_saat: "05:00", siklik: 240, sure: 720, ucret: 1150, peron: "8", otobus: "34 IST 2007", aktif: true, created_at: NOW },
  { id: "IST-ADA", hat: "İSTANBUL → ADANA", kalkis: "İstanbul (Esenler Otogarı)", varis: "Adana (Şehirlerarası Otobüs Terminali)", durak: "Bolu · Ankara · Pozantı", ilk_saat: "06:00", siklik: 300, sure: 660, ucret: 1050, peron: "10", otobus: "34 IST 2008", aktif: true, created_at: NOW },
  { id: "IST-MRS", hat: "İSTANBUL → MERSİN", kalkis: "İstanbul (Esenler Otogarı)", varis: "Mersin (Otogar)", durak: "Ankara · Pozantı · Tarsus", ilk_saat: "06:30", siklik: 360, sure: 720, ucret: 1150, peron: "11", otobus: "34 IST 2009", aktif: true, created_at: NOW },
  { id: "IST-SMS", hat: "İSTANBUL → SAMSUN", kalkis: "İstanbul (Esenler Otogarı)", varis: "Samsun (Otogar)", durak: "Bolu · Sinop · Bafra", ilk_saat: "07:00", siklik: 180, sure: 600, ucret: 1000, peron: "18", otobus: "34 IST 2010", aktif: true, created_at: NOW },
  { id: "SMS-IST", hat: "SAMSUN → İSTANBUL", kalkis: "Samsun (Otogar)", varis: "İstanbul (Esenler Otogarı)", durak: "Bafra · Sinop · Bolu", ilk_saat: "08:00", siklik: 240, sure: 600, ucret: 1000, peron: "1", otobus: "34 IST 2011", aktif: true, created_at: NOW },
  { id: "IST-TRBZ", hat: "İSTANBUL → TRABZON", kalkis: "İstanbul (Esenler Otogarı)", varis: "Trabzon (Otogar)", durak: "Samsun · Ordu · Giresun", ilk_saat: "09:00", siklik: 360, sure: 900, ucret: 1500, peron: "20", otobus: "34 IST 2012", aktif: true, created_at: NOW },
  { id: "IST-GRN", hat: "İSTANBUL → GİRESUN", kalkis: "İstanbul (Esenler Otogarı)", varis: "Giresun (Otogar)", durak: "Samsun · Ordu", ilk_saat: "10:00", siklik: 480, sure: 840, ucret: 1450, peron: "19", otobus: "34 IST 2001", aktif: true, created_at: NOW },
  { id: "IST-EDR", hat: "İSTANBUL → EDİRNE", kalkis: "İstanbul (Esenler Otogarı)", varis: "Edirne (Otogar)", durak: "Çorlu · Babaeski · Havsa", ilk_saat: "11:00", siklik: 120, sure: 180, ucret: 400, peron: "3", otobus: "34 IST 2002", aktif: true, created_at: NOW },
  { id: "IST-KLR", hat: "İSTANBUL → KIRKLARELİ", kalkis: "İstanbul (Esenler Otogarı)", varis: "Kırklareli (Otogar)", durak: "Çorlu · Lüleburgaz · Babaeski", ilk_saat: "12:00", siklik: 120, sure: 240, ucret: 450, peron: "6", otobus: "34 IST 2003", aktif: true, created_at: NOW },
  { id: "IST-TKD", hat: "İSTANBUL → TEKİRDAĞ", kalkis: "İstanbul (Esenler Otogarı)", varis: "Tekirdağ (Otogar)", durak: "Çorlu", ilk_saat: "13:00", siklik: 90, sure: 150, ucret: 350, peron: "7", otobus: "34 IST 2004", aktif: true, created_at: NOW },
  { id: "HVM-EDR", hat: "İSTANBUL HAVALİMANI → EDİRNE", kalkis: "İstanbul Havalimanı", varis: "Edirne (Otogar)", durak: "Çerkezköy · Büyükkarıştıran · Babaeski", ilk_saat: "14:00", siklik: 120, sure: 180, ucret: 450, peron: "1", otobus: "34 IST 2005", aktif: true, created_at: NOW },
  { id: "HVM-BRS", hat: "İSTANBUL HAVALİMANI → BURSA", kalkis: "İstanbul Havalimanı", varis: "Bursa (Otogar)", durak: "Yavuz Sultan Selim Köprüsü · Osman Gazi Köprüsü · Yalova", ilk_saat: "15:00", siklik: 60, sure: 240, ucret: 500, peron: "2", otobus: "34 IST 2006", aktif: true, created_at: NOW },
  { id: "HVM-SAK", hat: "İSTANBUL HAVALİMANI → SAKARYA", kalkis: "İstanbul Havalimanı", varis: "Sakarya (Adapazarı Otogar)", durak: "Gebze · İzmit", ilk_saat: "16:00", siklik: 120, sure: 180, ucret: 450, peron: "4", otobus: "34 IST 2007", aktif: true, created_at: NOW },
  { id: "HVM-KLR", hat: "İSTANBUL HAVALİMANI → KIRKLARELİ", kalkis: "İstanbul Havalimanı", varis: "Kırklareli (Otogar)", durak: "Çerkezköy · Lüleburgaz · Babaeski", ilk_saat: "17:00", siklik: 120, sure: 240, ucret: 500, peron: "5", otobus: "34 IST 2008", aktif: true, created_at: NOW },
];

const ERKEK = [
  "Ahmet", "Mehmet", "Mustafa", "Emre", "Hüseyin", "İsmail", "Yusuf", "Murat", "Osman",
  "Ali", "Serkan", "Burak", "Cem", "Deniz", "Eren", "Fatih", "Gökhan", "Hasan", "Kerem",
  "Mert", "Oğuz", "Onur", "Ramazan", "Salih", "Selim", "Tarık", "Uğur", "Volkan", "Zafer",
  "İbrahim", "Orhan", "Tuncay", "Furkan", "Kaan", "Arda", "Baran", "Çağrı", "Doruk", "Efe", "Umut",
];
const KADIN = [
  "Ayşe", "Fatma", "Zeynep", "Elif", "Emine", "Meryem", "Hatice", "Gül", "Melek", "Seda",
  "Esra", "Derya", "Aylin", "Bahar", "Betül", "Büşra", "Ceyda", "Dilek", "Gamze", "Hande",
  "İrem", "Kübra", "Leyla", "Merve", "Nazlı", "Özge", "Pınar", "Rüya", "Selin", "Şeyma",
  "Tuğba", "Yasemin", "Zeliha", "Aslı", "Canan", "Dilara", "Ece", "Funda", "Gözde", "Hilal",
];
const SOYAD = [
  "Yılmaz", "Kaya", "Demir", "Çelik", "Şahin", "Yıldız", "Aydın", "Öztürk", "Arslan", "Doğan",
  "Kılıç", "Aslan", "Çetin", "Kara", "Koç", "Kurt", "Özdemir", "Taş", "Bulut", "Aksoy",
  "Korkmaz", "Erdoğan", "Şimşek", "Ateş", "Karadağ", "Özkan", "Polat", "Tekin", "Türk", "Yavuz",
  "Akar", "Alkan", "Altın", "Ay", "Bakır", "Çolak", "Dönmez", "Er", "Güngör", "Işık",
];
const KASIYER = [
  "Ali Osman Tırış", "Mehmet Abit", "Hasan Durmaz", "Fatma Gül", "Ahmet Işık",
  "Zeynep Koç", "Murat Erdoğan", "Elif Demir", "Osman Yıldız", "Emine Çelik",
];

function rng(seed: number): () => number {
  let a = seed >>> 0;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function pad(n: number, len = 2): string {
  return String(n).padStart(len, "0");
}

function tarihStr(d: Date): string {
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

function ekleDakika(ilk: string, dk: number): string {
  const [h, m] = ilk.split(":").map(Number);
  const t = (((h * 60) + (m || 0) + dk) % 1440 + 1440) % 1440;
  return `${pad(Math.floor(t / 60))}:${pad(t % 60)}`;
}

function sayi11(): string {
  let s = String(1 + Math.floor(Math.random() * 9));
  for (let i = 1; i < 11; i++) s += String(Math.floor(Math.random() * 10));
  return s;
}

function telefon(): string {
  return `05${pad(Math.floor(Math.random() * 90) + 10)}${String(Math.floor(Math.random() * 1e7)).padStart(7, "0")}`;
}

export function buildSeedBiletler(
  n = 45,
  gun = new Date(),
  seferler: Sefer[] = SEED_SEFERLER,
  ikramlar: Ikram[] = SEED_IKRAMLAR,
  emanetler: Emanet[] = SEED_EMANETLER
): { biletler: Bilet[]; son: number } {
  const r = rng(20260725);
  const biletler: Bilet[] = [];
  const perInstance = new Map<string, Set<string>>();
  const yil = gun.getFullYear();
  const tarih = tarihStr(gun);

  for (let i = 0; i < n; i++) {
    const sefer = seferler[i % seferler.length];
    const k = Math.floor(i / seferler.length);
    const saat = ekleDakika(sefer.ilk_saat, k * sefer.siklik);
    const key = `${sefer.id}|${tarih}|${saat}`;
    if (!perInstance.has(key)) perInstance.set(key, new Set());
    const dolu = perInstance.get(key)!;

    let koltukNo = 1 + Math.floor(r() * 45);
    while (dolu.has(pad(koltukNo))) koltukNo = (koltukNo % 45) + 1;
    dolu.add(pad(koltukNo));

    const erkek = r() < 0.5;
    const ad = (erkek ? ERKEK : KADIN)[Math.floor(r() * (erkek ? ERKEK.length : KADIN.length))];
    const soyad = SOYAD[Math.floor(r() * SOYAD.length)];

    const ikramlarSec: Bilet["ikramlar"] = [];
    const emanetlerSec: Bilet["emanetler"] = [];
    let ikramFiyat = 0;
    let emanetFiyat = 0;

    const ikramAdet = Math.floor(r() * 3);
    for (let j = 0; j < ikramAdet; j++) {
      const item = ikramlar[Math.floor(r() * ikramlar.length)];
      if (!item || ikramlarSec.some((x) => x.id === item.id)) continue;
      const adet = 1 + Math.floor(r() * 2);
      ikramlarSec.push({ id: item.id, ad: item.ad, adet, fiyat: item.fiyat });
      ikramFiyat += item.fiyat * adet;
    }

    const emanetAdet = Math.floor(r() * 2);
    for (let j = 0; j < emanetAdet; j++) {
      const item = emanetler[Math.floor(r() * emanetler.length)];
      if (!item || emanetlerSec.some((x) => x.id === item.id)) continue;
      emanetlerSec.push({ id: item.id, ad: item.ad, adet: 1, fiyat: item.fiyat });
      emanetFiyat += item.fiyat;
    }

    const ucret = sefer.ucret;
    const araToplam = ucret + ikramFiyat + emanetFiyat;
    const kdv = Math.round(araToplam * 0.2 * 100) / 100;
    const toplam = Math.round((araToplam + kdv) * 100) / 100;
    const [sh, sm] = saat.split(":").map(Number);

    const bilet: Bilet = {
      id: `b_seed_${pad(i + 1, 4)}`,
      bilet_no: `IST-${yil}-${pad(i + 1, 4)}`,
      yolcu_ad: ad,
      yolcu_soyad: soyad,
      kimlik: sayi11(),
      telefon: telefon(),
      sefer_id: sefer.id,
      hat: sefer.hat,
      kalkis: sefer.kalkis,
      varis: sefer.varis,
      durak: sefer.durak,
      tarih,
      saat,
      koltuk: pad(koltukNo),
      plaka: sefer.otobus,
      ucret,
      ikramlar: ikramlarSec,
      emanetler: emanetlerSec,
      ikram_fiyat: ikramFiyat,
      emanet_fiyat: emanetFiyat,
      ara_toplam: araToplam,
      kdv,
      toplam,
      durum: i % 13 === 0 ? "iptal" : "onaylandi",
      kasiyer: KASIYER[i % KASIYER.length],
      created_at: new Date(yil, gun.getMonth(), gun.getDate(), sh, sm, 0).toISOString(),
    };
    biletler.push(bilet);
  }

  return { biletler, son: n };
}

export function buildSeedKayit(gun = new Date()): Kayit {
  const { biletler, son } = buildSeedBiletler(45, gun);
  return {
    seferler: SEED_SEFERLER,
    plakalar: SEED_PLAKALAR,
    ikramlar: SEED_IKRAMLAR,
    emanetler: SEED_EMANETLER,
    biletler,
    son_bilet_no: son,
  };
}
