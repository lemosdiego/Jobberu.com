"use client";
import Link from "next/link";
import "./SectionProfessionals.css";
import { useState, useEffect } from "react";

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
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/users")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error("Erro ao buscar usuários:", err));
  }, []);

  function handleClickCategory(category) {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  }

  const prestadores = users.filter((user) => user.tipo === "PRESTADOR");

  return (
    <section className="section-professionals">
      <div className="professionals-filter">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => handleClickCategory(category)}
            className={`px-4 py-2 rounded ${
              selectedCategories.includes(category)
                ? "bg-green-200"
                : "bg-amber-100"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="section-profissionals_card border">
        {prestadores.map((user) => (
          <div key={user.id}>
            <h2>{user.nome}</h2>
          </div>
        ))}
      </div>
    </section>
  );
}
