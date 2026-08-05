"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { STORAGE_KEYS, FIRMA, adminPass, adminUser } from "@/lib/config";
import { Button, Field, Input } from "./ui";

export function LoginScreen() {
  const router = useRouter();
  const [tab, setTab] = useState<"yolcu" | "yonetici">("yolcu");
  const [hata, setHata] = useState("");

  const [ad, setAd] = useState("");
  const [soyad, setSoyad] = useState("");
  const [kimlik, setKimlik] = useState("");
  const [telefon, setTelefon] = useState("");

  const [kAdi, setKAdi] = useState("");
  const [sifre, setSifre] = useState("");

  function yolcuGir(e: React.FormEvent) {
    e.preventDefault();
    setHata("");
    if (ad.trim().length < 2 || soyad.trim().length < 1) {
      setHata("Ad ve soyad en az 2 karakter olmalıdır.");
      return;
    }
    if (kimlik.trim() && !/^\d{11}$/.test(kimlik.trim())) {
      setHata("TC Kimlik numarası 11 haneli olmalıdır.");
      return;
    }
    const yolcu = {
      ad: ad.trim(),
      soyad: soyad.trim(),
      kimlik: kimlik.trim(),
      telefon: telefon.trim(),
      giris: new Date().toISOString(),
    };
    localStorage.setItem(STORAGE_KEYS.yolcu, JSON.stringify(yolcu));
    router.push("/user");
  }

  function yoneticiGir(e: React.FormEvent) {
    e.preventDefault();
    setHata("");
    if (kAdi.trim() === adminUser() && sifre === adminPass()) {
      localStorage.setItem(STORAGE_KEYS.admin, JSON.stringify({ giris: Date.now() }));
      router.push("/admin");
    } else {
      setHata("Kullanıcı adı veya şifre hatalı.");
    }
  }

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 py-4">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="brand-gradient relative overflow-hidden rounded-3xl p-8 text-white shadow-lg">
          <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/10" />
          <div className="pointer-events-none absolute -bottom-20 -left-10 h-72 w-72 rounded-full bg-white/10" />
          <div className="relative">
            <div className="text-4xl font-black tracking-widest">{FIRMA.ad.toUpperCase()}</div>
            <p className="mt-1 text-sm text-red-100">{FIRMA.slogan}</p>
            <div className="mt-6 space-y-3 text-sm">
              {[
                "Canlı sefer ekranı (7/24, sürekli değişen seferler)",
                "Gerçekçi bilet kesme ve yolcu fişi",
                "İkram ve emanet (emanet eşya) işlemleri",
                "Plaka tanımlama ve koltuk düzeni",
                "Hesap fişi ile otomasyon kaydı",
              ].map((m) => (
                <div key={m} className="flex items-start gap-2">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/20 text-xs font-black">
                    ✓
                  </span>
                  <span>{m}</span>
                </div>
              ))}
            </div>
            <div className="mt-8 rounded-2xl bg-black/20 p-4 text-center">
              <div className="text-xs font-bold uppercase tracking-widest text-red-200">
                Euro Truck Simulator 2
              </div>
              <div className="mt-1 text-2xl font-black">
                Sanal İstanbul Seyahat Otomasyonu
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm">
          <div className="mb-5 grid grid-cols-2 gap-1 rounded-xl bg-stone-100 p-1">
            <button
              onClick={() => {
                setTab("yolcu");
                setHata("");
              }}
              className={`rounded-lg py-2 text-sm font-bold transition-colors ${
                tab === "yolcu" ? "bg-white text-brand shadow" : "text-stone-500"
              }`}
            >
              🎫 Yolcu Girişi
            </button>
            <button
              onClick={() => {
                setTab("yonetici");
                setHata("");
              }}
              className={`rounded-lg py-2 text-sm font-bold transition-colors ${
                tab === "yonetici" ? "bg-white text-brand shadow" : "text-stone-500"
              }`}
            >
              🛠️ Yönetici Girişi
            </button>
          </div>

          {tab === "yolcu" ? (
            <form onSubmit={yolcuGir} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <Field label="Ad">
                  <Input
                    value={ad}
                    onChange={(e) => setAd(e.target.value)}
                    placeholder="Adınız"
                    required
                  />
                </Field>
                <Field label="Soyad">
                  <Input
                    value={soyad}
                    onChange={(e) => setSoyad(e.target.value)}
                    placeholder="Soyadınız"
                    required
                  />
                </Field>
              </div>
              <Field label="TC Kimlik No" hint="İsteğe bağlı, 11 haneli">
                <Input
                  value={kimlik}
                  onChange={(e) => setKimlik(e.target.value.replace(/\D/g, "").slice(0, 11))}
                  placeholder="12345678901"
                  inputMode="numeric"
                />
              </Field>
              <Field label="Telefon" hint="İsteğe bağlı">
                <Input
                  value={telefon}
                  onChange={(e) => setTelefon(e.target.value)}
                  placeholder="05xx xxx xx xx"
                />
              </Field>
              <Button type="submit" className="w-full py-2.5">
                Oturuma Başla →
              </Button>
              <p className="text-center text-xs text-stone-400">
                Bilet kesmek, ikram ve emanet eklemek için yolcu oturumu yeterlidir.
              </p>
            </form>
          ) : (
            <form onSubmit={yoneticiGir} className="space-y-3">
              <Field label="Kullanıcı Adı">
                <Input
                  value={kAdi}
                  onChange={(e) => setKAdi(e.target.value)}
                  placeholder="Yönetici kullanıcı adı"
                  autoComplete="username"
                  required
                />
              </Field>
              <Field label="Şifre">
                <Input
                  type="password"
                  value={sifre}
                  onChange={(e) => setSifre(e.target.value)}
                  placeholder="••••••••••"
                  autoComplete="current-password"
                  required
                />
              </Field>
              <Button type="submit" className="w-full py-2.5">
                Paneli Aç →
              </Button>
              <p className="text-center text-xs text-stone-400">
                Sefer, plaka, ikram ve emanet yönetimi yönetici panelindedir.
              </p>
            </form>
          )}

          {hata ? (
            <div className="mt-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm font-semibold text-red-600">
              {hata}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
