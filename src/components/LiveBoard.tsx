"use client";

import { useEffect, useMemo, useState } from "react";
import type { Sefer, UygunSefer } from "@/lib/types";
import { canliSeferler, durumAdi, durumRenk, kalanMetin } from "@/lib/live";
import { saatStrSn, tarihTr } from "@/lib/format";
import { Badge } from "./ui";

const AY_ADLARI = [
  "Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran",
  "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık",
];

export function Clock() {
  const [now, setNow] = useState<Date>(() => new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="flex flex-col items-end">
      <div className="font-mono text-2xl font-black tracking-widest text-stone-800 tabular-nums">
        {saatStrSn(now)}
      </div>
      <div className="text-xs font-semibold text-stone-500">
        {now.getDate()} {AY_ADLARI[now.getMonth()]} {now.getFullYear()}
      </div>
    </div>
  );
}

export function LiveBoard({
  seferler,
  onSelect,
  selectedId,
  selectable = true,
}: {
  seferler: Sefer[];
  onSelect?: (s: UygunSefer) => void;
  selectedId?: string;
  selectable?: boolean;
}) {
  const [now, setNow] = useState<number>(() => Date.now());

  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 30000);
    return () => clearInterval(t);
  }, []);

  const list = useMemo(
    () => canliSeferler(seferler.filter((s) => s.aktif), now, 6),
    [seferler, now]
  );

  return (
    <div className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm">
      <div className="brand-gradient flex items-center justify-between px-4 py-3 text-white">
        <div className="flex items-center gap-2">
          <span className="relative flex h-3 w-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-400" />
          </span>
          <h3 className="text-sm font-black uppercase tracking-widest">
            Canlı Sefer Ekranı · 7/24
          </h3>
        </div>
        <div className="font-mono text-lg font-black tabular-nums">
          {saatStrSn(new Date(now))}
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px] text-sm">
          <thead>
            <tr className="border-b border-stone-200 bg-stone-50 text-left text-xs font-bold uppercase tracking-wide text-stone-500">
              <th className="px-4 py-2.5">Sefer</th>
              <th className="px-4 py-2.5">Güzergâh</th>
              <th className="px-4 py-2.5">Mola / Duraklar</th>
              <th className="px-4 py-2.5">Kalkış</th>
              <th className="px-4 py-2.5">Kalan</th>
              <th className="px-4 py-2.5">Durum</th>
              <th className="px-4 py-2.5">Otobüs</th>
              {selectable ? <th className="px-4 py-2.5" /> : null}
            </tr>
          </thead>
          <tbody>
            {list.map((u) => {
              const satilabilir =
                u.durum === "bekliyor" || u.durum === "kapida" || u.durum === "kalkisa-hazir";
              const secili = selectedId === u.instanceId;
              return (
                <tr
                  key={u.instanceId}
                  className={`border-b border-stone-100 transition-colors ${
                    secili ? "bg-red-50" : "hover:bg-stone-50"
                  }`}
                >
                  <td className="px-4 py-2.5">
                    <div className="font-extrabold text-stone-800">{u.sefer.hat}</div>
                    <div className="text-[11px] text-stone-400">
                      {tarihTr(u.tarih)} · Peron {u.sefer.peron}
                    </div>
                  </td>
                  <td className="px-4 py-2.5 text-xs text-stone-600">
                    <div className="font-semibold">{u.sefer.kalkis}</div>
                    <div className="text-stone-400">↓</div>
                    <div className="font-semibold">{u.sefer.varis}</div>
                  </td>
                  <td className="px-4 py-2.5 text-xs text-stone-500">{u.sefer.durak}</td>
                  <td className="px-4 py-2.5 font-mono text-base font-black text-stone-800">
                    {u.saat}
                  </td>
                  <td className="px-4 py-2.5 text-xs font-semibold text-stone-600">
                    {kalanMetin(u.kalanDk, u.durum)}
                  </td>
                  <td className="px-4 py-2.5">
                    <Badge className={durumRenk(u.durum)}>{durumAdi(u.durum)}</Badge>
                  </td>
                  <td className="px-4 py-2.5 font-mono text-xs font-bold text-stone-700">
                    {u.sefer.otobus}
                  </td>
                  {selectable ? (
                    <td className="px-4 py-2.5">
                      <button
                        disabled={!satilabilir}
                        onClick={() => onSelect?.(u)}
                        className={`rounded-lg px-3 py-1.5 text-xs font-bold transition-colors disabled:cursor-not-allowed disabled:opacity-40 ${
                          secili
                            ? "bg-stone-800 text-white"
                            : "bg-brand text-white hover:bg-red-800"
                        }`}
                      >
                        {secili ? "SEÇİLDİ" : "BİLET KES"}
                      </button>
                    </td>
                  ) : null}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
