"use client";

import { useState } from "react";

export function ContactReveal({ phone }: { phone: string }) {
  const [shown, setShown] = useState(false);
  const masked = phone.replace(/\d(?=\d{2})/g, "•");

  return (
    <div>
      <div className="text-lg font-semibold tabular-nums">
        {shown ? phone : masked}
      </div>
      {shown ? (
        <a href={`tel:${phone.replace(/\s/g, "")}`} className="btn-primary w-full mt-2">
          Позвонить
        </a>
      ) : (
        <button
          type="button"
          onClick={() => setShown(true)}
          className="btn-primary w-full mt-2"
        >
          Показать телефон
        </button>
      )}
    </div>
  );
}
