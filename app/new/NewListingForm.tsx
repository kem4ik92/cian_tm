"use client";

import { useMemo, useState } from "react";
import { CITIES } from "@/lib/cities";

export function NewListingForm() {
  const [cityId, setCityId] = useState<string>("ashgabat");
  const [dealType, setDealType] = useState<string>("sale");
  const [propertyType, setPropertyType] = useState<string>("apartment");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const city = useMemo(() => CITIES.find((c) => c.id === cityId), [cityId]);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    const fd = new FormData(e.currentTarget);
    const title = String(fd.get("title") ?? "").trim();
    const price = Number(fd.get("price"));
    const area = Number(fd.get("area"));
    const phone = String(fd.get("phone") ?? "").trim();
    if (!title || !price || !area || !phone) {
      setError("Пожалуйста, заполните обязательные поля: название, цена, площадь и телефон.");
      return;
    }
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="bg-white border border-slate-200 rounded-xl p-8 text-center">
        <div className="text-4xl mb-3">✨</div>
        <h2 className="text-xl font-semibold mb-2">Объявление отправлено!</h2>
        <p className="text-slate-600">
          В реальном продукте оно бы отправилось на модерацию. Это прототип, поэтому мы
          просто показываем подтверждение.
        </p>
        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="btn-outline mt-4"
        >
          Подать ещё одно
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5 bg-white border border-slate-200 rounded-xl p-6">
      {error ? (
        <div className="bg-red-50 border border-red-200 text-red-800 text-sm rounded-lg p-3">
          {error}
        </div>
      ) : null}

      <div>
        <label className="block text-sm font-medium mb-1">Тип сделки</label>
        <div className="flex gap-2">
          {[
            { v: "sale", label: "Продажа" },
            { v: "rent", label: "Аренда" },
          ].map((o) => (
            <button
              key={o.v}
              type="button"
              onClick={() => setDealType(o.v)}
              className={`px-4 py-2 rounded-lg text-sm ${
                dealType === o.v
                  ? "bg-brand-600 text-white"
                  : "bg-slate-100 hover:bg-slate-200"
              }`}
            >
              {o.label}
            </button>
          ))}
        </div>
        <input type="hidden" name="dealType" value={dealType} />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Тип недвижимости</label>
        <select
          name="propertyType"
          className="input"
          value={propertyType}
          onChange={(e) => setPropertyType(e.target.value)}
        >
          <option value="apartment">Квартира</option>
          <option value="house">Дом</option>
          <option value="room">Комната</option>
          <option value="commercial">Коммерческая</option>
          <option value="land">Участок</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">
          Заголовок <span className="text-red-600">*</span>
        </label>
        <input
          name="title"
          className="input"
          placeholder="Например: 2-комн квартира в Беркарарлыке"
          required
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Город</label>
          <select
            name="cityId"
            className="input"
            value={cityId}
            onChange={(e) => setCityId(e.target.value)}
          >
            {CITIES.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Район</label>
          <select name="district" className="input" defaultValue="">
            <option value="">— не выбран —</option>
            {city?.districts.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Адрес</label>
        <input name="address" className="input" placeholder="Улица, дом" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">
            Цена, ТМТ <span className="text-red-600">*</span>
          </label>
          <input
            name="price"
            type="number"
            min={0}
            className="input"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">
            Площадь, м² <span className="text-red-600">*</span>
          </label>
          <input
            name="area"
            type="number"
            min={0}
            className="input"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Комнат</label>
          <input name="rooms" type="number" min={0} className="input" />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Описание</label>
        <textarea
          name="description"
          rows={5}
          className="input"
          placeholder="Опишите состояние, ремонт, инфраструктуру рядом..."
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Ваше имя</label>
          <input name="authorName" className="input" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">
            Телефон <span className="text-red-600">*</span>
          </label>
          <input
            name="phone"
            className="input"
            placeholder="+99365 12 34 56"
            required
          />
        </div>
      </div>

      <div className="pt-2 flex items-center justify-between gap-3">
        <p className="text-xs text-slate-500">
          Нажимая «Опубликовать», вы подтверждаете правдивость информации.
        </p>
        <button type="submit" className="btn-primary">
          Опубликовать
        </button>
      </div>
    </form>
  );
}
