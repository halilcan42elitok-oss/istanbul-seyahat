export type TelemetryData = {
  game?: {
    connected?: boolean;
    paused?: boolean;
    timeScale?: number;
    version?: string;
    telemetryPluginVersion?: string;
  };
  truck?: {
    id?: string;
    make?: string;
    model?: string;
    speed?: number;
    cruiseControlOn?: boolean;
    cruiseControlSpeed?: number;
    gear?: number;
    speedLimit?: number;
    fuel?: number;
    fuelRange?: number;
    fuelAvgConsumption?: number;
    fuelWarning?: boolean;
    odometer?: number;
    brake?: number;
    retarder?: number;
  };
  navigation?: {
    distance?: number;
    estimatedTime?: number;
    speedLimit?: number;
    sourceCity?: string;
    sourceCompany?: string;
    destinationCity?: string;
    destinationCompany?: string;
  };
  job?: {
    income?: number;
    cargo?: string;
    sourceCity?: string;
    destinationCity?: string;
  };
  position?: { x?: number; y?: number; z?: number };
};

function urller(): string[] {
  if (typeof window === "undefined") return [];
  const env = process.env.NEXT_PUBLIC_TELEMETRY_URL?.trim();
  const adaylar = [
    env || "",
    "http://localhost:25555/api/ets2/telemetry",
    "http://localhost:8765/api/ets2/telemetry",
  ].filter(Boolean);
  return [...new Set(adaylar)];
}

export async function fetchTelemetry(
  signal?: AbortSignal
): Promise<TelemetryData | null> {
  for (const url of urller()) {
    try {
      const parca = url.includes("?") ? "&" : "?";
      const res = await fetch(`${url}${parca}_=${Date.now()}`, {
        signal,
        headers: { Accept: "application/json" },
        cache: "no-store",
      });
      if (!res.ok) continue;
      const data = (await res.json()) as TelemetryData;
      if (data && typeof data === "object") return data;
    } catch {
      // Sıradaki kaynağı dene
    }
  }
  return null;
}

export function hizKmh(speed: number | undefined): number | null {
  if (typeof speed !== "number" || !Number.isFinite(speed)) return null;
  return Math.max(0, Math.round(speed * 3.6));
}

export function gearMetin(gear: number | undefined): string {
  if (typeof gear !== "number") return "—";
  if (gear === 0) return "N";
  if (gear < 0) return "R";
  return `D${gear}`;
}

export function sureMetin(saniye: number | undefined): string {
  if (typeof saniye !== "number" || !Number.isFinite(saniye)) return "—";
  const toplam = Math.max(0, Math.round(saniye));
  const sa = Math.floor(toplam / 3600);
  const dk = Math.floor((toplam % 3600) / 60);
  if (sa > 0) return `${sa} sa ${dk} dk`;
  return `${dk} dk`;
}
