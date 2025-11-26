"use client";
import Link from "next/link";
import "./SectionProfessionals.css";
import { useState, useEffect } from "react";
import Image from "next/image";

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
    fetch("http://localhost:3000/usuario")
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
      {/* Filtro desabilitado, pode ativar se quiser */}
      {/* <div className="professionals-filter">
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
      </div> */}

      <div className="section-profissionals_card">
        {prestadores.map((user) => (
          <ProfessionalCardWithService key={user.id} user={user} />
        ))}
      </div>
    </section>
  );
}

function ProfessionalCardWithService({ user }) {
  const [servicos, setServicos] = useState([]);

  useEffect(() => {
    // Usa endpoint correto!
    fetch(`http://localhost:3000/usuario/${user.id}/servicos`)
      .then((res) => res.json())
      .then((data) => setServicos(data))
      .catch(() => setServicos([]));
  }, [user.id]);

  // Pega a primeira imagem do serviço ou mostra padrão
  const imagemServico = servicos[0]?.imagens?.[0] || "/default-service.jpg";
  // Pega descrição do primeiro serviço, se existir
  const descricaoServico = servicos[0]?.descricao || "";

  return (
    <div className="relative rounded shadow bg-zinc-100 flex flex-col">
      <div className="absolute w-[80px] h-[80px] right-5 top-5 z-10">
        <Image
          src={user.foto_perfil_url || "/default-profile.jpg"}
          alt={user.nome}
          fill
          objectFit="cover"
          className="rounded-full shadow-2xl"
        />
      </div>
      <div className="relative w-full h-48">
        <Image
          src={imagemServico}
          alt="Imagem do serviço"
          fill
          objectFit="cover"
          className="rounded"
        />
      </div>
      <div className="p-5 flex flex-col gap-3">
        <h2 className="text-2xl font-bold">{user.nome}</h2>
        <p className="text-sm">{descricaoServico}</p>
        <Link
          href={`/details-public-professional/${user.id}`}
          className="font-medium text-blue-500 underline"
        >
          Ver Detalhes
        </Link>
      </div>
    </div>
  );
}
