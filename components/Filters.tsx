"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { CITIES } from "@/lib/cities";

export function Filters() {
  const router = useRouter();
  const sp = useSearchParams();

  const current = useMemo(() => {
    const get = (k: string) => sp.get(k) ?? "";
    return {
      deal: get("deal"),
      type: get("type"),
      city: get("city"),
      district: get("district"),
      minPrice: get("minPrice"),
      maxPrice: get("maxPrice"),
      minRooms: get("minRooms"),
      maxRooms: get("maxRooms"),
      minArea: get("minArea"),
      maxArea: get("maxArea"),
      q: get("q"),
      sort: get("sort") || "newest",
    };
  }, [sp]);

  const city = CITIES.find((c) => c.id === current.city);

  const update = (patch: Record<string, string>) => {
    const params = new URLSearchParams(sp.toString());
    for (const [k, v] of Object.entries(patch)) {
      if (v === "" || v === undefined || v === null) params.delete(k);
      else params.set(k, v);
    }
    router.push(`/search?${params.toString()}`);
  };

  const reset = () => {
    router.push("/search");
  };

  return (
    <aside className="bg-white rounded-xl border border-slate-200 p-4 space-y-5 sticky top-20">
      <div>
        <h3 className="text-sm font-semibold mb-2">Тип сделки</h3>
        <div className="grid grid-cols-3 gap-1">
          {[
            { v: "", label: "Все" },
            { v: "sale", label: "Купить" },
            { v: "rent", label: "Снять" },
          ].map((o) => (
            <button
              key={o.v}
              type="button"
              onClick={() => update({ deal: o.v })}
              className={`px-2 py-1.5 text-xs rounded ${
                current.deal === o.v
                  ? "bg-brand-600 text-white"
                  : "bg-slate-100 hover:bg-slate-200"
              }`}
            >
              {o.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-2">Тип недвижимости</h3>
        <select
          className="input"
          value={current.type}
          onChange={(e) => update({ type: e.target.value })}
        >
          <option value="">Любой</option>
          <option value="apartment">Квартира</option>
          <option value="house">Дом</option>
          <option value="room">Комната</option>
          <option value="commercial">Коммерческая</option>
          <option value="land">Участок</option>
        </select>
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-2">Город</h3>
        <select
          className="input"
          value={current.city}
          onChange={(e) => update({ city: e.target.value, district: "" })}
        >
          <option value="">Все города</option>
          {CITIES.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
        {city ? (
          <select
            className="input mt-2"
            value={current.district}
            onChange={(e) => update({ district: e.target.value })}
          >
            <option value="">Любой район</option>
            {city.districts.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        ) : null}
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-2">Цена, ТМТ</h3>
        <div className="grid grid-cols-2 gap-2">
          <input
            key={`minPrice-${current.minPrice}`}
            className="input"
            placeholder="от"
            inputMode="numeric"
            defaultValue={current.minPrice}
            onBlur={(e) => update({ minPrice: e.target.value })}
          />
          <input
            key={`maxPrice-${current.maxPrice}`}
            className="input"
            placeholder="до"
            inputMode="numeric"
            defaultValue={current.maxPrice}
            onBlur={(e) => update({ maxPrice: e.target.value })}
          />
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-2">Комнат</h3>
        <div className="flex flex-wrap gap-1">
          {["", "1", "2", "3", "4", "5"].map((v) => (
            <button
              key={v || "any"}
              type="button"
              onClick={() =>
                update({ minRooms: v, maxRooms: v === "5" ? "" : v })
              }
              className={`px-3 py-1.5 text-xs rounded border ${
                current.minRooms === v
                  ? "bg-brand-600 text-white border-brand-600"
                  : "bg-white border-slate-300 hover:bg-slate-50"
              }`}
            >
              {v === "" ? "Любое" : v === "5" ? "5+" : v}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-2">Площадь, м²</h3>
        <div className="grid grid-cols-2 gap-2">
          <input
            key={`minArea-${current.minArea}`}
            className="input"
            placeholder="от"
            inputMode="numeric"
            defaultValue={current.minArea}
            onBlur={(e) => update({ minArea: e.target.value })}
          />
          <input
            key={`maxArea-${current.maxArea}`}
            className="input"
            placeholder="до"
            inputMode="numeric"
            defaultValue={current.maxArea}
            onBlur={(e) => update({ maxArea: e.target.value })}
          />
        </div>
      </div>

      <button
        type="button"
        onClick={reset}
        className="w-full btn-outline text-sm"
      >
        Сбросить фильтры
      </button>
    </aside>
  );
}
