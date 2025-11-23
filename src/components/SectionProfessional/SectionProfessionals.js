"use client";
import professionals from "@/data/dataProfissionais";
import Link from "next/link";
import "./SectionProfessionals.css";
import { useState } from "react";

const categories = [
  "Jardinagem",
  "Manicure e Pedicure",
  "Barbeiro",
  "Limpeza Residencial",
  "Eletricista",
  "Encanador",
  "Pintor",
  "Montagem de Móveis",
  "Personal Trainer",
  "Manutenção de Piscinas",
  "Aulas Particulares",
  "Motorista",
  "Frete",
];

export default function SectionProfessionals() {
  // Estado que guarda as categorias selecionadas
  const [selectedCategories, setSelectedCategories] = useState([]);

  function handleClickCategory(category) {
    if (selectedCategories.includes(category)) {
      // Se já estiver selecionada, remove
      setSelectedCategories(selectedCategories.filter((c) => c !== category));
    } else {
      // Se não estiver, adiciona
      setSelectedCategories([...selectedCategories, category]);
    }
  }

  return (
    <section className="section-professionals">
      <div className="professionals-filter">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => handleClickCategory(category)}
            className={`px-4 py-2 rounded ${
              selectedCategories.includes(category)
                ? "bg-green-200 "
                : "bg-amber-100"
            }`}
          >
            {category}
          </button>
        ))}
      </div>
      <div className="section-profissionals_card">
        {professionals.map((professional) => (
          <div key={professional.id} className="professionals-card">
            <h3>{professional.nome}</h3>
            <Link href={`/details/${professional.id}`}>Detalhes</Link>
          </div>
        ))}
      </div>
    </section>
  );
}
