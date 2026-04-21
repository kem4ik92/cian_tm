"use client";

import { useRouter, useSearchParams } from "next/navigation";

const OPTIONS: { v: string; label: string }[] = [
  { v: "newest", label: "Сначала новые" },
  { v: "price_asc", label: "Цена ↑" },
  { v: "price_desc", label: "Цена ↓" },
  { v: "area_desc", label: "Площадь ↓" },
];

export function SortSelect({ current }: { current: string }) {
  const router = useRouter();
  const sp = useSearchParams();

  const onChange = (v: string) => {
    const params = new URLSearchParams(sp.toString());
    if (v) params.set("sort", v);
    else params.delete("sort");
    router.push(`/search?${params.toString()}`);
  };

  return (
    <label className="text-sm text-slate-600 flex items-center gap-2">
      Сортировка:
      <select
        className="input py-1.5 w-auto"
        value={current}
        onChange={(e) => onChange(e.target.value)}
      >
        {OPTIONS.map((o) => (
          <option key={o.v} value={o.v}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}
