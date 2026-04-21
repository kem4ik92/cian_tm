"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export function HeroSlideshow({ images }: { images: string[] }) {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (images.length < 2) return;
    const id = setInterval(() => {
      setIdx((i) => (i + 1) % images.length);
    }, 5000);
    return () => clearInterval(id);
  }, [images.length]);

  if (images.length === 0) return null;

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      {images.map((src, i) => (
        <Image
          key={src + i}
          src={src}
          alt=""
          fill
          priority={i === 0}
          sizes="100vw"
          className={`object-cover transition-opacity duration-[1500ms] ease-in-out ${
            i === idx ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/85 via-slate-900/70 to-slate-950/90" />
    </div>
  );
}
