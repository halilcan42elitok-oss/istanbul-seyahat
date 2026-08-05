import { getSupabase, isSupabaseConfigured } from "./supabase";
import { loadKayit, saveKayit, seedKayit } from "./localdb";
import type { Bilet, Emanet, Ikram, Kayit, Plaka, Sefer } from "./types";
import { biletNo } from "./format";

function local() {
  return loadKayit();
}

function persist(k: Kayit) {
  saveKayit(k);
}

export async function getBackendName(): Promise<string> {
  return isSupabaseConfigured() ? "supabase" : "local";
}

export async function isDemoMode(): Promise<boolean> {
  return !isSupabaseConfigured();
}

export async function listSeferler(): Promise<Sefer[]> {
  if (isSupabaseConfigured()) {
    const { data, error } = await getSupabase()!
      .from("seferler")
      .select("*")
      .order("ilk_saat");
    if (error) throw new Error(error.message);
    return (data ?? []) as unknown as Sefer[];
  }
  return local().seferler;
}

async function varmi(tablo: string, id: string): Promise<boolean> {
  const { data } = await getSupabase()!
    .from(tablo)
    .select("id")
    .eq("id", id)
    .maybeSingle();
  return Boolean(data);
}

export async function saveSefer(s: Sefer): Promise<void> {
  if (isSupabaseConfigured()) {
    const varMi = await varmi("seferler", s.id);
    const { error } = varMi
      ? await getSupabase()!.from("seferler").update(s).eq("id", s.id)
      : await getSupabase()!.from("seferler").insert(s);
    if (error) throw new Error(error.message);
    return;
  }
  const k = local();
  const i = k.seferler.findIndex((x) => x.id === s.id);
  if (i >= 0) k.seferler[i] = s;
  else k.seferler.push(s);
  persist(k);
}

export async function deleteSefer(id: string): Promise<void> {
  if (isSupabaseConfigured()) {
    const { error } = await getSupabase()!.from("seferler").delete().eq("id", id);
    if (error) throw new Error(error.message);
    return;
  }
  const k = local();
  k.seferler = k.seferler.filter((x) => x.id !== id);
  persist(k);
}

export async function listPlakalar(): Promise<Plaka[]> {
  if (isSupabaseConfigured()) {
    const { data, error } = await getSupabase()!
      .from("plakalar")
      .select("*")
      .order("plaka");
    if (error) throw new Error(error.message);
    return (data ?? []) as unknown as Plaka[];
  }
  return local().plakalar;
}

export async function savePlaka(p: Plaka): Promise<void> {
  if (isSupabaseConfigured()) {
    const varMi = await varmi("plakalar", p.id);
    const { error } = varMi
      ? await getSupabase()!.from("plakalar").update(p).eq("id", p.id)
      : await getSupabase()!.from("plakalar").insert(p);
    if (error) throw new Error(error.message);
    return;
  }
  const k = local();
  const i = k.plakalar.findIndex((x) => x.id === p.id);
  if (i >= 0) k.plakalar[i] = p;
  else k.plakalar.push(p);
  persist(k);
}

export async function deletePlaka(id: string): Promise<void> {
  if (isSupabaseConfigured()) {
    const { error } = await getSupabase()!.from("plakalar").delete().eq("id", id);
    if (error) throw new Error(error.message);
    return;
  }
  const k = local();
  k.plakalar = k.plakalar.filter((x) => x.id !== id);
  persist(k);
}

export async function listIkramlar(): Promise<Ikram[]> {
  if (isSupabaseConfigured()) {
    const { data, error } = await getSupabase()!
      .from("ikramlar")
      .select("*")
      .order("kategori");
    if (error) throw new Error(error.message);
    return (data ?? []) as unknown as Ikram[];
  }
  return local().ikramlar;
}

export async function saveIkram(i: Ikram): Promise<void> {
  if (isSupabaseConfigured()) {
    const varMi = await varmi("ikramlar", i.id);
    const { error } = varMi
      ? await getSupabase()!.from("ikramlar").update(i).eq("id", i.id)
      : await getSupabase()!.from("ikramlar").insert(i);
    if (error) throw new Error(error.message);
    return;
  }
  const k = local();
  const ix = k.ikramlar.findIndex((x) => x.id === i.id);
  if (ix >= 0) k.ikramlar[ix] = i;
  else k.ikramlar.push(i);
  persist(k);
}

