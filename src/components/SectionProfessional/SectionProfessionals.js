// Arquivo: SectionProfessionals.js (ou onde seu código está)
"use client";
import Link from "next/link";
import "./SectionProfessionals.css";
import { useState, useEffect } from "react";
import Image from "next/image";
import { FaStar, FaStarHalf, FaRegStar, FaRegBookmark } from "react-icons/fa";

// const categories = [
//   "Jardinagem", "Manicure e Pedicure", "Barbeiro", "Limpeza Residencial",
//   "Eletricista", "Encanador", "Pintor", "Montagem de Móveis",
//   "Personal Trainer", "Manutenção de Piscinas", "Aulas Particulares",
//   "Motorista", "Frete",
// ];

export default function SectionProfessionals() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Esta requisição agora traz tudo que precisamos!
    fetch("http://localhost:3000/usuario")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error("Erro ao buscar usuários:", err));
  }, []);

  // Filtra apenas os usuários que são prestadores
  const prestadores = users.filter((user) => user.tipo === "PRESTADOR");

  // ... (a função handleClickCategory continua a mesma)

  return (
    <section className="section-professionals">
      {/* ... (o filtro desabilitado continua o mesmo) ... */}

      <div className="section-profissionals_card">
        {prestadores.map((user) => (
          // O componente ProfessionalCardWithService agora recebe o usuário completo
          <ProfessionalCardWithService key={user.id} user={user} />
        ))}
      </div>
    </section>
  );
}

// Este componente agora fica muito mais simples!
function ProfessionalCardWithService({ user }) {
  // Os serviços e a imagem já vêm dentro do objeto 'user'
  const imagemServico =
    user.servicos_oferecidos?.[0]?.imagens?.[0] || "/default-service.jpg";
  const descricaoServico =
    user.servicos_oferecidos?.[0]?.descricao ||
    "Este profissional ainda não cadastrou uma descrição de serviço.";

  return (
    <div className="relative rounded shadow bg-zinc-100 flex flex-col">
      <div className="absolute w-[50px] h-[50px] right-4 top-4 z-10">
        <Image
          src={user.foto_perfil_url || "/default-profile.jpg"}
          alt={user.nome}
          fill
          objectFit="cover"
          className="rounded-full shadow-2xl"
        />
      </div>
      <div className="relative w-full h-52">
        <Image
          src={imagemServico}
          alt="Imagem do serviço"
          fill
          objectFit="cover"
          className="rounded"
        />
      </div>
      <div className="p-5 flex flex-col gap-3 relative flex-grow">
        <button className="absolute right-4" title="Favoritar">
          <FaRegBookmark className="text-2xl" />
        </button>
        <h2 className="text-2xl font-bold">{user.nome}</h2>
        {/* Passamos o array de avaliações diretamente para o componente StarsRating */}
        <StarsRating avaliacoes={user.avaliacoes_recebidas} />
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

// Este componente agora não faz mais requisições! Ele apenas calcula e exibe.
function StarsRating({ avaliacoes }) {
  // A lógica de cálculo da média continua a mesma e está perfeita!
  const avgRating =
    avaliacoes && avaliacoes.length > 0
      ? avaliacoes.reduce((acc, cur) => acc + cur.nota, 0) / avaliacoes.length
      : 0;

  const fullStars = Math.floor(avgRating);
  const hasHalfStar = avgRating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  const stars = [];
  for (let i = 0; i < fullStars; i++)
    stars.push(<FaStar key={"full" + i} color="#facc15" />); // Cor amarela
  if (hasHalfStar) stars.push(<FaStarHalf key="half" color="#facc15" />);
  for (let i = 0; i < emptyStars; i++)
    stars.push(<FaRegStar key={"empty" + i} color="#d1d5db" />); // Cor cinza

  return (
    <div
      className="flex items-center gap-1"
      title={`Avaliação média: ${avgRating.toFixed(1)} de ${
        avaliacoes?.length || 0
      } avaliações`}
    >
      {stars}
      <span className="text-xs text-gray-500 ml-1">
        ({avaliacoes?.length || 0})
      </span>
    </div>
  );
}
