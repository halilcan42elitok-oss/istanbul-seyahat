"use client";

import { useState } from "react";
import type { Bilet } from "@/lib/types";
import { FIRMA, KDV_ORAN } from "@/lib/config";
import { tarihTr, tl } from "@/lib/format";
import { Button } from "./ui";

function Barcode({ code }: { code: string }) {
  const bits: ("b" | "n")[] = [];
  const seed = code.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  for (let i = 0; i < 40; i++) {
    const v = (seed * (i + 3) + i * 7) % 10;
    bits.push(v > 4 ? "b" : "n");
  }
  return (
    <div className="flex items-end justify-center gap-[2px] pt-2">
      {bits.map((x, i) => (
        <div
          key={i}
          className={x === "b" ? "w-[2px] bg-stone-900" : "w-[2px] bg-stone-900 h-3"}
          style={{ height: x === "b" ? 32 : 12 }}
        />
      ))}
    </div>
  );
}

function FisiHeader() {
  return (
    <div className="border-b-4 border-dashed border-stone-300 pb-3 text-center">
      <div className="brand-gradient mx-auto rounded-xl px-5 py-2 text-white shadow">
        <div className="text-xl font-black tracking-widest">{FIRMA.ad.toUpperCase()}</div>
        <div className="text-[11px] opacity-90">{FIRMA.slogan}</div>
      </div>
      <div className="mt-2 text-[11px] text-stone-500">
        {FIRMA.adres} · {FIRMA.telefon}
      </div>
    </div>
  );
}

export function YolcuFisi({ bilet }: { bilet: Bilet }) {
  return (
    <div className="print-area bg-white p-4">
      <FisiHeader />
      <div className="mt-3 flex items-center justify-between">
        <div>
          <div className="text-xs font-bold uppercase tracking-widest text-brand">
            Yolcu Fişi / Bilet
          </div>
          <div className="text-lg font-black">{bilet.bilet_no}</div>
        </div>
        <div className="text-right text-xs text-stone-600">
          <div>Tarih: {tarihTr(bilet.tarih)}</div>
          <div>Kalkış: {bilet.saat}</div>
          <div>
            Durum:{" "}
            <b className={bilet.durum === "onaylandi" ? "text-emerald-600" : "text-red-600"}>
              {bilet.durum === "onaylandi" ? "ONAYLANDI" : "İPTAL"}
            </b>
          </div>
        </div>
      </div>

      <div className="my-3 grid grid-cols-2 gap-2 rounded-lg bg-stone-50 p-3 text-sm">
        <div>
          <span className="text-[10px] font-bold uppercase text-stone-400">Yolcu</span>
          <div className="font-bold">
            {bilet.yolcu_ad} {bilet.yolcu_soyad}
          </div>
        </div>
        <div>
          <span className="text-[10px] font-bold uppercase text-stone-400">TC No</span>
          <div className="font-mono">{bilet.kimlik || "—"}</div>
        </div>
        <div>
          <span className="text-[10px] font-bold uppercase text-stone-400">Telefon</span>
          <div>{bilet.telefon || "—"}</div>
        </div>
        <div>
          <span className="text-[10px] font-bold uppercase text-stone-400">Koltuk</span>
          <div className="text-lg font-black text-brand">{bilet.koltuk}</div>
        </div>
      </div>

      <div className="rounded-lg border-2 border-stone-800 p-3 text-sm">
        <div className="flex items-center justify-between gap-2">
          <div className="text-center">
            <div className="text-[10px] font-bold uppercase text-stone-400">Kalkış</div>
            <div className="font-black">{bilet.kalkis.split("(")[0]}</div>
          </div>
          <div className="text-center text-xs font-black tracking-widest text-brand">
            —————→
          </div>
          <div className="text-center">
            <div className="text-[10px] font-bold uppercase text-stone-400">Varış</div>
            <div className="font-black">{bilet.varis.split("(")[0]}</div>
          </div>
        </div>
        <div className="mt-2 border-t border-dashed border-stone-300 pt-1 text-center text-[11px] text-stone-500">
          Mola/Durak: {bilet.durak || "—"} · Hat: {bilet.hat}
        </div>
      </div>

      <div className="mt-3 grid grid-cols-3 gap-2 text-center text-sm">
        <div className="rounded bg-stone-100 p-2">
          <div className="text-[10px] font-bold uppercase text-stone-400">Peron</div>
          <div className="text-lg font-black">—</div>
        </div>
        <div className="rounded bg-stone-100 p-2">
          <div className="text-[10px] font-bold uppercase text-stone-400">Plaka</div>
          <div className="font-mono text-lg font-black">{bilet.plaka}</div>
        </div>
        <div className="rounded bg-stone-100 p-2">
          <div className="text-[10px] font-bold uppercase text-stone-400">Ücret</div>
          <div className="text-lg font-black text-emerald-600">{tl(bilet.toplam)}</div>
        </div>
      </div>

      <Barcode code={bilet.bilet_no} />
      <div className="mt-1 text-center font-mono text-xs tracking-[0.3em] text-stone-500">
        {bilet.bilet_no}
      </div>
      <div className="mt-3 border-t border-dashed border-stone-300 pt-2 text-center text-[10px] text-stone-400">
        Bu bilet İstanbul Seyahat sanal otomasyonu tarafından düzenlenmiştir.
        Binince bilet görevlisine gösteriniz.
      </div>
    </div>
  );
}

