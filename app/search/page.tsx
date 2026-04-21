import { Suspense } from "react";
import { SearchClient } from "./SearchClient";

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-7xl mx-auto px-4 py-10 text-slate-500">…</div>
      }
    >
      <SearchClient />
    </Suspense>
  );
}
