"use client";

import { useEffect, useState } from "react";
import type { Sefer } from "@/lib/types";
import { listSeferler } from "@/lib/store";
import { FIRMA } from "@/lib/config";
import { AppShell } from "@/components/AppShell";
import { LiveBoard } from "@/components/LiveBoard";
import { LoginScreen } from "@/components/LoginScreen";
import { Card, SectionTitle } from "@/components/ui";

export default function Home() {
  const [seferler, setSeferler] = useState<Sefer[]>([]);

  useEffect(() => {
    listSeferler().then(setSeferler).catch(() => setSeferler([]));
  }, []);

  return (
    <AppShell>
      <section className="brand-gradient relative -mx-4 -mt-6 mb-8 overflow-hidden px-4 py-14 text-white shadow-lg sm:rounded-b-3xl">
        <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-white/10" />
        <div className="pointer-events-none absolute -bottom-32 left-10 h-96 w-96 rounded-full bg-white/10" />
        <div className="relative mx-auto max-w-3xl text-center">
          <div className="mx-auto mb-3 inline-block rounded-full bg-white/15 px-4 py-1 text-xs font-bold uppercase tracking-widest ring-1 ring-white/30">
            Euro Truck Simulator 2 · Sanal Şirket
          </div>
          <h1 className="text-4xl font-black tracking-tight sm:text-5xl">
            İSTANBUL SEYAHAT
          </h1>
          <p className="mt-2 text-lg text-red-100">{FIRMA.slogan}</p>
          <p className="mx-auto mt-4 max-w-xl text-sm text-red-100/90">
            7/24 canlı seferler, gerçekçi bilet kesme, ikram, emanet eşya ve plaka
            yönetimi ile tam donanımlı sanal otomasyon sistemi.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <a
              href="#giris"
              className="rounded-xl bg-white px-6 py-3 text-sm font-black text-brand shadow-lg transition-transform hover:scale-105"
            >
              Giriş Yap / Bilet Kes
            </a>
            <a
              href="#canli"
              className="rounded-xl bg-black/20 px-6 py-3 text-sm font-black text-white ring-1 ring-white/40 transition-colors hover:bg-black/30"
            >
              Canlı Seferleri İzle
            </a>
          </div>
        </div>
      </section>

      <div id="canli" className="scroll-mt-20">
        <SectionTitle>7/24 Canlı Sefer Ekranı</SectionTitle>
        <LiveBoard seferler={seferler} selectable={false} />
        <p className="mt-3 text-center text-xs text-stone-400">
          Sefer saatleri canlı olarak akar; kalkış saati yaklaştıkça durum otomatik değişir.
        </p>
      </div>

      <div id="giris" className="mt-10 scroll-mt-20">
        <SectionTitle>Otomasyona Giriş</SectionTitle>
        <LoginScreen />
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-3">
        {[
          { t: "🎫 Gerçekçi Bilet", d: "Bilet no, koltuk, plaka, KDV ve fişler otomatik kesilir." },
          { t: "☕ İkram + 🧳 Emanet", d: "Yolcu, sefere ikram ve emanet eşya ekleyip hesap fişi alır." },
          { t: "🛠️ Yönetici Paneli", d: "Sefer, saat, plaka ve fiyatları yönetici yönetir." },
        ].map((f) => (
          <Card key={f.t} className="p-5">
            <div className="text-2xl">{f.t}</div>
            <p className="mt-2 text-sm text-stone-500">{f.d}</p>
          </Card>
        ))}
      </div>
    </AppShell>
  );
}
