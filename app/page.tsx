"use client";

import Link from "next/link";
import Image from "next/image";
import { SearchBar } from "@/components/SearchBar";
import { ListingCard } from "@/components/ListingCard";
import { CITIES } from "@/lib/cities";
import { LISTINGS } from "@/lib/data";
import { HERO_IMAGE, CITY_IMAGES } from "@/lib/images";
import { useApp } from "@/components/I18nProvider";
import { pluralListings } from "@/lib/i18n";

export default function Home() {
  const { t, lang } = useApp();

  const newest = [...LISTINGS]
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
    )
    .slice(0, 8);

  const cityCounts = CITIES.map((c) => ({
    city: c,
    count: LISTINGS.filter((l) => l.cityId === c.id).length,
  })).filter((x) => x.count > 0);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <Image
            src={HERO_IMAGE}
            alt=""
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/85 via-slate-900/75 to-brand-900/85" />
        </div>

        <div className="max-w-7xl mx-auto px-4 py-16 md:py-24">
          <h1 className="text-white text-3xl md:text-5xl font-bold max-w-3xl drop-shadow">
            {t("hero.title")}
          </h1>
          <p className="text-white/90 mt-3 max-w-2xl drop-shadow">
            {t("hero.subtitle")}
          </p>

          <div className="mt-8 max-w-4xl">
            <SearchBar />
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            <Link
              href="/search?deal=sale&type=apartment&city=ashgabat"
              className="inline-flex items-center rounded-full bg-white/95 hover:bg-white px-3 py-1 text-xs font-medium text-brand-800"
            >
              {t("hero.chip.apt_ashgabat")}
            </Link>
            <Link
              href="/search?deal=rent&type=apartment"
              className="inline-flex items-center rounded-full bg-white/95 hover:bg-white px-3 py-1 text-xs font-medium text-brand-800"
            >
              {t("hero.chip.rent_apt")}
            </Link>
            <Link
              href="/search?type=house"
              className="inline-flex items-center rounded-full bg-white/95 hover:bg-white px-3 py-1 text-xs font-medium text-brand-800"
            >
              {t("hero.chip.private_houses")}
            </Link>
            <Link
              href="/search?deal=rent&type=commercial"
              className="inline-flex items-center rounded-full bg-white/95 hover:bg-white px-3 py-1 text-xs font-medium text-brand-800"
            >
              {t("hero.chip.offices")}
            </Link>
            <Link
              href="/search?city=turkmenbashi"
              className="inline-flex items-center rounded-full bg-white/95 hover:bg-white px-3 py-1 text-xs font-medium text-brand-800"
            >
              {t("hero.chip.avaza")}
            </Link>
          </div>
        </div>
      </section>

      {/* Cities */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex items-end justify-between mb-6">
          <h2 className="text-2xl font-bold text-slate-900">
            {t("home.popular_cities")}
          </h2>
          <Link
            href="/search"
            className="text-sm text-brand-700 hover:underline"
          >
            {t("home.all_listings")}
          </Link>
        </div>
        <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {cityCounts.map(({ city, count }) => (
            <Link
              key={city.id}
              href={`/search?city=${city.id}`}
              className="relative aspect-[4/3] rounded-xl overflow-hidden group border border-slate-200"
            >
              <Image
                src={CITY_IMAGES[city.id] ?? HERO_IMAGE}
                alt={city.name}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 text-white">
                <div className="text-lg font-semibold">{city.name}</div>
                <div className="text-xs opacity-90">
                  {count} {pluralListings(lang, count)}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Newest listings */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex items-end justify-between mb-6">
          <h2 className="text-2xl font-bold text-slate-900">
            {t("home.newest")}
          </h2>
          <Link
            href="/search"
            className="text-sm text-brand-700 hover:underline"
          >
            {t("home.see_all")}
          </Link>
        </div>
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {newest.map((l) => (
            <ListingCard key={l.id} listing={l} />
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid gap-4 md:grid-cols-3">
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <div className="h-10 w-10 rounded-lg bg-brand-100 text-brand-700 flex items-center justify-center font-bold mb-3">
              ⌕
            </div>
            <h3 className="font-semibold mb-1 text-slate-900">
              {t("home.feature1.title")}
            </h3>
            <p className="text-sm text-slate-600">{t("home.feature1.desc")}</p>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <div className="h-10 w-10 rounded-lg bg-brand-100 text-brand-700 flex items-center justify-center font-bold mb-3">
              ₮
            </div>
            <h3 className="font-semibold mb-1 text-slate-900">
              {t("home.feature2.title")}
            </h3>
            <p className="text-sm text-slate-600">{t("home.feature2.desc")}</p>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <div className="h-10 w-10 rounded-lg bg-brand-100 text-brand-700 flex items-center justify-center font-bold mb-3">
              ＋
            </div>
            <h3 className="font-semibold mb-1 text-slate-900">
              {t("home.feature3.title")}
            </h3>
            <p className="text-sm text-slate-600">{t("home.feature3.desc")}</p>
          </div>
        </div>
      </section>
    </>
  );
}
