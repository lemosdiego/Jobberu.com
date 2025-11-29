// /components/PrestadorCard.jsx
"use client";

import { truncate } from "@/utils/truncate";
import Image from "next/image";
import Link from "next/link";
import React from "react";

// Um componente simples para renderizar as estrelas
const Estrelas = ({ nota }) => {
  const notaArredondada = Math.round(nota * 2) / 2;
  // Lógica para exibir estrelas cheias, meias ou vazias (pode ser aprimorada)
  return <div>{"★".repeat(Math.floor(notaArredondada))}</div>;
};

export default function PrestadorCard({ prestador }) {
  // O frontend faz o cálculo final da média, como planejamos
  const notaMedia =
    prestador.total_avaliacoes > 0
      ? prestador.soma_das_notas / prestador.total_avaliacoes
      : 0;

  // Caminho da imagem genérica (deixe em /public/images/...)
  const imagemServicoFallback = "/images/servico-placeholder.jpg";

  return (
    <div className="relative bg-gray-50 shadow rounded">
      <div className="absolute right-2 top-2 w-14 h-14 rounded-full z-10">
        <Image
          src={prestador.foto_perfil_url || "https://via.placeholder.com/300"}
          alt={prestador.nome}
          fill
          objectFit="cover"
          className="rounded-full shadow-md "
        />
      </div>

      <Link href={"/"} className="rounded">
        <div className="relative h-52">
          <Image
            src={prestador.primeiro_servico.imagem_url || imagemServicoFallback}
            alt={`Serviço de ${prestador.nome}`}
            fill
            objectFit="cover"
            className="shadow rounded"
          />
          <small className="text-lg font-medium absolute left-4 top-4">
            {prestador.cidade}, {prestador.estado}
          </small>
        </div>
      </Link>
      <div className="p-4 flex flex-col gap-0.5">
        <h3 className="text-xl">{prestador.nome}</h3>
        <div className="">
          <Estrelas nota={notaMedia} />
          <span>{notaMedia.toFixed(1)}</span>
          <span>({prestador.total_avaliacoes} avaliações)</span>
        </div>
        <p className="italic text-sm font-medium">
          {prestador.titulo_profissional}
        </p>
        <p>{truncate(prestador.biografia, 90)}</p>
        {prestador.primeiro_servico && (
          <p>A partir de R$ {prestador.primeiro_servico.preco}</p>
        )}
        <Link href={"/"}>Ver Detalhes</Link>
      </div>
    </div>
  );
}
