export const FIRMA = {
  ad: "İstanbul Seyahat",
  slogan: "Türkiye'nin Yolcusu Buradan Geçer",
  adres: "Esenler Otogarı No:1, İstanbul",
  telefon: "0212 000 00 00",
  web: "istanbulseyahat.sim",
  ets2: "Euro Truck Simulator 2 · Sanal Otomasyon",
};

export const ADMIN_DEFAULT_USER = "scsttadmin";
export const ADMIN_DEFAULT_PASS = "scsttadmin34";

export function adminUser(): string {
  return process.env.NEXT_PUBLIC_ADMIN_USER || ADMIN_DEFAULT_USER;
}
export function adminPass(): string {
  return process.env.NEXT_PUBLIC_ADMIN_PASS || ADMIN_DEFAULT_PASS;
}

export const STORAGE_KEYS = {
  kayit: "is24_kayit",
  yolcu: "is24_yolcu",
  admin: "is24_admin",
};

export const KDV_ORAN = 0.2;
export const FIRMA_PLAKA = "34 IST 2026";
