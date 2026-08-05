import type { Kayit } from "./types";
import { STORAGE_KEYS } from "./config";
import { buildSeedKayit } from "./seed";

export function seedKayit(): Kayit {
  return buildSeedKayit();
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
