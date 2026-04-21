import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 mt-16">
      <div className="max-w-7xl mx-auto px-4 py-10 grid gap-8 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="inline-flex items-center justify-center h-8 w-8 rounded-lg bg-brand-600 text-white font-bold">
              J
            </span>
            <span className="text-lg font-bold text-white">
              Jay<span className="text-brand-400">.tm</span>
            </span>
          </div>
          <p className="text-sm">
            Сервис объявлений о недвижимости в Туркменистане: продажа, аренда,
            коммерческая недвижимость в Ашхабаде, Туркменабате, Мары, Дашогузе,
            Балканабате и Туркменбаши.
          </p>
        </div>
        <div>
          <h3 className="text-white font-semibold mb-3">Купить</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/search?deal=sale&type=apartment">Квартиры</Link>
            </li>
            <li>
              <Link href="/search?deal=sale&type=house">Дома</Link>
            </li>
            <li>
              <Link href="/search?deal=sale&type=land">Участки</Link>
            </li>
            <li>
              <Link href="/search?deal=sale&type=commercial">
                Коммерческая
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-white font-semibold mb-3">Снять</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/search?deal=rent&type=apartment">Квартиры</Link>
            </li>
            <li>
              <Link href="/search?deal=rent&type=house">Дома</Link>
            </li>
            <li>
              <Link href="/search?deal=rent&type=room">Комнаты</Link>
            </li>
            <li>
              <Link href="/search?deal=rent&type=commercial">Офисы</Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-white font-semibold mb-3">Сервис</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/new">Подать объявление</Link>
            </li>
            <li>
              <Link href="/about">О проекте</Link>
            </li>
            <li>
              <a href="mailto:info@jay.tm">info@jay.tm</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-slate-800 text-xs text-slate-500 py-4 text-center">
        © {new Date().getFullYear()} Jay.tm — прототип. Все права не защищены.
      </div>
    </footer>
  );
}
