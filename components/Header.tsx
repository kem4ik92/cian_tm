"use client";

import Link from "next/link";
import { useApp } from "./I18nProvider";
import { LangSwitcher } from "./LangSwitcher";
import { AuthButton } from "./AuthButton";

export function Header() {
  const { t } = useApp();
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center gap-4">
        <Link href="/" className="flex items-center gap-2 flex-shrink-0">
          <span className="inline-flex items-center justify-center h-9 w-9 rounded-lg bg-brand-600 text-white font-bold">
            J
          </span>
          <span className="text-xl font-bold tracking-tight">
            Jay<span className="text-brand-600">.tm</span>
          </span>
          <span className="hidden lg:inline text-xs text-slate-500 ml-1 whitespace-nowrap">
            {t("brand.tagline")}
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-0.5 text-sm text-slate-700">
          <Link
            href="/search?deal=sale&type=apartment"
            className="px-2.5 py-2 rounded hover:bg-slate-100"
          >
            {t("nav.buy")}
          </Link>
          <Link
            href="/search?deal=rent&type=apartment"
            className="px-2.5 py-2 rounded hover:bg-slate-100"
          >
            {t("nav.rent")}
          </Link>
          <Link
            href="/search?type=commercial"
            className="px-2.5 py-2 rounded hover:bg-slate-100"
          >
            {t("nav.commercial")}
          </Link>
          <Link
            href="/search?type=house"
            className="px-2.5 py-2 rounded hover:bg-slate-100"
          >
            {t("nav.houses")}
          </Link>
          <Link
            href="/search?type=land"
            className="px-2.5 py-2 rounded hover:bg-slate-100"
          >
            {t("nav.land")}
          </Link>
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <LangSwitcher />
          <AuthButton />
          <Link
            href="/new"
            className="btn-primary text-sm hidden md:inline-flex"
          >
            {t("nav.post")}
          </Link>
          <Link
            href="/new"
            className="btn-primary text-sm md:hidden"
            aria-label={t("nav.post")}
          >
            +
          </Link>
        </div>
      </div>
    </header>
  );
}
