"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { Bilet, BiletEmanet, BiletIkram, Emanet, Ikram, Plaka, Sefer, UygunSefer } from "@/lib/types";
import {
  addBilet,
  isDemoMode,
  listBiletler,
  listEmanetler,
  listIkramlar,
  listPlakalar,
  listSeferler,
  nextBiletNo,
} from "@/lib/store";
import { KDV_ORAN, STORAGE_KEYS } from "@/lib/config";
import { koltukNo, tl, uid } from "@/lib/format";
import { localRemove, useLocalStorage } from "@/lib/useLocalStorage";
import { LiveBoard } from "./LiveBoard";
import { FisiModal } from "./Slips";
import { AppShell, CikisButton } from "./AppShell";
import { Badge, Button, Card, Field, Input, SectionTitle, Select, Stat } from "./ui";

type Yolcu = { ad: string; soyad: string; kimlik: string; telefon: string };

export function UserPanel() {
  const router = useRouter();
  const yolcu = useLocalStorage<Yolcu>(STORAGE_KEYS.yolcu);
  const [seferler, setSeferler] = useState<Sefer[]>([]);
  const [plakalar, setPlakalar] = useState<Plaka[]>([]);
  const [ikramlar, setIkramlar] = useState<Ikram[]>([]);
  const [emanetler, setEmanetler] = useState<Emanet[]>([]);
  const [biletler, setBiletler] = useState<Bilet[]>([]);
  const [demo, setDemo] = useState(false);
  const [yuklendi, setYuklendi] = useState(false);

  const [secili, setSecili] = useState<UygunSefer | null>(null);
  const [koltuk, setKoltuk] = useState("01");
  const [plakaId, setPlakaId] = useState("");
  const [ikramSec, setIkramSec] = useState<Record<string, number>>({});
  const [emanetSec, setEmanetSec] = useState<Record<string, boolean>>({});
  const [sonBilet, setSonBilet] = useState<Bilet | null>(null);
  const [mesaj, setMesaj] = useState("");
  const [hata, setHata] = useState("");
  const [kaydetme, setKaydetme] = useState(false);

  async function yenile() {
    const [s, p, i, e, b] = await Promise.all([
      listSeferler(),
      listPlakalar(),
      listIkramlar(),
      listEmanetler(),
      listBiletler(),
    ]);
    setSeferler(s);
    setPlakalar(p);
    setIkramlar(i);
    setEmanetler(e);
    setBiletler(b);
  }

  useEffect(() => {
    if (!yolcu) {
      router.replace("/");
      return;
    }
    isDemoMode().then(setDemo);
    (async () => {
      await yenile();
      setYuklendi(true);
    })();
  }, [yolcu, router]);

  const aktifPlakalar = plakalar.filter((p) => p.aktif);
  const seciliPlaka = plakalar.find((p) => p.id === plakaId) || null;

  const satilanKoltuklar = useMemo(() => {
    if (!secili) return new Set<string>();
    return new Set(
      biletler
        .filter(
          (b) =>
            b.durum === "onaylandi" &&
            b.tarih === secili.tarih &&
            b.saat === secili.saat &&
            b.hat === secili.sefer.hat &&
            b.plaka === (seciliPlaka ? seciliPlaka.plaka : secili.sefer.otobus)
        )
        .map((b) => b.koltuk)
    );
  }, [biletler, secili, seciliPlaka]);

  function otoKoltuk(): string {
    const kap = seciliPlaka?.kapasite ?? 45;
    for (let i = 1; i <= kap; i++) {
      const no = koltukNo(i);
      if (!satilanKoltuklar.has(no)) return no;
    }
    return "DOLU";
  }

  function seferSec(u: UygunSefer) {
    setSecili(u);
    setHata("");
    setMesaj("");
    setIkramSec({});
    setEmanetSec({});
    setPlakaId(plakalar.find((p) => p.plaka === u.sefer.otobus)?.id || "");
    setKoltuk(otoKoltuk());
  }

  const ikramSatir = useMemo(() => {
    return ikramlar
      .filter((i) => i.aktif && (ikramSec[i.id] ?? 0) > 0)
      .map((i) => ({ ikram: i, adet: ikramSec[i.id] }));
  }, [ikramlar, ikramSec]);

  const emanetSatir = useMemo(() => {
    return emanetler.filter((e) => e.aktif && emanetSec[e.id]);
  }, [emanetler, emanetSec]);

  const ikramFiyat = ikramSatir.reduce((t, r) => t + r.ikram.fiyat * r.adet, 0);
  const emanetFiyat = emanetSatir.reduce((t, e) => t + e.fiyat, 0);
  const ucret = secili ? secili.sefer.ucret : 0;
  const araToplam = ucret + ikramFiyat + emanetFiyat;
  const kdv = araToplam * KDV_ORAN;
  const toplam = araToplam + kdv;

  function ikramAdetDegis(id: string, adet: number) {
    setIkramSec((p) => ({ ...p, [id]: Math.max(0, adet) }));
  }

  async function biletKes() {
    if (!secili || !yolcu) return;
    setHata("");
    if (koltuk === "DOLU" || satilanKoltuklar.has(koltuk)) {
      setHata("Seçtiğiniz koltuk dolu, farklı bir koltuk seçin.");
      return;
    }
    if (!seciliPlaka) {
      setHata("Lütfen plaka (otobüs) seçin.");
      return;
    }
    setKaydetme(true);
    try {
      const { no } = await nextBiletNo();
      const yeni: Bilet = {
        id: uid("b"),
        bilet_no: no,
        yolcu_ad: yolcu.ad,
        yolcu_soyad: yolcu.soyad,
        kimlik: yolcu.kimlik,
        telefon: yolcu.telefon,
        sefer_id: secili.sefer.id,
        hat: secili.sefer.hat,
        kalkis: secili.sefer.kalkis,
        varis: secili.sefer.varis,
        durak: secili.sefer.durak,
        tarih: secili.tarih,
        saat: secili.saat,
        koltuk,
        plaka: seciliPlaka.plaka,
        ucret,
        ikramlar: ikramSatir.map((r) => ({
          id: r.ikram.id,
          ad: r.ikram.ad,
          adet: r.adet,
          fiyat: r.ikram.fiyat,
        })) as BiletIkram[],
        emanetler: emanetSatir.map((e) => ({
          id: e.id,
          ad: e.ad,
          adet: 1,
          fiyat: e.fiyat,
        })) as BiletEmanet[],
        ikram_fiyat: ikramFiyat,
        emanet_fiyat: emanetFiyat,
        ara_toplam: araToplam,
        kdv,
        toplam,
        durum: "onaylandi",
        kasiyer: `${yolcu.ad} ${yolcu.soyad}`,
        created_at: new Date().toISOString(),
      };
      await addBilet(yeni);
      await yenile();
      setSonBilet(yeni);
      setSecili(null);
      setIkramSec({});
      setEmanetSec({});
      setMesaj(`${no} numaralı bilet kesildi. Fişleri yazdırabilirsiniz.`);
      setTimeout(() => setMesaj(""), 8000);
    } catch (err) {
      setHata(err instanceof Error ? err.message : "Bilet kesilemedi.");
    } finally {
      setKaydetme(false);
    }
  }

  const benimBiletler = biletler.filter((b) => b.kasiyer === `${yolcu?.ad} ${yolcu?.soyad}`);

  function cikis() {
    localRemove(STORAGE_KEYS.yolcu);
    router.push("/");
  }

  if (!yolcu) return null;

  return (
    <AppShell
      actions={
        <>
          <div className="hidden text-right text-sm md:block">
            <div className="font-black text-white">
              {yolcu.ad} {yolcu.soyad}
            </div>
            <div className="text-[11px] text-red-100">Yolcu</div>
          </div>
          <CikisButton onCikis={cikis} />
        </>
      }
    >
      {demo ? (
        <div className="mb-4 rounded-xl border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          <b>Demo modu:</b> Supabase bağlantısı yok, veriler yalnızca bu tarayıcıda saklanıyor.
          Bulut veritabanı için README adımlarını uygulayın.
        </div>
      ) : null}

      {mesaj ? (
        <div className="mb-4 flex items-center justify-between rounded-xl border border-emerald-300 bg-emerald-50 px-4 py-3 text-sm font-bold text-emerald-700">
          <span>🎟️ {mesaj}</span>
          <Button variant="success" onClick={() => setSonBilet(benimBiletler[0] ?? null)}>
            Fişleri Gör
          </Button>
        </div>
      ) : null}

      {yuklendi && (
        <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <Stat label="Aktif Hat" value={String(seferler.filter((s) => s.aktif).length)} accent="text-brand" />
          <Stat label="Otobüs / Plaka" value={String(aktifPlakalar.length)} accent="text-brand" />
          <Stat label="Kestiğin Bilet" value={String(benimBiletler.length)} accent="text-emerald-600" />
          <Stat
            label="Toplam Harcama"
            value={tl(benimBiletler.reduce((t, b) => t + b.toplam, 0))}
            accent="text-emerald-600"
          />
        </div>
      )}

      <SectionTitle>Canlı Sefer Ekranı</SectionTitle>
      <LiveBoard seferler={seferler} onSelect={seferSec} selectedId={secili?.instanceId} />

      {secili ? (
        <Card className="mt-6 overflow-hidden">
          <div className="brand-gradient px-4 py-3 text-white">
            <div className="flex items-center justify-between">
              <div className="text-sm font-black uppercase tracking-widest">
                Bilet Kesimi · {secili.sefer.hat}
              </div>
              <Badge className="bg-white/20 text-white">
                {secili.tarih.split("-").reverse().join(".")} {secili.saat}
              </Badge>
            </div>
          </div>
          <div className="grid gap-6 p-5 md:grid-cols-2">
            <div className="space-y-3">
              <div className="rounded-xl bg-stone-50 p-3 text-sm">
                <div className="font-bold text-stone-800">
                  {secili.sefer.kalkis}
                </div>
                <div className="text-stone-400">↓</div>
                <div className="font-bold text-stone-800">{secili.sefer.varis}</div>
                <div className="mt-1 text-xs text-stone-500">
                  Mola: {secili.sefer.durak} · Peron {secili.sefer.peron} · Süre{" "}
                  {Math.floor(secili.sefer.sure / 60)} sa {secili.sefer.sure % 60} dk
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Koltuk No">
                  <Input
                    value={koltuk}
                    onChange={(e) => setKoltuk(e.target.value)}
                    inputMode="numeric"
                  />
                </Field>
                <Field label="Plaka (Otobüs)">
                  <Select value={plakaId} onChange={(e) => setPlakaId(e.target.value)}>
                    <option value="">Seçiniz…</option>
                    {aktifPlakalar.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.plaka} · {p.model} ({p.kapasite} koltuk)
                      </option>
                    ))}
                  </Select>
                </Field>
              </div>
              {satilanKoltuklar.size > 0 ? (
                <div className="text-xs text-stone-500">
                  Dolu koltuklar: {Array.from(satilanKoltuklar).sort().join(", ")} · Önerilen:{" "}
                  <b className="text-brand">{otoKoltuk()}</b>
                </div>
              ) : null}

              <Field label="İkramlar" hint="Adet seçerek ekleyin">
                <div className="mt-1 space-y-2">
                  {ikramlar
                    .filter((i) => i.aktif)
                    .map((i) => (
                      <div
                        key={i.id}
                        className="flex items-center justify-between rounded-lg border border-stone-200 px-3 py-2"
                      >
                        <div>
                          <div className="text-sm font-bold text-stone-700">{i.ad}</div>
                          <div className="text-[11px] text-stone-400">
                            {i.kategori} · {tl(i.fiyat)}
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          <button
                            className="h-8 w-8 rounded-lg bg-stone-100 font-black hover:bg-stone-200"
                            onClick={() => ikramAdetDegis(i.id, (ikramSec[i.id] ?? 0) - 1)}
                          >
                            −
                          </button>
                          <span className="w-8 text-center font-black">
                            {ikramSec[i.id] ?? 0}
                          </span>
                          <button
                            className="h-8 w-8 rounded-lg bg-stone-100 font-black hover:bg-stone-200"
                            onClick={() => ikramAdetDegis(i.id, (ikramSec[i.id] ?? 0) + 1)}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
              </Field>

              <Field label="Emanet (Emanet Eşya)">
                <div className="mt-1 space-y-2">
                  {emanetler
                    .filter((e) => e.aktif)
                    .map((e) => (
                      <label
                        key={e.id}
                        className="flex cursor-pointer items-center justify-between rounded-lg border border-stone-200 px-3 py-2"
                      >
                        <div>
                          <div className="text-sm font-bold text-stone-700">{e.ad}</div>
                          <div className="text-[11px] text-stone-400">{tl(e.fiyat)}</div>
                        </div>
                        <input
                          type="checkbox"
                          checked={Boolean(emanetSec[e.id])}
                          onChange={(ev) =>
                            setEmanetSec((p) => ({ ...p, [e.id]: ev.target.checked }))
                          }
                          className="h-5 w-5 accent-red-700"
                        />
                      </label>
                    ))}
                </div>
              </Field>
            </div>

            <div className="flex flex-col">
              <div className="rounded-xl bg-stone-50 p-4">
                <div className="mb-3 text-xs font-black uppercase tracking-widest text-stone-500">
                  Hesap Özeti
                </div>
                <div className="space-y-1.5 text-sm">
                  <div className="flex justify-between">
                    <span className="text-stone-500">Bilet Ücreti</span>
                    <span className="font-bold">{tl(ucret)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500">İkram ({ikramSatir.length} kalem)</span>
                    <span className="font-bold">{tl(ikramFiyat)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500">Emanet ({emanetSatir.length} kalem)</span>
                    <span className="font-bold">{tl(emanetFiyat)}</span>
                  </div>
                  <div className="flex justify-between border-t border-stone-200 pt-1.5">
                    <span className="text-stone-500">Ara Toplam</span>
                    <span className="font-bold">{tl(araToplam)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500">KDV (%{KDV_ORAN * 100})</span>
                    <span className="font-bold">{tl(kdv)}</span>
                  </div>
                  <div className="flex justify-between border-t-2 border-stone-800 pt-1.5 text-lg font-black text-brand">
                    <span>TOPLAM</span>
                    <span>{tl(toplam)}</span>
                  </div>
                </div>
              </div>

              {hata ? (
                <div className="mt-3 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm font-semibold text-red-600">
                  {hata}
                </div>
              ) : null}

              <Button
                className="mt-4 w-full py-3 text-base"
                onClick={biletKes}
                disabled={kaydetme}
              >
                {kaydetme ? "Kesiliyor…" : "🎟️ BİLETİ KES & FİŞLERİ AL"}
              </Button>
              <p className="mt-2 text-center text-xs text-stone-400">
                Bilet kesildikten sonra yolcu fişi ve hesap fişi yazdırılabilir.
              </p>
            </div>
          </div>
        </Card>
      ) : null}

      {benimBiletler.length > 0 ? (
        <div className="mt-8">
          <SectionTitle>Biletlerim</SectionTitle>
          <Card>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[720px] text-sm">
                <thead>
                  <tr className="border-b border-stone-200 bg-stone-50 text-left text-xs font-bold uppercase tracking-wide text-stone-500">
                    <th className="px-4 py-2.5">Bilet No</th>
                    <th className="px-4 py-2.5">Sefer</th>
                    <th className="px-4 py-2.5">Tarih / Saat</th>
                    <th className="px-4 py-2.5">Koltuk / Plaka</th>
                    <th className="px-4 py-2.5">Durum</th>
                    <th className="px-4 py-2.5 text-right">Tutar</th>
                    <th className="px-4 py-2.5" />
                  </tr>
                </thead>
                <tbody>
                  {benimBiletler.map((b) => (
                    <tr key={b.id} className="border-b border-stone-100 hover:bg-stone-50">
                      <td className="px-4 py-2.5 font-mono font-bold text-brand">{b.bilet_no}</td>
                      <td className="px-4 py-2.5">
                        <div className="font-bold text-stone-700">{b.hat}</div>
                        <div className="text-[11px] text-stone-400">
                          {b.kalkis.split("(")[0]} → {b.varis.split("(")[0]}
                        </div>
                      </td>
                      <td className="px-4 py-2.5 text-xs">
                        <div>{b.tarih.split("-").reverse().join(".")}</div>
                        <div className="font-mono font-bold">{b.saat}</div>
                      </td>
                      <td className="px-4 py-2.5 text-xs">
                        <div className="font-black text-brand">K {b.koltuk}</div>
                        <div className="font-mono">{b.plaka}</div>
                      </td>
                      <td className="px-4 py-2.5">
                        <Badge
                          className={
                            b.durum === "onaylandi"
                              ? "bg-emerald-100 text-emerald-700"
                              : "bg-red-100 text-red-600"
                          }
                        >
                          {b.durum === "onaylandi" ? "ONAYLANDI" : "İPTAL"}
                        </Badge>
                      </td>
                      <td className="px-4 py-2.5 text-right font-black">{tl(b.toplam)}</td>
                      <td className="px-4 py-2.5">
                        <Button variant="secondary" onClick={() => setSonBilet(b)}>
                          Fiş
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      ) : null}

      {sonBilet ? (
        <FisiModal bilet={sonBilet} onClose={() => setSonBilet(null)} />
      ) : null}
    </AppShell>
  );
}
