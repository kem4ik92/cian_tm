import Link from "next/link";
import Image from "next/image";
import { SearchBar } from "@/components/SearchBar";
import { ListingCard } from "@/components/ListingCard";
import { CITIES } from "@/lib/cities";
import { LISTINGS } from "@/lib/data";

export default function Home() {
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
            src="https://picsum.photos/seed/ashgabat-hero/1920/900"
            alt=""
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-900/80 via-brand-800/60 to-brand-700/70" />
        </div>

        <div className="max-w-7xl mx-auto px-4 py-16 md:py-24">
          <h1 className="text-white text-3xl md:text-5xl font-bold max-w-3xl">
            Вся недвижимость Туркменистана на одном сайте
          </h1>
          <p className="text-white/90 mt-3 max-w-2xl">
            Продажа и аренда квартир, домов, коммерческой недвижимости и
            участков в Ашхабаде, Туркменабате, Мары, Дашогузе, Балканабате и
            Туркменбаши.
          </p>

          <div className="mt-8 max-w-4xl">
            <SearchBar />
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            <Link
              href="/search?deal=sale&type=apartment&city=ashgabat"
              className="chip bg-white/90 text-brand-800 hover:bg-white"
            >
              Квартиры в Ашхабаде
            </Link>
            <Link
              href="/search?deal=rent&type=apartment"
              className="chip bg-white/90 text-brand-800 hover:bg-white"
            >
              Аренда квартир
            </Link>
            <Link
              href="/search?type=house"
              className="chip bg-white/90 text-brand-800 hover:bg-white"
            >
              Частные дома
            </Link>
            <Link
              href="/search?deal=rent&type=commercial"
              className="chip bg-white/90 text-brand-800 hover:bg-white"
            >
              Офисы и магазины
            </Link>
            <Link
              href="/search?city=turkmenbashi"
              className="chip bg-white/90 text-brand-800 hover:bg-white"
            >
              Туркменбаши и Аваза
            </Link>
          </div>
        </div>
      </section>

      {/* Cities */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex items-end justify-between mb-6">
          <h2 className="text-2xl font-bold">Популярные города</h2>
          <Link
            href="/search"
            className="text-sm text-brand-700 hover:underline"
          >
            Все объявления →
          </Link>
        </div>
        <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {cityCounts.map(({ city, count }) => (
            <Link
              key={city.id}
              href={`/search?city=${city.id}`}
              className="relative aspect-[4/3] rounded-xl overflow-hidden group"
            >
              <Image
                src={`https://picsum.photos/seed/${city.id}-tile/800/600`}
                alt={city.name}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 text-white">
                <div className="text-lg font-semibold">{city.name}</div>
                <div className="text-xs opacity-90">
                  {count} объявлен
                  {count % 10 === 1 && count % 100 !== 11
                    ? "ие"
                    : [2, 3, 4].includes(count % 10) &&
                        ![12, 13, 14].includes(count % 100)
                      ? "ия"
                      : "ий"}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Newest listings */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex items-end justify-between mb-6">
          <h2 className="text-2xl font-bold">Свежие объявления</h2>
          <Link
            href="/search"
            className="text-sm text-brand-700 hover:underline"
          >
            Смотреть все →
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
            <h3 className="font-semibold mb-1">Удобный поиск</h3>
            <p className="text-sm text-slate-600">
              Фильтры по городу, району, цене, площади и количеству комнат.
            </p>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <div className="h-10 w-10 rounded-lg bg-brand-100 text-brand-700 flex items-center justify-center font-bold mb-3">
              ₮
            </div>
            <h3 className="font-semibold mb-1">Цены в манатах</h3>
            <p className="text-sm text-slate-600">
              Все цены указаны в туркменских манатах (TMT) — без конвертаций.
            </p>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <div className="h-10 w-10 rounded-lg bg-brand-100 text-brand-700 flex items-center justify-center font-bold mb-3">
              ＋
            </div>
            <h3 className="font-semibold mb-1">Бесплатная публикация</h3>
            <p className="text-sm text-slate-600">
              Подайте объявление за минуту и получайте заявки от реальных
              покупателей и арендаторов.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
