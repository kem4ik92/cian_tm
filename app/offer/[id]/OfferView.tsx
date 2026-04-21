"use client";

import Link from "next/link";
import { Gallery } from "@/components/Gallery";
import { ContactReveal } from "@/components/ContactReveal";
import { ListingCard } from "@/components/ListingCard";
import { cityById, cityName } from "@/lib/cities";
import { formatPrice } from "@/lib/format";
import type { Listing } from "@/lib/types";
import { useApp } from "@/components/I18nProvider";
import { formatDateI18n } from "@/lib/dateI18n";

export function OfferView({
  listing,
  similar,
}: {
  listing: Listing;
  similar: Listing[];
}) {
  const { t, lang } = useApp();

  const city = cityById(listing.cityId);
  const lat = listing.lat ?? city?.lat ?? 37.95;
  const lng = listing.lng ?? city?.lng ?? 58.3;

  const authorRole =
    listing.author.role === "owner"
      ? t("offer.owner")
      : listing.author.role === "agent"
        ? t("offer.agent")
        : t("offer.agency");

  const price = formatPrice(listing.price);
  const priceLabel =
    listing.dealType === "rent" ? `${price} ${t("listing.per_month")}` : price;

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <nav className="text-sm text-slate-500 mb-3">
        <Link href="/" className="hover:text-brand-700">
          {t("offer.home")}
        </Link>
        <span className="mx-2">/</span>
        <Link
          href={`/search?deal=${listing.dealType}&type=${listing.propertyType}`}
          className="hover:text-brand-700"
        >
          {listing.dealType === "sale" ? t("deal.sale") : t("deal.rent")} —{" "}
          {t(`prop.${listing.propertyType}` as const)}
        </Link>
        <span className="mx-2">/</span>
        <Link
          href={`/search?city=${listing.cityId}`}
          className="hover:text-brand-700"
        >
          {cityName(listing.cityId)}
        </Link>
      </nav>

      <h1 className="text-2xl md:text-3xl font-bold mb-1 text-slate-900">
        {listing.title}
      </h1>
      <div className="text-slate-600 mb-6">
        {cityName(listing.cityId)}, {listing.district} · {listing.address}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <div>
          <Gallery images={listing.images} title={listing.title} />

          <section className="mt-8 bg-white rounded-xl border border-slate-200 p-6">
            <h2 className="text-lg font-semibold mb-4 text-slate-900">
              {t("offer.characteristics")}
            </h2>
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-8 text-sm">
              <Row
                label={t("offer.deal_type")}
                value={
                  listing.dealType === "sale"
                    ? t("deal.sale")
                    : t("deal.rent")
                }
              />
              <Row
                label={t("offer.prop_type")}
                value={t(`prop.${listing.propertyType}` as const)}
              />
              {listing.rooms ? (
                <Row
                  label={t("offer.rooms")}
                  value={`${listing.rooms}${t("listing.rooms_suffix")}`}
                />
              ) : null}
              <Row label={t("offer.area")} value={`${listing.area} м²`} />
              {listing.floor ? (
                <Row
                  label={t("offer.floor")}
                  value={`${listing.floor}${
                    listing.totalFloors
                      ? ` ${t("offer.of")} ${listing.totalFloors}`
                      : ""
                  }`}
                />
              ) : null}
              <Row label={t("offer.city")} value={cityName(listing.cityId)} />
              <Row label={t("offer.district")} value={listing.district} />
              <Row
                label={t("offer.published")}
                value={formatDateI18n(listing.publishedAt, lang)}
              />
            </dl>
          </section>

          <section className="mt-6 bg-white rounded-xl border border-slate-200 p-6">
            <h2 className="text-lg font-semibold mb-3 text-slate-900">
              {t("offer.description")}
            </h2>
            <p className="whitespace-pre-line text-slate-700 leading-relaxed">
              {listing.description}
            </p>
          </section>

          {listing.amenities.length > 0 ? (
            <section className="mt-6 bg-white rounded-xl border border-slate-200 p-6">
              <h2 className="text-lg font-semibold mb-3 text-slate-900">
                {t("offer.amenities")}
              </h2>
              <div className="flex flex-wrap gap-2">
                {listing.amenities.map((a) => (
                  <span key={a} className="chip">
                    {a}
                  </span>
                ))}
              </div>
            </section>
          ) : null}

          <section className="mt-6 bg-white rounded-xl border border-slate-200 p-6">
            <h2 className="text-lg font-semibold mb-3 text-slate-900">
              {t("offer.location")}
            </h2>
            <div className="aspect-[16/9] w-full rounded-lg overflow-hidden bg-slate-100 border border-slate-200 relative">
              <iframe
                title="map"
                className="absolute inset-0 w-full h-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                src={`https://www.openstreetmap.org/export/embed.html?bbox=${lng - 0.02}%2C${lat - 0.02}%2C${lng + 0.02}%2C${lat + 0.02}&layer=mapnik&marker=${lat}%2C${lng}`}
              />
            </div>
            <div className="text-xs text-slate-500 mt-2">
              {t("offer.map_note")}
            </div>
          </section>
        </div>

        <aside className="lg:sticky lg:top-20 h-fit space-y-4">
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <div className="text-3xl font-bold text-slate-900">
              {priceLabel}
            </div>
            {listing.area ? (
              <div className="text-sm text-slate-600 mt-1">
                {Math.round(listing.price / listing.area).toLocaleString(
                  "ru-RU",
                )}{" "}
                ТМТ / м²
              </div>
            ) : null}
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <div className="text-xs uppercase tracking-wide text-slate-500">
              {authorRole}
            </div>
            <div className="text-lg font-semibold text-slate-900">
              {listing.author.name}
            </div>
            <div className="mt-4">
              <ContactReveal phone={listing.author.phone} />
            </div>
          </div>
        </aside>
      </div>

      {similar.length > 0 ? (
        <section className="mt-12">
          <h2 className="text-xl font-bold mb-4 text-slate-900">
            {t("offer.similar")}
          </h2>
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {similar.map((l) => (
              <ListingCard key={l.id} listing={l} />
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-dashed border-slate-200 pb-2">
      <dt className="text-slate-500">{label}</dt>
      <dd className="text-slate-900 font-medium text-right">{value}</dd>
    </div>
  );
}
