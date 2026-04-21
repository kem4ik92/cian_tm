"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { Filters } from "@/components/Filters";
import { ListingCard } from "@/components/ListingCard";
import { cityName } from "@/lib/cities";
import { parseSearchParams, searchListings } from "@/lib/search";
import { propertyLabelPlural, dealLabel } from "@/lib/format";
import { SortSelect } from "./SortSelect";

export function SearchClient() {
  const sp = useSearchParams();

  const { params, results, title } = useMemo(() => {
    const record: Record<string, string> = {};
    sp.forEach((value, key) => {
      record[key] = value;
    });
    const params = parseSearchParams(record);
    const results = searchListings(params);
    const title = [
      params.deal ? dealLabel(params.deal) : "Недвижимость",
      params.type ? propertyLabelPlural(params.type).toLowerCase() : null,
      params.cityId ? `в ${cityName(params.cityId)}` : "в Туркменистане",
    ]
      .filter(Boolean)
      .join(" ");
    return { params, results, title };
  }, [sp]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <nav className="text-sm text-slate-500 mb-3">
        <Link href="/" className="hover:text-brand-700">
          Главная
        </Link>
        <span className="mx-2">/</span>
        <span>Поиск</span>
      </nav>

      <div className="flex items-end justify-between flex-wrap gap-2 mb-4">
        <h1 className="text-2xl md:text-3xl font-bold">{title}</h1>
        <div className="text-sm text-slate-600">
          Найдено: <span className="font-semibold">{results.length}</span>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
        <Filters />

        <div>
          <div className="mb-4 flex items-center justify-between">
            <SortSelect current={params.sort ?? "newest"} />
          </div>

          {results.length === 0 ? (
            <div className="bg-white border border-dashed border-slate-300 rounded-xl p-10 text-center">
              <div className="text-4xl mb-3">🔎</div>
              <p className="text-slate-700 mb-4">
                По выбранным фильтрам ничего не найдено.
              </p>
              <Link href="/search" className="btn-outline">
                Сбросить фильтры
              </Link>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {results.map((l) => (
                <ListingCard key={l.id} listing={l} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
