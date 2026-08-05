import type { Kayit } from "./types";
import { STORAGE_KEYS } from "./config";
import { uid } from "./format";

export function seedKayit(): Kayit {
  const now = new Date().toISOString();
  return {
    seferler: [
      {
        id: uid("s"),
        hat: "İSTANBUL → ANKARA",
        kalkis: "İstanbul (Esenler Otogarı)",
        varis: "Ankara (AŞTİ)",
        durak: "Gerede · Bolu · Beypazarı",
        ilk_saat: "00:00",
        siklik: 60,
        sure: 420,
        ucret: 450,
        peron: "12",
        otobus: "34 IST 2001",
        aktif: true,
        created_at: now,
      },
      {
        id: uid("s"),
        hat: "İSTANBUL → İZMİR",
        kalkis: "İstanbul (Esenler Otogarı)",
        varis: "İzmir (Otogar)",
        durak: "Bursa · Balıkesir · Manisa",
        ilk_saat: "01:30",
        siklik: 120,
        sure: 540,
        ucret: 600,
        peron: "15",
        otobus: "34 IST 2002",
        aktif: true,
        created_at: now,
      },
      {
        id: uid("s"),
        hat: "İSTANBUL → BURSA",
        kalkis: "İstanbul (Esenler Otogarı)",
        varis: "Bursa (Otogar)",
        durak: "Gebze · İzmit · Yalova",
        ilk_saat: "02:00",
        siklik: 90,
        sure: 180,
        ucret: 250,
        peron: "4",
        otobus: "34 IST 2003",
        aktif: true,
        created_at: now,
      },
      {
        id: uid("s"),
        hat: "İSTANBUL → ANTALYA",
        kalkis: "İstanbul (Esenler Otogarı)",
        varis: "Antalya (Otogar)",
        durak: "Afyonkarahisar · Konya · Seydişehir",
        ilk_saat: "03:15",
        siklik: 180,
        sure: 720,
        ucret: 700,
        peron: "8",
        otobus: "34 IST 2004",
        aktif: true,
        created_at: now,
      },
      {
        id: uid("s"),
        hat: "İSTANBUL → TRABZON",
        kalkis: "İstanbul (Esenler Otogarı)",
        varis: "Trabzon (Otogar)",
        durak: "Bolu · Samsun · Ordu · Giresun",
        ilk_saat: "04:30",
        siklik: 240,
        sure: 960,
        ucret: 900,
        peron: "20",
        otobus: "34 IST 2005",
        aktif: true,
        created_at: now,
      },
      {
        id: uid("s"),
        hat: "ANKARA → İSTANBUL",
        kalkis: "Ankara (AŞTİ)",
        varis: "İstanbul (Esenler Otogarı)",
        durak: "Beypazarı · Bolu · Gerede",
        ilk_saat: "00:45",
        siklik: 60,
        sure: 420,
        ucret: 450,
        peron: "2",
        otobus: "34 IST 2001",
        aktif: true,
        created_at: now,
      },
    ],
    plakalar: [
      { id: uid("p"), plaka: "34 IST 2001", model: "Mercedes Tourismo", kapasite: 45, aktif: true, created_at: now },
      { id: uid("p"), plaka: "34 IST 2002", model: "Mercedes Travego", kapasite: 47, aktif: true, created_at: now },
      { id: uid("p"), plaka: "34 IST 2003", model: "Temsa Safir", kapasite: 44, aktif: true, created_at: now },
      { id: uid("p"), plaka: "34 IST 2004", model: "MAN Lions Coach", kapasite: 46, aktif: true, created_at: now },
      { id: uid("p"), plaka: "34 IST 2005", model: "Setra S431", kapasite: 50, aktif: true, created_at: now },
    ],
    ikramlar: [
      { id: uid("i"), ad: "Çay", kategori: "Sıcak İçecek", fiyat: 10, aktif: true, created_at: now },
      { id: uid("i"), ad: "Türk Kahvesi", kategori: "Sıcak İçecek", fiyat: 20, aktif: true, created_at: now },
      { id: uid("i"), ad: "Su", kategori: "Soğuk İçecek", fiyat: 15, aktif: true, created_at: now },
      { id: uid("i"), ad: "Ayran", kategori: "Soğuk İçecek", fiyat: 15, aktif: true, created_at: now },
      { id: uid("i"), ad: "Soda", kategori: "Soğuk İçecek", fiyat: 20, aktif: true, created_at: now },
      { id: uid("i"), ad: "Kola", kategori: "Soğuk İçecek", fiyat: 25, aktif: true, created_at: now },
      { id: uid("i"), ad: "Sandviç", kategori: "Atıştırmalık", fiyat: 75, aktif: true, created_at: now },
      { id: uid("i"), ad: "Simit", kategori: "Atıştırmalık", fiyat: 25, aktif: true, created_at: now },
      { id: uid("i"), ad: "Cips", kategori: "Atıştırmalık", fiyat: 30, aktif: true, created_at: now },
      { id: uid("i"), ad: "Kek", kategori: "Atıştırmalık", fiyat: 35, aktif: true, created_at: now },
    ],
    emanetler: [
      { id: uid("e"), ad: "El Bagajı (0-10 kg)", fiyat: 50, aktif: true, created_at: now },
      { id: uid("e"), ad: "Standart Bavul", fiyat: 100, aktif: true, created_at: now },
      { id: uid("e"), ad: "Büyük Bavul", fiyat: 150, aktif: true, created_at: now },
      { id: uid("e"), ad: "Bisiklet", fiyat: 200, aktif: true, created_at: now },
    ],
    biletler: [],
    son_bilet_no: 0,
  };
}

export function loadKayit(): Kayit {
  if (typeof window === "undefined") return seedKayit();
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.kayit);
    if (!raw) {
      const k = seedKayit();
      localStorage.setItem(STORAGE_KEYS.kayit, JSON.stringify(k));
      return k;
    }
    const parsed = JSON.parse(raw) as Kayit;
    return parsed;
  } catch {
    return seedKayit();
  }
}

export function saveKayit(k: Kayit): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEYS.kayit, JSON.stringify(k));
}
