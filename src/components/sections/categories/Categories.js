"use client";

import { useEffect, useState, useRef } from "react";
import categories from "@/app/data/categories";
import Image from "next/image";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import "./Categories.css";

const INTERVAL_MS = 5000; // 5s

export default function Categories() {
  const [isPaused, setIsPaused] = useState(false);
  const containerRef = useRef(null);
  const intervalRef = useRef(null);

  useEffect(() => {
    const startAutoScroll = () => {
      if (isPaused || !containerRef.current) return;

      intervalRef.current = setInterval(() => {
        if (containerRef.current) {
          const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
          // Se chegou ao final, volta para o início
          if (scrollLeft + clientWidth >= scrollWidth - 1) {
            containerRef.current.scrollTo({ left: 0, behavior: "smooth" });
          } else {
            // Rola um card para a direita
            const card = containerRef.current.firstElementChild;
            const cardStyle = window.getComputedStyle(card);
            const cardMargin = parseFloat(cardStyle.marginRight); // space-x-4
            containerRef.current.scrollBy({
              left: card.offsetWidth + cardMargin,
              behavior: "smooth",
            });
          }
        }
      }, INTERVAL_MS);
    };

    startAutoScroll();

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPaused]); // Reinicia o intervalo se isPaused mudar

  const scroll = (direction) => {
    if (containerRef.current) {
      const { scrollLeft, clientWidth } = containerRef.current;
      const scrollAmount =
        direction === "left"
          ? scrollLeft - clientWidth
          : scrollLeft + clientWidth;
      containerRef.current.scrollTo({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section
      className="section-categories "
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <h2 className="section-categories__title ">Categorias</h2>
      <div className="section-categories__conteiner ">
        <button
          onClick={() => scroll("left")}
          className="section-categories__button-left "
          aria-label="Categoria anterior"
        >
          <MdChevronLeft size={40} />
        </button>
        <div ref={containerRef} className="section-categories__cards">
          {categories.map((item, index) => (
            <div
              key={`${item.title}-${index}`}
              className="section-categories__card "
            >
              <div className="section-categories__card-image">
                {item.image ? (
                  <Image
                    src={item.image}
                    alt={item.title}
                    className="section-categories__card-image-img"
                    fill
                    objectFit="cover"
                  />
                ) : null}
              </div>
              <div className="section-categories__card-content">
                <h3 className="section-categories__card-title">{item.title}</h3>
                {item.description && (
                  <p className="section-categories__card-description">
                    {item.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
        <button
          onClick={() => scroll("right")}
          className="section-categories__button-right"
          aria-label="Próxima categoria"
        >
          <MdChevronRight size={40} />
        </button>
      </div>
    </section>
  );
}
