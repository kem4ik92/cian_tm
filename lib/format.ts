export function formatPrice(price: number, currency: "TMT" = "TMT"): string {
  const formatted = new Intl.NumberFormat("ru-RU").format(price);
  return `${formatted} ${currency === "TMT" ? "ТМТ" : currency}`;
}

export function formatPriceCompact(
  price: number,
  dealType: "sale" | "rent",
): string {
  const base = formatPrice(price);
  return dealType === "rent" ? `${base} / мес.` : base;
}

const DEAL_LABEL: Record<"sale" | "rent", string> = {
  sale: "Продажа",
  rent: "Аренда",
};

const PROP_LABEL: Record<string, string> = {
  apartment: "Квартира",
  house: "Дом",
  room: "Комната",
  commercial: "Коммерческая",
  land: "Участок",
};

const PROP_LABEL_PLURAL: Record<string, string> = {
  apartment: "Квартиры",
  house: "Дома",
  room: "Комнаты",
  commercial: "Коммерческая недвижимость",
  land: "Участки",
};

export function dealLabel(d: "sale" | "rent"): string {
  return DEAL_LABEL[d];
}

export function propertyLabel(p: string): string {
  return PROP_LABEL[p] ?? p;
}

export function propertyLabelPlural(p: string): string {
  return PROP_LABEL_PLURAL[p] ?? p;
}

export function roomsLabel(rooms?: number): string {
  if (!rooms) return "";
  if (rooms >= 5) return `${rooms}+ комн.`;
  return `${rooms}-комн.`;
}

export function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function relativeDate(iso: string, now: Date = new Date()): string {
  const d = new Date(iso);
  const diffMs = now.getTime() - d.getTime();
  const hours = Math.floor(diffMs / (1000 * 60 * 60));
  if (hours < 1) return "только что";
  if (hours < 24) return `${hours} ч. назад`;
  const days = Math.floor(hours / 24);
  if (days === 1) return "вчера";
  if (days < 7) return `${days} дн. назад`;
  return formatDate(iso);
}
