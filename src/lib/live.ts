import type { Sefer, UygunSefer } from "./types";

export function dakika(saat: string): number {
  const [h, m] = saat.split(":").map(Number);
  return h * 60 + (m || 0);
}

export function parseMs(tarih: string, saat: string): number {
  const [y, m, g] = tarih.split("-").map(Number);
  const [hh, mm] = saat.split(":").map(Number);
  return new Date(y, (m || 1) - 1, g || 1, hh, mm || 0, 0).getTime();
}

export function instanceSaat(ms: number): string {
  const d = new Date(ms);
  return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
}

export function instanceTarih(ms: number): string {
  const d = new Date(ms);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

export function durumAdi(d: UygunSefer["durum"]): string {
  switch (d) {
    case "bekliyor":
      return "BEKLİYOR";
    case "kapida":
      return "KAPIDA";
    case "kalkisa-hazir":
      return "KALKIŞA HAZIR";
    case "yolda":
      return "YOLDA";
    case "vardi":
      return "VARDI";
  }
}

export function durumRenk(d: UygunSefer["durum"]): string {
  switch (d) {
    case "bekliyor":
      return "bg-sky-100 text-sky-800";
    case "kapida":
      return "bg-amber-100 text-amber-800";
    case "kalkisa-hazir":
      return "bg-green-100 text-green-800";
    case "yolda":
      return "bg-violet-100 text-violet-800";
    case "vardi":
      return "bg-zinc-100 text-zinc-500";
  }
}

export function canliSeferler(seferler: Sefer[], nowMs = Date.now(), adet = 6): UygunSefer[] {
  const baslangic = new Date(nowMs);
  const gunBaslangici = new Date(
    baslangic.getFullYear(),
    baslangic.getMonth(),
    baslangic.getDate()
  ).getTime();

  const sonuc: UygunSefer[] = [];
  for (const s of seferler) {
    if (!s.aktif) continue;
    const base = dakika(s.ilk_saat) * 60000;
    const ilkBugun = gunBaslangici + base;
    const aralik = Math.max(s.siklik, 5) * 60000;
    let k = Math.ceil((nowMs - ilkBugun) / aralik);
    if (k < 0) k = 0;
    for (let i = 0; i < adet; i++) {
      const kalkisMs = ilkBugun + (k + i) * aralik;
      const farkMs = kalkisMs - nowMs;
      const kalanDk = Math.floor(farkMs / 60000);
      let durum: UygunSefer["durum"];
      if (kalanDk > 30) durum = "bekliyor";
      else if (kalanDk > 10) durum = "kapida";
      else if (kalanDk >= 0) durum = "kalkisa-hazir";
      else if (-kalanDk < s.sure) durum = "yolda";
      else durum = "vardi";
      sonuc.push({
        sefer: s,
        instanceId: `${s.id}_${kalkisMs}`,
        tarih: instanceTarih(kalkisMs),
        saat: instanceSaat(kalkisMs),
        kalkisMs,
        durum,
        kalanDk,
      });
    }
  }
  return sonuc.sort((a, b) => a.kalkisMs - b.kalkisMs);
}

export function kalanMetin(kalanDk: number, durum: UygunSefer["durum"]): string {
  if (durum === "yolda") return `${Math.abs(kalanDk)} dk önce kalktı`;
  if (durum === "vardi") return "Sefere çıktı";
  if (kalanDk <= 0) return "Kalkıyor";
  const h = Math.floor(kalanDk / 60);
  const m = kalanDk % 60;
  if (h > 0) return `${h} sa ${m} dk`;
  return `${m} dk`;
}
