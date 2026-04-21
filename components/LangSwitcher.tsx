"use client";

import { useState, useRef, useEffect } from "react";
import { useApp } from "./I18nProvider";
import { LANGS } from "@/lib/i18n";

export function LangSwitcher() {
  const { lang, setLang } = useApp();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  const current = LANGS.find((l) => l.code === lang) ?? LANGS[0];

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-1 px-2 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-sm font-medium"
        aria-label={`Language: ${current.label}`}
        title={current.label}
      >
        <span aria-hidden>{current.flag}</span>
        <span className="hidden sm:inline">{current.label}</span>
        <span className="text-slate-400 dark:text-slate-500 text-xs">▾</span>
      </button>
      {open ? (
        <div className="absolute right-0 mt-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg shadow-lg z-40 py-1 min-w-[8rem]">
          {LANGS.map((l) => (
            <button
              key={l.code}
              type="button"
              onClick={() => {
                setLang(l.code);
                setOpen(false);
              }}
              className={`w-full text-left px-3 py-1.5 text-sm flex items-center gap-2 hover:bg-slate-100 ${
                l.code === lang ? "font-semibold text-brand-700" : "text-slate-800"
              }`}
            >
              <span aria-hidden>{l.flag}</span>
              <span>{l.label}</span>
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
