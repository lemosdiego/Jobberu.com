"use client";

import { useEffect, useState } from "react";
import categories from "@/app/data/categories";
import Image from "next/image";

const VISIBLE_CARDS = 4;
const INTERVAL_MS = 5000; // 3s

export default function Categories() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % categories.length);
    }, INTERVAL_MS);

    return () => clearInterval(id);
  }, []);

  // pega 4 itens a partir do currentIndex, em loop
  const visible = [
    ...categories,
    ...categories, // duplica para facilitar o slice circular
  ].slice(currentIndex, currentIndex + VISIBLE_CARDS);

  return (
    <section className="p-20 pt-14 w-full flex flex-col items-center bg-gray-100">
      <h2 className="text-4xl mb-10">Nossas Categorias</h2>
      <div className="max-w-[1200px] grid grid-cols-1 gap-4 md:grid-cols-4">
        {visible.map((item, index) => (
          <div
            key={`${item.title}-${index}`}
            className="flex flex-col items-center rounded-lg shadow bg-white shadow-sm transition-transform duration-300"
          >
            <div className="relative h-[200px] w-full ">
              {/* se tiver imagem na categoria, mostra; senão, fallback */}
              {/* {item.image ? (
                <Image
                  src={item.image}
                  alt={item.title}
                  className="h-full w-full object-cover"
                  fill
                  objectFit="cover"
                />
              ) : null} */}
            </div>
            <div className="p-2">
              {" "}
              <h3 className="text-center font-semibold">{item.title}</h3>
              {item.description && (
                <p className="mt-1 text-center text-gray-500">
                  {item.description}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