export async function deleteIkram(id: string): Promise<void> {
  if (isSupabaseConfigured()) {
    const { error } = await getSupabase()!.from("ikramlar").delete().eq("id", id);
    if (error) throw new Error(error.message);
    return;
  }
  const k = local();
  k.ikramlar = k.ikramlar.filter((x) => x.id !== id);
  persist(k);
}

export async function listEmanetler(): Promise<Emanet[]> {
  if (isSupabaseConfigured()) {
    const { data, error } = await getSupabase()!
      .from("emanetler")
      .select("*")
      .order("fiyat");
    if (error) throw new Error(error.message);
    return (data ?? []) as unknown as Emanet[];
  }
  return local().emanetler;
}

export async function saveEmanet(e: Emanet): Promise<void> {
  if (isSupabaseConfigured()) {
    const varMi = await varmi("emanetler", e.id);
    const { error } = varMi
      ? await getSupabase()!.from("emanetler").update(e).eq("id", e.id)
      : await getSupabase()!.from("emanetler").insert(e);
    if (error) throw new Error(error.message);
    return;
  }
  const k = local();
  const ix = k.emanetler.findIndex((x) => x.id === e.id);
  if (ix >= 0) k.emanetler[ix] = e;
  else k.emanetler.push(e);
  persist(k);
}

export async function deleteEmanet(id: string): Promise<void> {
  if (isSupabaseConfigured()) {
    const { error } = await getSupabase()!.from("emanetler").delete().eq("id", id);
    if (error) throw new Error(error.message);
    return;
  }
  const k = local();
  k.emanetler = k.emanetler.filter((x) => x.id !== id);
  persist(k);
}

async function supabaseSonNo(): Promise<number> {
  const sb = getSupabase()!;
  const { data } = await sb.from("settings").select("value").eq("key", "son_bilet_no").maybeSingle();
  if (data && typeof (data as { value: number }).value === "number") {
    return (data as { value: number }).value;
  }
  return 0;
}

export async function nextBiletNo(): Promise<{ no: string; yeni: number }> {
  if (isSupabaseConfigured()) {
    const sb = getSupabase()!;
    const son = await supabaseSonNo();
    const r = biletNo(son);
    const { error } = await sb
      .from("settings")
      .upsert({ key: "son_bilet_no", value: r.yeni });
    if (error) throw new Error(error.message);
    return r;
  }
  const k = local();
  const r = biletNo(k.son_bilet_no);
  k.son_bilet_no = r.yeni;
  persist(k);
  return r;
}

export async function addBilet(b: Bilet): Promise<void> {
  if (isSupabaseConfigured()) {
    const { error } = await getSupabase()!.from("biletler").insert(b);
    if (error) throw new Error(error.message);
    return;
  }
  const k = local();
  k.biletler.unshift(b);
  persist(k);
}

export async function listBiletler(): Promise<Bilet[]> {
  if (isSupabaseConfigured()) {
    const { data, error } = await getSupabase()!
      .from("biletler")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw new Error(error.message);
    return (data ?? []) as unknown as Bilet[];
  }
  return local().biletler;
}

export async function updateBiletDurum(id: string, durum: Bilet["durum"]): Promise<void> {
  if (isSupabaseConfigured()) {
    const { error } = await getSupabase()!.from("biletler").update({ durum }).eq("id", id);
    if (error) throw new Error(error.message);
    return;
  }
  const k = local();
  const b = k.biletler.find((x) => x.id === id);
  if (b) {
    b.durum = durum;
    persist(k);
  }
}

export async function deleteBilet(id: string): Promise<void> {
  if (isSupabaseConfigured()) {
    const { error } = await getSupabase()!.from("biletler").delete().eq("id", id);
    if (error) throw new Error(error.message);
    return;
  }
  const k = local();
  k.biletler = k.biletler.filter((x) => x.id !== id);
  persist(k);
}

export async function resetDemo(): Promise<void> {
  if (isSupabaseConfigured()) {
    const sb = getSupabase()!;
    await Promise.all([
      sb.from("biletler").delete().neq("id", "0"),
      sb.from("seferler").delete().neq("id", "0"),
      sb.from("plakalar").delete().neq("id", "0"),
      sb.from("ikramlar").delete().neq("id", "0"),
      sb.from("emanetler").delete().neq("id", "0"),
    ]);
    return;
  }
  persist(seedKayit());
}
