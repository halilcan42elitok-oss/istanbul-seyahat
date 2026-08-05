"use client";

import { useEffect, useMemo, useState } from "react";
import type { Sefer } from "@/lib/types";
import { fetchTelemetry, gearMetin, hizKmh, sureMetin, type TelemetryData } from "@/lib/telemetry";
import { Badge, Card, SectionTitle } from "./ui";

type Durum = "bekliyor" | "online" | "offline";

function Kutu({ etiket, deger, on }: { etiket: string; deger: string; on?: boolean }) {
  return (
    <div
      className={`rounded-xl border p-3 ${
        on ? "border-emerald-300 bg-emerald-50" : "border-stone-200 bg-stone-50"
      }`}
    >
      <div className="text-[10px] font-bold uppercase tracking-widest text-stone-400">
        {etiket}
      </div>
      <div className="mt-0.5 font-mono text-lg font-black text-stone-800 tabular-nums">
        {deger}
      </div>
    </div>
  );
}

export function TelemetryPanel({ seferler }: { seferler?: Sefer[] }) {
  const [durum, setDurum] = useState<Durum>("bekliyor");
  const [data, setData] = useState<TelemetryData | null>(null);

  useEffect(() => {
    let canli = true;
    const controller = new AbortController();
    async function tara() {
      const d = await fetchTelemetry(controller.signal);
      if (!canli) return;
      if (d) {
        setData(d);
        setDurum("online");
      } else {
        setData(null);
        setDurum("offline");
      }
    }
    tara();
    const t = setInterval(tara, 2000);
    return () => {
      canli = false;
      controller.abort();
      clearInterval(t);
    };
  }, []);

  const truck = data?.truck;
  const game = data?.game;
  const nav = data?.navigation;
  const job = data?.job;

  const kmh = hizKmh(truck?.speed);
  const hedef = nav?.destinationCity || job?.destinationCity || "";
  const eslesen = useMemo(() => {
    if (!hedef) return null;
    const h = hedef.trim().toLowerCase();
    return (
      seferler?.find((s) => {
        if (!s.aktif) return false;
        const v = s.varis.split("(")[0].trim().toLowerCase();
        return v.includes(h) || h.includes(v);
      }) ?? null
    );
  }, [seferler, hedef]);

  const rozet =
    durum === "online"
      ? game?.connected
        ? { t: "OYUNDA", c: "bg-emerald-100 text-emerald-700" }
        : { t: "BAĞLI · OYUN YOK", c: "bg-amber-100 text-amber-700" }
      : durum === "offline"
        ? { t: "BAĞLANTI YOK", c: "bg-red-100 text-red-600" }
        : { t: "BAĞLANIYOR…", c: "bg-stone-100 text-stone-500" };

  return (
    <Card className="overflow-hidden">
      <div className="brand-gradient flex items-center justify-between px-4 py-3 text-white">
        <div className="flex items-center gap-2">
          <span className="relative flex h-3 w-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-400" />
          </span>
          <h3 className="text-sm font-black uppercase tracking-widest">
            ETS2 Telemetri · Canlı Araç
          </h3>
        </div>
        <Badge className={rozet.c}>{rozet.t}</Badge>
      </div>

      {durum === "offline" ? (
        <div className="px-4 py-6 text-center">
          <div className="text-3xl">🛰️</div>
          <p className="mt-2 text-sm font-bold text-stone-700">
            Oyun telemetrisi bulunamadı
          </p>
          <p className="mx-auto mt-1 max-w-md text-xs leading-relaxed text-stone-400">
            ETS2/ATS çalışıyorken Funbit <b>Ets2 Telemetry Server</b> bilgisayarında açık
            olmalı (localhost:25555). Açıksa ama bağlanamıyorsa CORS rölesini çalıştırın:{" "}
            <code className="rounded bg-stone-100 px-1">
              node scripts/telemetry-relay.mjs
            </code>
          </p>
        </div>
      ) : (
        <div className="grid gap-4 p-4 md:grid-cols-[auto_1fr]">
          <div className="flex flex-col items-center justify-center rounded-2xl bg-stone-900 px-8 py-6 text-white">
            <div className="font-mono text-6xl font-black tabular-nums">
              {kmh ?? "—"}
            </div>
            <div className="mt-1 text-xs font-bold uppercase tracking-widest text-stone-400">
              km/sa
            </div>
            <div className="mt-3 text-sm font-bold">
              {truck?.make || "?"} {truck?.model || ""}
            </div>
            {game?.paused ? (
              <Badge className="mt-1 bg-amber-400/20 text-amber-300">DURAKLADI</Badge>
            ) : null}
          </div>

          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              <Kutu etiket="Vites" deger={gearMetin(truck?.gear)} />
              <Kutu etiket="Hız Limiti" deger={truck?.speedLimit ? `${Math.round(truck.speedLimit)}` : "—"} />
              <Kutu etiket="Yakıt" deger={truck?.fuel ? `${Math.round(truck.fuel)} L` : "—"} />
              <Kutu etiket="Menzil" deger={truck?.fuelRange ? `${Math.round(truck.fuelRange)} km` : "—"} />
              <Kutu etiket="Ort. Tüketim" deger={truck?.fuelAvgConsumption ? `${truck.fuelAvgConsumption.toFixed(1)} L/100` : "—"} />
              <Kutu etiket="Odometer" deger={truck?.odometer ? `${Math.round(truck.odometer)} km` : "—"} />
              <Kutu etiket="Kruiz" deger={truck?.cruiseControlOn ? "AÇIK" : "KAPALI"} on={truck?.cruiseControlOn} />
              <Kutu etiket="Fren / Retarder" deger={`${truck?.brake ? Math.round(truck.brake * 100) : 0} / ${truck?.retarder ? Math.round(truck.retarder * 100) : 0}`} />
            </div>

            <div className="rounded-xl border border-stone-200 p-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="text-xs font-black uppercase tracking-widest text-stone-400">
                  Görev
                </div>
                {job?.cargo ? (
                  <Badge className="bg-violet-100 text-violet-700">{job.cargo}</Badge>
                ) : null}
              </div>
              <div className="mt-2 grid gap-2 text-sm sm:grid-cols-4">
                <div>
                  <div className="text-[10px] font-bold uppercase text-stone-400">Kalkış</div>
                  <div className="font-bold text-stone-700">
                    {nav?.sourceCity || job?.sourceCity || "—"}
                  </div>
                </div>
                <div>
                  <div className="text-[10px] font-bold uppercase text-stone-400">Varış</div>
                  <div className="font-bold text-stone-700">{hedef || "—"}</div>
                </div>
                <div>
                  <div className="text-[10px] font-bold uppercase text-stone-400">Kalan</div>
                  <div className="font-bold text-stone-700">
                    {typeof nav?.distance === "number"
                      ? `${Math.round(nav.distance)} km · ${sureMetin(nav.estimatedTime)}`
                      : "—"}
                  </div>
                </div>
                <div>
                  <div className="text-[10px] font-bold uppercase text-stone-400">Ödeme</div>
                  <div className="font-bold text-emerald-600">
                    {typeof job?.income === "number" ? `€ ${job.income.toLocaleString("tr-TR")}` : "—"}
                  </div>
                </div>
              </div>

              {eslesen ? (
                <div className="mt-2 rounded-lg bg-brand/10 px-3 py-2 text-xs font-bold text-brand">
                  🚌 Bu görev İstanbul Seyahat seferiyle eşleşiyor: {eslesen.hat} ·{" "}
                  {eslesen.ucret.toLocaleString("tr-TR")} ₺
                </div>
              ) : null}
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] text-stone-400">
              <span>
                Konum (oyun) — X {data?.position?.x?.toFixed(0) ?? "—"} · Y{" "}
                {data?.position?.y?.toFixed(0) ?? "—"} · Z {data?.position?.z?.toFixed(0) ?? "—"}
              </span>
              <span>
                Telemetri v{game?.version ?? "?"} · Plugin{" "}
                {game?.telemetryPluginVersion ?? "?"}
              </span>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}

export function TelemetrySection({ seferler }: { seferler?: Sefer[] }) {
  return (
    <>
      <SectionTitle>ETS2 Telemetri</SectionTitle>
      <TelemetryPanel seferler={seferler} />
    </>
  );
}
