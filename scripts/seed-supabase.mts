import { createClient } from "@supabase/supabase-js";
import { buildSeedKayit } from "../src/lib/seed.ts";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!url || !key) {
  console.error(
    "Eksik env: NEXT_PUBLIC_SUPABASE_URL ve NEXT_PUBLIC_SUPABASE_ANON_KEY gerekli."
  );
  process.exit(1);
}

const sb = createClient(url, key, { auth: { persistSession: false } });

async function main(): Promise<void> {
  const seed = buildSeedKayit();

  const tablolar = ["biletler", "seferler", "plakalar", "ikramlar", "emanetler"] as const;
  for (const t of tablolar) {
    const { error } = await sb.from(t).delete().neq("id", "0");
    if (error) throw new Error(`${t} silinemedi: ${error.message}`);
  }

  const ekle = async (t: string, satirlar: unknown[]): Promise<void> => {
    for (let i = 0; i < satirlar.length; i += 100) {
      const { error } = await sb
        .from(t as never)
        .insert(satirlar.slice(i, i + 100));
      if (error) throw new Error(`${t} eklenemedi: ${error.message}`);
    }
  };

  await ekle("plakalar", seed.plakalar);
  await ekle("ikramlar", seed.ikramlar);
  await ekle("emanetler", seed.emanetler);
  await ekle("seferler", seed.seferler);
  await ekle("biletler", seed.biletler);

  const { error: sErr } = await sb
    .from("settings")
    .upsert({ key: "son_bilet_no", value: seed.son_bilet_no });
  if (sErr) throw new Error(`settings eklenemedi: ${sErr.message}`);

  console.log(
    `Seeded ok: ${seed.seferler.length} sefer, ${seed.plakalar.length} plaka, ` +
      `${seed.ikramlar.length} ikram, ${seed.emanetler.length} emanet, ` +
      `${seed.biletler.length} bilet (son_bilet_no=${seed.son_bilet_no})`
  );
}

main()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
