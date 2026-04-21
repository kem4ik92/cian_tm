import Link from "next/link";

export function Header() {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center gap-6">
        <Link href="/" className="flex items-center gap-2">
          <span className="inline-flex items-center justify-center h-9 w-9 rounded-lg bg-brand-600 text-white font-bold">
            J
          </span>
          <span className="text-xl font-bold tracking-tight">
            Jay<span className="text-brand-600">.tm</span>
          </span>
          <span className="hidden sm:inline text-xs text-slate-500 ml-1">
            Недвижимость Туркменистана
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1 text-sm text-slate-700">
          <Link
            href="/search?deal=sale&type=apartment"
            className="px-3 py-2 rounded hover:bg-slate-100"
          >
            Купить
          </Link>
          <Link
            href="/search?deal=rent&type=apartment"
            className="px-3 py-2 rounded hover:bg-slate-100"
          >
            Снять
          </Link>
          <Link
            href="/search?type=commercial"
            className="px-3 py-2 rounded hover:bg-slate-100"
          >
            Коммерческая
          </Link>
          <Link
            href="/search?type=house"
            className="px-3 py-2 rounded hover:bg-slate-100"
          >
            Дома
          </Link>
          <Link
            href="/search?type=land"
            className="px-3 py-2 rounded hover:bg-slate-100"
          >
            Участки
          </Link>
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <Link href="/new" className="btn-primary text-sm hidden sm:inline-flex">
            Подать объявление
          </Link>
          <Link href="/new" className="btn-primary text-sm sm:hidden">
            +
          </Link>
        </div>
      </div>
    </header>
  );
}
