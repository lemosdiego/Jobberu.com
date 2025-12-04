"use client";

import Image from "next/image";
import { FaMapMarkerAlt, FaBriefcase, FaStar } from "react-icons/fa";
import { FaLink } from "react-icons/fa6";
import StarRating from "@/components/sections/SectionProfessional/StarRating"; // Importa o componente StarRating compartilhado

export default function ProfilePublicPrestador({ profissional }) {
  const {
    nome,
    foto_perfil_url,
    titulo_profissional,
    biografia,
    cidade,
    estado,
    anos_experiencia,
    links_redes_sociais,
    servicos_oferecidos,
    avaliacoes_recebidas,
  } = profissional;

  const fotoPerfil = foto_perfil_url || "/default-avatar.png";

  // Calcula a média das avaliações
  const totalAvaliacoes = avaliacoes_recebidas.length;
  const somaNotas = avaliacoes_recebidas.reduce((acc, av) => acc + av.nota, 0);
  // O componente StarRating espera 'soma' e 'total', não 'media'

  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="bg-white shadow-lg rounded-lg p-6 md:p-8">
        {/* Cabeçalho do Perfil */}
        <header className="flex flex-col md:flex-row items-center mb-8">
          <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-gray-200 mb-4 md:mb-0 md:mr-8">
            <Image
              src={fotoPerfil}
              alt={`Foto de ${nome}`}
              layout="fill"
              objectFit="cover"
            />
          </div>
          <div className="text-center md:text-left">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
              {nome}
            </h1>
            <h2 className="text-xl text-blue-600 font-semibold">
              {titulo_profissional}
            </h2>
            <div className="flex items-center justify-center md:justify-start text-gray-600 mt-2">
              <FaMapMarkerAlt className="mr-2" />
              <span>
                {cidade} - {estado}
              </span>
              <FaBriefcase className="ml-4 mr-2" />
              <span>
                {anos_experiencia} {anos_experiencia === 1 ? "ano" : "anos"} de
                experiência
              </span>
            </div>
            <div className="mt-2">
              <StarRating soma={somaNotas} total={totalAvaliacoes} />
            </div>
          </div>
        </header>

        {/* Biografia e Redes Sociais */}
        <section className="mb-8">
          <h3 className="text-2xl font-semibold border-b pb-2 mb-4">
            Sobre mim
          </h3>
          <p className="text-gray-700 whitespace-pre-wrap">{biografia}</p>
          {links_redes_sociais &&
            links_redes_sociais.filter((link) => link).length > 0 && (
              <div className="mt-4">
                <h4 className="font-semibold">Redes e Contatos:</h4>
                <div className="flex space-x-4 mt-2">
                  {links_redes_sociais
                    .filter((link) => link)
                    .map((link, index) => (
                      <a
                        key={index}
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:text-blue-700"
                      >
                        <FaLink size={24} />
                      </a>
                    ))}
                </div>
              </div>
            )}
        </section>

        {/* Serviços Oferecidos */}
        <section className="mb-8">
          <h3 className="text-2xl font-semibold border-b pb-2 mb-4">
            Serviços Oferecidos
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {servicos_oferecidos.map((servico) => (
              <div key={servico.id} className="border rounded-lg p-4 shadow-md">
                {servico.imagens && servico.imagens.length > 0 && (
                  <div className="relative h-40 w-full rounded-md overflow-hidden mb-4">
                    <Image
                      src={servico.imagens[0]}
                      alt={servico.titulo}
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                )}
                <h4 className="font-bold text-lg">{servico.titulo}</h4>
                <p className="text-sm text-gray-500 capitalize mb-2">
                  {servico.categoria}
                </p>
                <p className="text-sm text-gray-700 mb-3">
                  {servico.descricao}
                </p>
                <p className="font-semibold text-right">
                  {servico.preco
                    ? `A partir de R$ ${servico.preco}`
                    : "Preço a combinar"}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Avaliações */}
        <section>
          <h3 className="text-2xl font-semibold border-b pb-2 mb-4">
            Avaliações
          </h3>
          {avaliacoes_recebidas.length > 0 ? (
            <p>Listagem de avaliações aqui...</p> // TODO: Implementar a lista de avaliações
          ) : (
            <p className="text-gray-500">
              Este profissional ainda não recebeu avaliações.
            </p>
          )}
        </section>
      </div>
    </div>
  );
}
