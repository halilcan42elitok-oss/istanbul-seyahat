"use client";

import type { ReactNode } from "react";
import { FIRMA } from "@/lib/config";
import { Clock } from "./LiveBoard";
import { Button } from "./ui";

export function AppShell({
  children,
  actions,
}: {
  children: ReactNode;
  actions?: ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="brand-gradient sticky top-0 z-40 text-white shadow-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/15 text-lg font-black ring-1 ring-white/30">
              İS
            </div>
            <div>
              <div className="text-lg font-black leading-tight tracking-wide">
                {FIRMA.ad}
              </div>
              <div className="text-[11px] text-red-100">{FIRMA.slogan}</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden sm:block">
              <Clock />
            </div>
            {actions}
          </div>
        </div>
      </header>
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-6">{children}</main>
      <footer className="border-t border-stone-200 bg-white">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-1 px-4 py-4 text-center text-xs text-stone-400">
          <div className="font-bold text-stone-500">{FIRMA.ad}</div>
          <div>
            {FIRMA.adres} · {FIRMA.telefon} · {FIRMA.web}
          </div>
          <div>{FIRMA.ets2}</div>
        </div>
      </footer>
    </div>
  );
}

export function CikisButton({ onCikis }: { onCikis: () => void }) {
  return (
    <Button variant="secondary" onClick={onCikis} className="border-white/30 bg-white/10 text-white hover:bg-white/20">
      Çıkış
    </Button>
  );
}