export function HesapFisi({ bilet }: { bilet: Bilet }) {
  const kdv = bilet.kdv;
  const net = bilet.ara_toplam;
  return (
    <div className="print-area bg-white p-4">
      <FisiHeader />
      <div className="mt-3 flex items-center justify-between">
        <div>
          <div className="text-xs font-bold uppercase tracking-widest text-brand">
            Hesap Fişi
          </div>
          <div className="text-sm font-bold">{bilet.bilet_no}</div>
        </div>
        <div className="text-right text-xs text-stone-600">
          <div>Kasiyer: {bilet.kasiyer}</div>
          <div>{tarihTr(bilet.tarih)} {bilet.saat}</div>
        </div>
      </div>

      <table className="mt-3 w-full border-collapse text-sm">
        <thead>
          <tr className="border-b-2 border-stone-800 text-left text-xs uppercase text-stone-500">
            <th className="py-1.5">Açıklama</th>
            <th className="py-1.5 text-right">Adet</th>
            <th className="py-1.5 text-right">Tutar</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-stone-200">
            <td className="py-2">
              {bilet.hat}
              <div className="text-[11px] text-stone-400">
                {bilet.kalkis.split("(")[0]} → {bilet.varis.split("(")[0]} · Koltuk {bilet.koltuk}
              </div>
            </td>
            <td className="py-2 text-right">1</td>
            <td className="py-2 text-right font-semibold">{tl(bilet.ucret)}</td>
          </tr>
          {bilet.ikramlar.map((i, ix) => (
            <tr key={ix} className="border-b border-stone-200">
              <td className="py-1.5">İkram · {i.ad}</td>
              <td className="py-1.5 text-right">{i.adet}</td>
              <td className="py-1.5 text-right">{tl(i.fiyat * i.adet)}</td>
            </tr>
          ))}
          {bilet.emanetler.map((e, ix) => (
            <tr key={ix} className="border-b border-stone-200">
              <td className="py-1.5">Emanet · {e.ad}</td>
              <td className="py-1.5 text-right">{e.adet}</td>
              <td className="py-1.5 text-right">{tl(e.fiyat * e.adet)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-3 ml-auto w-56 space-y-1 border-t-2 border-stone-800 pt-2 text-sm">
        <div className="flex justify-between text-stone-500">
          <span>Ara Toplam</span>
          <span>{tl(net)}</span>
        </div>
        <div className="flex justify-between text-stone-500">
          <span>KDV (%{KDV_ORAN * 100})</span>
          <span>{tl(kdv)}</span>
        </div>
        <div className="flex justify-between border-t border-stone-300 pt-1 text-base font-black">
          <span>Ödenecek</span>
          <span className="text-emerald-600">{tl(bilet.toplam)}</span>
        </div>
      </div>

      <div className="mt-3 rounded bg-emerald-50 p-2 text-center text-sm font-bold text-emerald-700">
        ✓ ÖDEME ALINDI · TEŞEKKÜRLER
      </div>
      <div className="mt-2 text-center text-[10px] text-stone-400">
        {FIRMA.ets2} · {FIRMA.web}
      </div>
    </div>
  );
}

export function FisiModal({
  bilet,
  onClose,
}: {
  bilet: Bilet;
  onClose: () => void;
}) {
  const [printMode, setPrintMode] = useState<"yolcu" | "hesap" | null>(null);

  function yazdir(which: "yolcu" | "hesap") {
    setPrintMode(which);
    setTimeout(() => window.print(), 50);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="relative flex max-h-[94vh] w-full max-w-md flex-col overflow-hidden rounded-2xl bg-stone-200 shadow-2xl">
        <div className="no-print flex items-center justify-between gap-2 border-b border-stone-300 bg-white p-3">
          <div className="text-sm font-extrabold text-stone-800">
            {bilet.bilet_no} · Fişler
          </div>
          <div className="flex flex-wrap gap-1.5">
            <Button variant="primary" onClick={() => yazdir("yolcu")}>
              Yolcu Fişi
            </Button>
            <Button variant="primary" onClick={() => yazdir("hesap")}>
              Hesap Fişi
            </Button>
            <Button variant="secondary" onClick={onClose}>
              Kapat
            </Button>
          </div>
        </div>
        <div className="flex-1 space-y-4 overflow-y-auto p-4">
          <div className={printMode === "hesap" ? "print-hide" : ""}>
            <YolcuFisi bilet={bilet} />
          </div>
          <div className={printMode === "yolcu" ? "print-hide" : ""}>
            <HesapFisi bilet={bilet} />
          </div>
        </div>
      </div>
    </div>
  );
}
