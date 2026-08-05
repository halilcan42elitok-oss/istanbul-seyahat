export function tl(n: number): string {
  return (
    n.toLocaleString("tr-TR", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) +
    " ₺"
  );
}

export function pad(n: number, len = 2): string {
  return String(n).padStart(len, "0");
}

export function tarihStr(d: Date = new Date()): string {
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

export function saatStr(d: Date = new Date()): string {
  return `${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

export function saatStrSn(d: Date = new Date()): string {
  return `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
}

export function tarihTr(t: string): string {
  const [y, m, g] = t.split("-");
  return `${g}.${m}.${y}`;
}

export function uid(prefix = "id"): string {
  return `${prefix}_${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`;
}

export function biletNo(son: number): { no: string; yeni: number } {
  const yeni = son + 1;
  const d = new Date();
  const yil = String(d.getFullYear());
  return { no: `IST-${yil}-${pad(yeni, 4)}`, yeni };
}

export function koltukNo(ix: number): string {
  return pad(ix + 1);
}
