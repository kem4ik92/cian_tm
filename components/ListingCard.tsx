import Image from "next/image";
import Link from "next/link";
import { cityName } from "@/lib/cities";
import {
  formatPriceCompact,
  propertyLabel,
  relativeDate,
  roomsLabel,
} from "@/lib/format";
import type { Listing } from "@/lib/types";

export function ListingCard({ listing }: { listing: Listing }) {
  return (
    <Link
      href={`/offer/${listing.id}`}
      className="group block bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg hover:border-brand-300 transition-all"
    >
      <div className="relative aspect-[4/3] bg-slate-100">
        <Image
          src={listing.images[0]}
          alt={listing.title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-2 left-2 flex gap-2">
          <span
            className={`text-xs font-semibold px-2 py-1 rounded-full text-white ${
              listing.dealType === "sale" ? "bg-brand-600" : "bg-blue-600"
            }`}
          >
            {listing.dealType === "sale" ? "Продажа" : "Аренда"}
          </span>
          <span className="text-xs font-medium px-2 py-1 rounded-full bg-white/90 text-slate-800 backdrop-blur">
            {propertyLabel(listing.propertyType)}
          </span>
        </div>
      </div>

      <div className="p-4">
        <div className="text-lg font-bold text-slate-900">
          {formatPriceCompact(listing.price, listing.dealType)}
        </div>
        <div className="mt-1 text-sm text-slate-700 line-clamp-1">
          {listing.title}
        </div>
        <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-xs text-slate-600">
          {listing.rooms ? <span>{roomsLabel(listing.rooms)}</span> : null}
          <span>{listing.area} м²</span>
          {listing.floor ? (
            <span>
              {listing.floor}
              {listing.totalFloors ? `/${listing.totalFloors}` : ""} эт.
            </span>
          ) : null}
        </div>
        <div className="mt-2 text-sm text-slate-500 truncate">
          {cityName(listing.cityId)}, {listing.district}
        </div>
        <div className="mt-2 text-xs text-slate-400">
          {relativeDate(listing.publishedAt)}
        </div>
      </div>
    </Link>
  );
}
