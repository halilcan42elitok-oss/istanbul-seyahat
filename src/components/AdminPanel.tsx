"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { Bilet, Emanet, Ikram, Plaka, Sefer } from "@/lib/types";
import {
  deleteBilet,
  deleteEmanet,
  deleteIkram,
  deletePlaka,
  deleteSefer,
  isDemoMode,
  listBiletler,
  listEmanetler,
  listIkramlar,
  listPlakalar,
  listSeferler,
  resetDemo,
  saveEmanet,
  saveIkram,
  savePlaka,
  saveSefer,
  updateBiletDurum,
} from "@/lib/store";
import { STORAGE_KEYS } from "@/lib/config";
import { localRemove, useLocalStorage } from "@/lib/useLocalStorage";
import { tarihTr, tl, uid } from "@/lib/format";
import { AppShell, CikisButton } from "./AppShell";
import { FisiModal } from "./Slips";
import {
  Badge,
  Button,
  Card,
  Field,
  Input,
  Modal,
  SectionTitle,
  Select,
  Stat,
} from "./ui";

type Tab = "seferler" | "plakalar" | "ikramlar" | "emanetler" | "biletler" | "ayarlar";

function Toggle({ on, onChange }: { on: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      onClick={() => onChange(!on)}
      className={`relative h-6 w-11 rounded-full transition-colors ${
        on ? "bg-emerald-500" : "bg-stone-300"
      }`}
    >
      <span
        className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all ${
          on ? "left-[22px]" : "left-0.5"
        }`}
      />
    </button>
  );
}

export function AdminPanel() {
  const router = useRouter();
  const yetki = useLocalStorage<{ giris: number }>(STORAGE_KEYS.admin);
  const [tab, setTab] = useState<Tab>("seferler");
  const [demo, setDemo] = useState(false);

  const [seferler, setSeferler] = useState<Sefer[]>([]);
  const [plakalar, setPlakalar] = useState<Plaka[]>([]);
  const [ikramlar, setIkramlar] = useState<Ikram[]>([]);
  const [emanetler, setEmanetler] = useState<Emanet[]>([]);
  const [biletler, setBiletler] = useState<Bilet[]>([]);
  const [arama, setArama] = useState("");
  const [fis, setFis] = useState<Bilet | null>(null);
  const [mesaj, setMesaj] = useState("");

  const [seferForm, setSeferForm] = useState<Sefer | null>(null);
  const [plakaForm, setPlakaForm] = useState<Plaka | null>(null);
  const [ikramForm, setIkramForm] = useState<Ikram | null>(null);
  const [emanetForm, setEmanetForm] = useState<Emanet | null>(null);

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
    if (!yetki) {
      router.replace("/");
      return;
    }
    isDemoMode().then(setDemo);
    (async () => {
      await yenile();
    })();
  }, [yetki, router]);

  function bildir(m: string) {
    setMesaj(m);
    setTimeout(() => setMesaj(""), 5000);
  }

  function cikis() {
    localRemove(STORAGE_KEYS.admin);
    router.push("/");
  }

  const ciro = useMemo(
    () =>
      biletler
        .filter((b) => b.durum === "onaylandi")
        .reduce((t, b) => t + b.toplam, 0),
    [biletler]
  );

  const filtrelenenBiletler = useMemo(() => {
    const q = arama.trim().toLowerCase();
    if (!q) return biletler;
    return biletler.filter((b) =>
      [b.bilet_no, b.yolcu_ad, b.yolcu_soyad, b.hat, b.plaka, b.kimlik]
        .join(" ")
        .toLowerCase()
        .includes(q)
    );
  }, [biletler, arama]);

  if (!yetki) return null;

  const seferBos: Sefer = {
    id: uid("s"),
    hat: "",
    kalkis: "",
    varis: "",
    durak: "",
    ilk_saat: "08:00",
    siklik: 60,
    sure: 300,
    ucret: 500,
    peron: "1",
    otobus: plakalar.find((p) => p.aktif)?.plaka ?? "",
    aktif: true,
  };

  const plakaBos: Plaka = { id: uid("p"), plaka: "", model: "", kapasite: 45, aktif: true };
  const ikramBos: Ikram = { id: uid("i"), ad: "", kategori: "Sıcak İçecek", fiyat: 10, aktif: true };
  const emanetBos: Emanet = { id: uid("e"), ad: "", fiyat: 50, aktif: true };

  const sekmeler: { id: Tab; ad: string }[] = [
    { id: "seferler", ad: "🚌 Seferler" },
    { id: "plakalar", ad: "🚍 Plakalar" },
    { id: "ikramlar", ad: "☕ İkramlar" },
    { id: "emanetler", ad: "🧳 Emanet" },
    { id: "biletler", ad: "🎫 Biletler" },
    { id: "ayarlar", ad: "⚙️ Ayarlar" },
  ];

  return (
    <AppShell
      actions={
        <>
          <div className="hidden text-right text-sm md:block">
            <div className="font-black text-white">Yönetici</div>
            <div className="text-[11px] text-red-100">Kontrol Paneli</div>
          </div>
          <CikisButton onCikis={cikis} />
        </>
      }
    >
      {demo ? (
        <div className="mb-4 rounded-xl border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          <b>Demo modu:</b> Değişiklikler yalnızca bu tarayıcıda kalır. Kalıcı bulut için
          README adımlarını uygulayın (Supabase + Vercel).
        </div>
      ) : null}
      {mesaj ? (
        <div className="mb-4 rounded-xl border border-emerald-300 bg-emerald-50 px-4 py-3 text-sm font-bold text-emerald-700">
          ✓ {mesaj}
        </div>
      ) : null}

      <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Stat label="Toplam Bilet" value={String(biletler.length)} accent="text-brand" />
        <Stat label="Ciro (Onaylı)" value={tl(ciro)} accent="text-emerald-600" />
        <Stat label="Aktif Hat" value={String(seferler.filter((s) => s.aktif).length)} accent="text-brand" />
        <Stat label="Tanımlı Plaka" value={String(plakalar.filter((p) => p.aktif).length)} accent="text-brand" />
      </div>

      <div className="mb-5 flex flex-wrap gap-1.5 rounded-xl bg-stone-200/70 p-1.5">
        {sekmeler.map((s) => (
          <button
            key={s.id}
            onClick={() => setTab(s.id)}
            className={`rounded-lg px-3 py-2 text-sm font-bold transition-colors ${
              tab === s.id ? "bg-white text-brand shadow" : "text-stone-600 hover:bg-white/60"
            }`}
          >
            {s.ad}
          </button>
        ))}
      </div>

      {tab === "seferler" ? (
        <div>
          <SectionTitle>Sefer Yönetimi</SectionTitle>
          <div className="mb-3 flex items-center justify-between gap-3">
            <p className="text-sm text-stone-500">
              Seferler {seferler.length} adet. Seferler 7/24 canlı olarak otomatik tekrar eder.
            </p>
            <Button onClick={() => setSeferForm({ ...seferBos })}>+ Yeni Sefer</Button>
          </div>
          <Card>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[820px] text-sm">
                <thead>
                  <tr className="border-b border-stone-200 bg-stone-50 text-left text-xs font-bold uppercase tracking-wide text-stone-500">
                    <th className="px-4 py-2.5">Hat</th>
                    <th className="px-4 py-2.5">İlk Kalkış</th>
                    <th className="px-4 py-2.5">Sıklık</th>
                    <th className="px-4 py-2.5">Süre</th>
                    <th className="px-4 py-2.5">Ücret</th>
                    <th className="px-4 py-2.5">Peron</th>
                    <th className="px-4 py-2.5">Otobüs</th>
                    <th className="px-4 py-2.5">Aktif</th>
                    <th className="px-4 py-2.5" />
                  </tr>
                </thead>
                <tbody>
                  {seferler.map((s) => (
                    <tr key={s.id} className="border-b border-stone-100 hover:bg-stone-50">
                      <td className="px-4 py-2.5">
                        <div className="font-bold text-stone-800">{s.hat}</div>
                        <div className="text-[11px] text-stone-400">
                          {s.kalkis.split("(")[0]} → {s.varis.split("(")[0]} · {s.durak}
                        </div>
                      </td>
                      <td className="px-4 py-2.5 font-mono font-bold">{s.ilk_saat}</td>
                      <td className="px-4 py-2.5 text-xs">{s.siklik} dk</td>
                      <td className="px-4 py-2.5 text-xs">
                        {Math.floor(s.sure / 60)} sa {s.sure % 60} dk
                      </td>
                      <td className="px-4 py-2.5 font-bold">{tl(s.ucret)}</td>
                      <td className="px-4 py-2.5">{s.peron}</td>
                      <td className="px-4 py-2.5 font-mono text-xs">{s.otobus}</td>
                      <td className="px-4 py-2.5">
                        <Toggle
                          on={s.aktif}
                          onChange={async (v) => {
                            await saveSefer({ ...s, aktif: v });
                            await yenile();
                          }}
                        />
                      </td>
                      <td className="px-4 py-2.5">
                        <div className="flex gap-1">
                          <Button variant="secondary" onClick={() => setSeferForm({ ...s })}>
                            Düzenle
                          </Button>
                          <Button
                            variant="danger"
                            onClick={async () => {
                              if (confirm(`${s.hat} seferi silinsin mi?`)) {
                                await deleteSefer(s.id);
                                await yenile();
                              }
                            }}
                          >
                            Sil
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      ) : null}

      {tab === "plakalar" ? (
        <div>
          <SectionTitle>Plaka Tanımlama</SectionTitle>
          <div className="mb-3 flex items-center justify-between gap-3">
            <p className="text-sm text-stone-500">
              Plakaları yönetici tanımlar, yolcular bilet keserken buradan plakasını seçer.
            </p>
            <Button onClick={() => setPlakaForm({ ...plakaBos })}>+ Yeni Plaka</Button>
          </div>
          <Card>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px] text-sm">
                <thead>
                  <tr className="border-b border-stone-200 bg-stone-50 text-left text-xs font-bold uppercase tracking-wide text-stone-500">
                    <th className="px-4 py-2.5">Plaka</th>
                    <th className="px-4 py-2.5">Model</th>
                    <th className="px-4 py-2.5">Kapasite</th>
                    <th className="px-4 py-2.5">Aktif</th>
                    <th className="px-4 py-2.5" />
                  </tr>
                </thead>
                <tbody>
                  {plakalar.map((p) => (
                    <tr key={p.id} className="border-b border-stone-100 hover:bg-stone-50">
                      <td className="px-4 py-2.5 font-mono text-base font-black text-brand">{p.plaka}</td>
                      <td className="px-4 py-2.5 font-bold text-stone-700">{p.model}</td>
                      <td className="px-4 py-2.5">{p.kapasite} koltuk</td>
                      <td className="px-4 py-2.5">
                        <Toggle
                          on={p.aktif}
                          onChange={async (v) => {
                            await savePlaka({ ...p, aktif: v });
                            await yenile();
                          }}
                        />
                      </td>
                      <td className="px-4 py-2.5">
                        <div className="flex gap-1">
                          <Button variant="secondary" onClick={() => setPlakaForm({ ...p })}>
                            Düzenle
                          </Button>
                          <Button
                            variant="danger"
                            onClick={async () => {
                              if (confirm(`${p.plaka} silinsin mi?`)) {
                                await deletePlaka(p.id);
                                await yenile();
                              }
                            }}
                          >
                            Sil
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      ) : null}

      {tab === "ikramlar" ? (
        <div>
          <SectionTitle>İkram Yönetimi</SectionTitle>
          <div className="mb-3 flex items-center justify-between gap-3">
            <p className="text-sm text-stone-500">Yolcuların bilet keserken ekleyebileceği ikramlar.</p>
            <Button onClick={() => setIkramForm({ ...ikramBos })}>+ Yeni İkram</Button>
          </div>
          <Card>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[520px] text-sm">
                <thead>
                  <tr className="border-b border-stone-200 bg-stone-50 text-left text-xs font-bold uppercase tracking-wide text-stone-500">
                    <th className="px-4 py-2.5">İkram</th>
                    <th className="px-4 py-2.5">Kategori</th>
                    <th className="px-4 py-2.5">Fiyat</th>
                    <th className="px-4 py-2.5">Aktif</th>
                    <th className="px-4 py-2.5" />
                  </tr>
                </thead>
                <tbody>
                  {ikramlar.map((i) => (
                    <tr key={i.id} className="border-b border-stone-100 hover:bg-stone-50">
                      <td className="px-4 py-2.5 font-bold text-stone-700">{i.ad}</td>
                      <td className="px-4 py-2.5">
                        <Badge className="bg-sky-100 text-sky-700">{i.kategori}</Badge>
                      </td>
                      <td className="px-4 py-2.5 font-bold">{tl(i.fiyat)}</td>
                      <td className="px-4 py-2.5">
                        <Toggle
                          on={i.aktif}
                          onChange={async (v) => {
                            await saveIkram({ ...i, aktif: v });
                            await yenile();
                          }}
                        />
                      </td>
                      <td className="px-4 py-2.5">
                        <div className="flex gap-1">
                          <Button variant="secondary" onClick={() => setIkramForm({ ...i })}>
                            Düzenle
                          </Button>
                          <Button
                            variant="danger"
                            onClick={async () => {
                              if (confirm(`${i.ad} silinsin mi?`)) {
                                await deleteIkram(i.id);
                                await yenile();
                              }
                            }}
                          >
                            Sil
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      ) : null}

      {tab === "emanetler" ? (
        <div>
          <SectionTitle>Emanet Eşya Fiyatları</SectionTitle>
          <div className="mb-3 flex items-center justify-between gap-3">
            <p className="text-sm text-stone-500">Yolcuların emanet ekleme seçenekleri ve fiyatları.</p>
            <Button onClick={() => setEmanetForm({ ...emanetBos })}>+ Yeni Emanet Türü</Button>
          </div>
          <Card>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[480px] text-sm">
                <thead>
                  <tr className="border-b border-stone-200 bg-stone-50 text-left text-xs font-bold uppercase tracking-wide text-stone-500">
                    <th className="px-4 py-2.5">Emanet</th>
                    <th className="px-4 py-2.5">Fiyat</th>
                    <th className="px-4 py-2.5">Aktif</th>
                    <th className="px-4 py-2.5" />
                  </tr>
                </thead>
                <tbody>
                  {emanetler.map((e) => (
                    <tr key={e.id} className="border-b border-stone-100 hover:bg-stone-50">
                      <td className="px-4 py-2.5 font-bold text-stone-700">{e.ad}</td>
                      <td className="px-4 py-2.5 font-bold">{tl(e.fiyat)}</td>
                      <td className="px-4 py-2.5">
                        <Toggle
                          on={e.aktif}
                          onChange={async (v) => {
                            await saveEmanet({ ...e, aktif: v });
                            await yenile();
                          }}
                        />
                      </td>
                      <td className="px-4 py-2.5">
                        <div className="flex gap-1">
                          <Button variant="secondary" onClick={() => setEmanetForm({ ...e })}>
                            Düzenle
                          </Button>
                          <Button
                            variant="danger"
                            onClick={async () => {
                              if (confirm(`${e.ad} silinsin mi?`)) {
                                await deleteEmanet(e.id);
                                await yenile();
                              }
                            }}
                          >
                            Sil
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      ) : null}

      {tab === "biletler" ? (
        <div>
          <SectionTitle>Kesilen Biletler</SectionTitle>
          <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
            <Input
              placeholder="Ara: bilet no, yolcu, hat, plaka…"
              value={arama}
              onChange={(e) => setArama(e.target.value)}
              className="max-w-xs"
            />
            <span className="text-sm text-stone-500">
              {filtrelenenBiletler.length} bilet · {tarihTr(tarihStrYeni())} günü işlemleri
            </span>
          </div>
          <Card>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[860px] text-sm">
                <thead>
                  <tr className="border-b border-stone-200 bg-stone-50 text-left text-xs font-bold uppercase tracking-wide text-stone-500">
                    <th className="px-4 py-2.5">Bilet No</th>
                    <th className="px-4 py-2.5">Yolcu</th>
                    <th className="px-4 py-2.5">Sefer</th>
                    <th className="px-4 py-2.5">Tarih/Saat</th>
                    <th className="px-4 py-2.5">Koltuk/Plaka</th>
                    <th className="px-4 py-2.5">Durum</th>
                    <th className="px-4 py-2.5 text-right">Tutar</th>
                    <th className="px-4 py-2.5" />
                  </tr>
                </thead>
                <tbody>
                  {filtrelenenBiletler.map((b) => (
                    <tr key={b.id} className="border-b border-stone-100 hover:bg-stone-50">
                      <td className="px-4 py-2.5 font-mono font-bold text-brand">{b.bilet_no}</td>
                      <td className="px-4 py-2.5">
                        <div className="font-bold text-stone-700">
                          {b.yolcu_ad} {b.yolcu_soyad}
                        </div>
                        <div className="text-[11px] text-stone-400">{b.kasiyer}</div>
                      </td>
                      <td className="px-4 py-2.5 text-xs">
                        <div className="font-semibold">{b.hat}</div>
                        <div className="text-stone-400">
                          {b.kalkis.split("(")[0]} → {b.varis.split("(")[0]}
                        </div>
                      </td>
                      <td className="px-4 py-2.5 text-xs">
                        <div>{tarihTr(b.tarih)}</div>
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
                        <div className="flex flex-wrap gap-1">
                          <Button variant="secondary" onClick={() => setFis(b)}>
                            Fiş
                          </Button>
                          <Button
                            variant={b.durum === "onaylandi" ? "danger" : "success"}
                            onClick={async () => {
                              await updateBiletDurum(
                                b.id,
                                b.durum === "onaylandi" ? "iptal" : "onaylandi"
                              );
                              await yenile();
                            }}
                          >
                            {b.durum === "onaylandi" ? "İptal" : "Onayla"}
                          </Button>
                          <Button
                            variant="ghost"
                            onClick={async () => {
                              if (confirm(`${b.bilet_no} kalıcı olarak silinsin mi?`)) {
                                await deleteBilet(b.id);
                                await yenile();
                              }
                            }}
                          >
                            🗑️
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {filtrelenenBiletler.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="px-4 py-10 text-center text-stone-400">
                        Henüz bilet kesilmedi.
                      </td>
                    </tr>
                  ) : null}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      ) : null}

      {tab === "ayarlar" ? (
        <div className="grid gap-4 md:grid-cols-2">
          <Card className="p-5">
            <SectionTitle>Bağlantı Durumu</SectionTitle>
            {demo ? (
              <div className="space-y-2 text-sm">
                <div className="rounded-lg bg-amber-50 px-3 py-2 font-semibold text-amber-800">
                  Şu an demo moddasınız — veriler yalnızca bu tarayıcıda.
                </div>
                <p className="text-stone-500">
                  Kalıcı bulut kullanımı için <code>.env.local</code> içine Supabase anahtarlarını
                  ekleyin (README bakın).
                </p>
              </div>
            ) : (
              <div className="rounded-lg bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-700">
                Supabase bulut bağlantısı aktif. Veriler tüm cihazlarda ortak.
              </div>
            )}
            <Button
              variant="danger"
              className="mt-4"
              onClick={async () => {
                if (confirm("Tüm verileri sıfırlayıp örnek verileri geri yüklesin mi?")) {
                  await resetDemo();
                  await yenile();
                  bildir("Veriler sıfırlandı.");
                }
              }}
            >
              Örnek Verilere Sıfırla
            </Button>
          </Card>
          <Card className="p-5">
            <SectionTitle>Yönetici Bilgileri</SectionTitle>
            <p className="mb-3 text-sm text-stone-500">
              Giriş bilgileri <code>.env.local</code> veya Vercel ortam değişkenleriyle
              değiştirilebilir:
            </p>
            <pre className="overflow-x-auto rounded-lg bg-stone-900 p-4 text-xs text-stone-100">
              {`NEXT_PUBLIC_ADMIN_USER=scsttadmin
NEXT_PUBLIC_ADMIN_PASS=scsttadmin34`}
            </pre>
            <p className="mt-3 text-xs text-stone-400">
              İpucu: Yolcu kendisi için plaka seçerken yalnızca burada tanımlanan ve
              aktif işaretlenen plakaları görebilir.
            </p>
          </Card>
        </div>
      ) : null}

      <SeferFormModal
        key={seferForm?.id ?? "sefer-yeni"}
        form={seferForm}
        plakalar={plakalar}
        onClose={() => setSeferForm(null)}
        onSave={async (s) => {
          await saveSefer(s);
          await yenile();
          setSeferForm(null);
          bildir("Sefer kaydedildi.");
        }}
      />
      <PlakaFormModal
        key={plakaForm?.id ?? "plaka-yeni"}
        form={plakaForm}
        onClose={() => setPlakaForm(null)}
        onSave={async (p) => {
          await savePlaka(p);
          await yenile();
          setPlakaForm(null);
          bildir("Plaka kaydedildi.");
        }}
      />
      <IkramFormModal
        key={ikramForm?.id ?? "ikram-yeni"}
        form={ikramForm}
        onClose={() => setIkramForm(null)}
        onSave={async (i) => {
          await saveIkram(i);
          await yenile();
          setIkramForm(null);
          bildir("İkram kaydedildi.");
        }}
      />
      <EmanetFormModal
        key={emanetForm?.id ?? "emanet-yeni"}
        form={emanetForm}
        onClose={() => setEmanetForm(null)}
        onSave={async (e) => {
          await saveEmanet(e);
          await yenile();
          setEmanetForm(null);
          bildir("Emanet kaydedildi.");
        }}
      />

      {fis ? <FisiModal bilet={fis} onClose={() => setFis(null)} /> : null}
    </AppShell>
  );
}

function tarihStrYeni(): string {
  const d = new Date();
  return `${String(d.getDate()).padStart(2, "0")}.${String(d.getMonth() + 1).padStart(2, "0")}.${d.getFullYear()}`;
}

function SeferFormModal({
  form,
  plakalar,
  onClose,
  onSave,
}: {
  form: Sefer | null;
  plakalar: Plaka[];
  onClose: () => void;
  onSave: (s: Sefer) => void;
}) {
  const [f, setF] = useState<Sefer | null>(form);
  if (!form || !f) return null;
  return (
    <Modal open onClose={onClose} wide>
      <div className="border-b border-stone-200 px-5 py-4 text-lg font-black text-stone-800">
        {f.id.startsWith("s_") ? "Yeni Sefer" : "Seferi Düzenle"}
      </div>
      <div className="grid gap-3 p-5 sm:grid-cols-2">
        <Field label="Hat (İSTANBUL → ANKARA)">
          <Input value={f.hat} onChange={(e) => setF({ ...f, hat: e.target.value })} />
        </Field>
        <Field label="Otobüs (plaka)">
          <Select value={f.otobus} onChange={(e) => setF({ ...f, otobus: e.target.value })}>
            {plakalar.filter((p) => p.aktif).map((p) => (
              <option key={p.id} value={p.plaka}>
                {p.plaka} · {p.model}
              </option>
            ))}
          </Select>
        </Field>
        <Field label="Kalkış Noktası">
          <Input value={f.kalkis} onChange={(e) => setF({ ...f, kalkis: e.target.value })} />
        </Field>
        <Field label="Varış Noktası">
          <Input value={f.varis} onChange={(e) => setF({ ...f, varis: e.target.value })} />
        </Field>
        <Field label="Mola / Duraklar (ortalar)" hint="Virgülle ayırın: Gerede · Bolu">
          <Input value={f.durak} onChange={(e) => setF({ ...f, durak: e.target.value })} />
        </Field>
        <Field label="Peron">
          <Input value={f.peron} onChange={(e) => setF({ ...f, peron: e.target.value })} />
        </Field>
        <Field label="İlk Kalkış Saati" hint="7/24 döngü her gün bu saatten tekrar eder">
          <Input
            type="time"
            value={f.ilk_saat}
            onChange={(e) => setF({ ...f, ilk_saat: e.target.value })}
          />
        </Field>
        <Field label="Sıklık (dakika)">
          <Input
            type="number"
            min={5}
            value={f.siklik}
            onChange={(e) => setF({ ...f, siklik: Number(e.target.value) })}
          />
        </Field>
        <Field label="Süre (dakika)">
          <Input
            type="number"
            value={f.sure}
            onChange={(e) => setF({ ...f, sure: Number(e.target.value) })}
          />
        </Field>
        <Field label="Ücret (₺)">
          <Input
            type="number"
            value={f.ucret}
            onChange={(e) => setF({ ...f, ucret: Number(e.target.value) })}
          />
        </Field>
      </div>
      <div className="flex justify-end gap-2 border-t border-stone-200 px-5 py-4">
        <Button variant="secondary" onClick={onClose}>
          Vazgeç
        </Button>
        <Button
          onClick={() => {
            if (!f.hat.trim() || !f.kalkis.trim() || !f.varis.trim()) return;
            onSave(f);
          }}
        >
          Kaydet
        </Button>
      </div>
    </Modal>
  );
}

function PlakaFormModal({
  form,
  onClose,
  onSave,
}: {
  form: Plaka | null;
  onClose: () => void;
  onSave: (p: Plaka) => void;
}) {
  const [f, setF] = useState<Plaka | null>(form);
  if (!form || !f) return null;
  return (
    <Modal open onClose={onClose}>
      <div className="border-b border-stone-200 px-5 py-4 text-lg font-black text-stone-800">
        Plaka Tanımla
      </div>
      <div className="grid gap-3 p-5">
        <Field label="Plaka" hint="Örn: 34 IST 2001">
          <Input value={f.plaka} onChange={(e) => setF({ ...f, plaka: e.target.value })} />
        </Field>
        <Field label="Model">
          <Input value={f.model} onChange={(e) => setF({ ...f, model: e.target.value })} />
        </Field>
        <Field label="Kapasite (koltuk)">
          <Input
            type="number"
            value={f.kapasite}
            onChange={(e) => setF({ ...f, kapasite: Number(e.target.value) })}
          />
        </Field>
      </div>
      <div className="flex justify-end gap-2 border-t border-stone-200 px-5 py-4">
        <Button variant="secondary" onClick={onClose}>
          Vazgeç
        </Button>
        <Button
          onClick={() => {
            if (!f.plaka.trim()) return;
            onSave(f);
          }}
        >
          Kaydet
        </Button>
      </div>
    </Modal>
  );
}

function IkramFormModal({
  form,
  onClose,
  onSave,
}: {
  form: Ikram | null;
  onClose: () => void;
  onSave: (i: Ikram) => void;
}) {
  const [f, setF] = useState<Ikram | null>(form);
  if (!form || !f) return null;
  return (
    <Modal open onClose={onClose}>
      <div className="border-b border-stone-200 px-5 py-4 text-lg font-black text-stone-800">
        İkram Tanımla
      </div>
      <div className="grid gap-3 p-5">
        <Field label="Ad">
          <Input value={f.ad} onChange={(e) => setF({ ...f, ad: e.target.value })} />
        </Field>
        <Field label="Kategori">
          <Select
            value={f.kategori}
            onChange={(e) => setF({ ...f, kategori: e.target.value })}
          >
            {["Sıcak İçecek", "Soğuk İçecek", "Atıştırmalık", "Yemek", "Diğer"].map((k) => (
              <option key={k}>{k}</option>
            ))}
          </Select>
        </Field>
        <Field label="Fiyat (₺)">
          <Input
            type="number"
            value={f.fiyat}
            onChange={(e) => setF({ ...f, fiyat: Number(e.target.value) })}
          />
        </Field>
      </div>
      <div className="flex justify-end gap-2 border-t border-stone-200 px-5 py-4">
        <Button variant="secondary" onClick={onClose}>
          Vazgeç
        </Button>
        <Button
          onClick={() => {
            if (!f.ad.trim()) return;
            onSave(f);
          }}
        >
          Kaydet
        </Button>
      </div>
    </Modal>
  );
}

function EmanetFormModal({
  form,
  onClose,
  onSave,
}: {
  form: Emanet | null;
  onClose: () => void;
  onSave: (e: Emanet) => void;
}) {
  const [f, setF] = useState<Emanet | null>(form);
  if (!form || !f) return null;
  return (
    <Modal open onClose={onClose}>
      <div className="border-b border-stone-200 px-5 py-4 text-lg font-black text-stone-800">
        Emanet Türü
      </div>
      <div className="grid gap-3 p-5">
        <Field label="Ad" hint="Örn: Standart Bavul">
          <Input value={f.ad} onChange={(e) => setF({ ...f, ad: e.target.value })} />
        </Field>
        <Field label="Fiyat (₺)">
          <Input
            type="number"
            value={f.fiyat}
            onChange={(e) => setF({ ...f, fiyat: Number(e.target.value) })}
          />
        </Field>
      </div>
      <div className="flex justify-end gap-2 border-t border-stone-200 px-5 py-4">
        <Button variant="secondary" onClick={onClose}>
          Vazgeç
        </Button>
        <Button
          onClick={() => {
            if (!f.ad.trim()) return;
            onSave(f);
          }}
        >
          Kaydet
        </Button>
      </div>
    </Modal>
  );
}
