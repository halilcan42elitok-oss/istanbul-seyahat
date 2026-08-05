export type Sefer = {
  id: string;
  hat: string;
  kalkis: string;
  varis: string;
  durak: string;
  ilk_saat: string;
  siklik: number;
  sure: number;
  ucret: number;
  peron: string;
  otobus: string;
  aktif: boolean;
  created_at?: string;
};

export type Plaka = {
  id: string;
  plaka: string;
  model: string;
  kapasite: number;
  aktif: boolean;
  created_at?: string;
};

export type Ikram = {
  id: string;
  ad: string;
  kategori: string;
  fiyat: number;
  aktif: boolean;
  created_at?: string;
};

export type Emanet = {
  id: string;
  ad: string;
  fiyat: number;
  aktif: boolean;
  created_at?: string;
};

export type BiletIkram = { id: string; ad: string; adet: number; fiyat: number };
export type BiletEmanet = { id: string; ad: string; adet: number; fiyat: number };

export type Bilet = {
  id: string;
  bilet_no: string;
  yolcu_ad: string;
  yolcu_soyad: string;
  kimlik: string;
  telefon: string;
  sefer_id: string;
  hat: string;
  kalkis: string;
  varis: string;
  durak: string;
  tarih: string;
  saat: string;
  koltuk: string;
  plaka: string;
  ucret: number;
  ikramlar: BiletIkram[];
  emanetler: BiletEmanet[];
  ikram_fiyat: number;
  emanet_fiyat: number;
  ara_toplam: number;
  kdv: number;
  toplam: number;
  durum: "onaylandi" | "iptal";
  kasiyer: string;
  created_at?: string;
};

export type Kayit = {
  seferler: Sefer[];
  plakalar: Plaka[];
  ikramlar: Ikram[];
  emanetler: Emanet[];
  biletler: Bilet[];
  son_bilet_no: number;
};

export type UygunSefer = {
  sefer: Sefer;
  instanceId: string;
  tarih: string;
  saat: string;
  kalkisMs: number;
  durum: "bekliyor" | "kapida" | "kalkisa-hazir" | "yolda" | "vardi";
  kalanDk: number;
};
