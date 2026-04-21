import Link from "next/link";

export default function OfferNotFound() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-16 text-center">
      <div className="text-5xl mb-4">🏚️</div>
      <h1 className="text-2xl font-bold mb-2">Объявление не найдено</h1>
      <p className="text-slate-600 mb-6">
        Возможно, оно уже снято с публикации или ссылка содержит ошибку.
      </p>
      <Link href="/search" className="btn-primary">
        К списку объявлений
      </Link>
    </div>
  );
}
