"use client";

import Image from "next/image";
import { FaMapMarkerAlt, FaBriefcase, FaWhatsapp } from "react-icons/fa";
import { FaLink } from "react-icons/fa6";
import StarRating from "@/components/Sections/SectionProfessional/StarRating"; // Importa o componente StarRating compartilhado
import "./ProfilePublicProfessional.css";
import Link from "next/link";
import ProviderLevelBadge from "../SectionProfessional/ProviderLevelBadge";

export default function ProfilePublicPrestador({ profissional }) {
  const {
    telefone,
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
  const whatsappLink = telefone
    ? `https://wa.me/55${telefone.replace(/\D/g, "")}`
    : null;

  // Calcula a média das avaliações
  const totalAvaliacoes = avaliacoes_recebidas.length;
  const somaNotas = avaliacoes_recebidas.reduce((acc, av) => acc + av.nota, 0);
  // O componente StarRating espera 'soma' e 'total', não 'media'

  return (
    <main className="page-profile">
      <div className="page-profile_container">
        {/* Cabeçalho do Perfil */}
        <header className="page-profile_header">
          <div className="page-profile_header-image-wrapper">
            <div className="page-profile_header-image">
              <Image
                src={fotoPerfil}
                alt={`Foto de ${nome}`}
                layout="fill"
                objectFit="cover"
                className="page-profile_header-image-img"
              />
            </div>
            <div className="page-profile_header_content-star">
              <Link href={"#avaliacoes"} className="">
                <StarRating soma={somaNotas} total={totalAvaliacoes} />
              </Link>
            </div>
          </div>
          <div className="page-profile_header-content">
            <h1 className="page-profile_header_content-title">{nome}</h1>
            <ProviderLevelBadge level={profissional.nivel_prestador} />
            <h2 className=" page-profile_header_content-subtitle">
              {titulo_profissional}
            </h2>
            <div className=" page-profile_header_content-subtitle-info">
              <span className="page-profile_header_content-subtitle-info-item">
                <FaMapMarkerAlt />
                <p>
                  {cidade} - {estado}
                </p>
              </span>
              <span className="page-profile_header_content-subtitle-info-item">
                <FaBriefcase />
                <p>
                  {anos_experiencia} {anos_experiencia === 1 ? "ano" : "anos"}{" "}
                  de experiência
                </p>
              </span>
            </div>

            {whatsappLink && (
              <div className="page-profile_header_content-whatsapp">
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="page-profile_header_content-whatsapp-button"
                >
                  <FaWhatsapp
                    className=" page-profile_header_content-whatsapp-icon"
                    size={20}
                  />
                  Entrar em contato
                </a>
              </div>
            )}
          </div>
        </header>

        {/* Biografia e Redes Sociais */}
        <section className="page-profile_bio">
          <h3 className="page-profile_bio-title">Sobre mim</h3>
          <p className="page-profile_bio-text">{biografia}</p>
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
        <section className="mb-8 page-profile_services">
          <h3 className="page-profile_services-title">Meus Serviços</h3>
          <div className=" page-profile_services-container">
            {servicos_oferecidos.map((servico) => (
              <div key={servico.id} className="page-profile_services-item">
                {servico.imagens && servico.imagens.length > 0 && (
                  <div className="page-profile_services-item-image">
                    <Image
                      src={servico.imagens[0]}
                      alt={servico.titulo}
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                )}
                <h4 className="page-profile_services-item-title">
                  {servico.titulo}
                </h4>
                <p className="page-profile_services-item-category">
                  {servico.categoria}
                </p>
                <p className="page-profile_services-item-description">
                  {servico.descricao}
                </p>
                <p className="page-profile_services-item-price">
                  {servico.preco
                    ? `A partir de R$ ${servico.preco}`
                    : "Preço a combinar"}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Avaliações */}
        <section className="page-profile_reviews" id="avaliacoes">
          <h3 className="page-profile_reviews-title">Comentários</h3>
          {avaliacoes_recebidas.length > 0 ? (
            <div className="page-profile_reviews-container">
              {avaliacoes_recebidas.map((avaliacao) => (
                <div key={avaliacao.id} className="page-profile_reviews-item">
                  <div className="page-profile_reviews-item-header">
                    <div className="page-profile_review-item-header-image">
                      <Image
                        src={
                          avaliacao.cliente?.foto_perfil_url ||
                          "/default-avatar.png"
                        }
                        fill
                        objectFit="cover"
                        alt={`Foto de ${avaliacao.cliente?.nome || "Cliente"}`}
                        className="rounded-full mr-3 object-cover"
                      />
                    </div>
                    <div className="page-profile_review-header-content">
                      <p className="page-profile_review-header-content-name">
                        {avaliacao.cliente?.nome || "Cliente"}
                      </p>
                      <StarRating soma={avaliacao.nota} total={1} />
                    </div>
                  </div>
                  <p className="page-profile_reviews-item-text">
                    {avaliacao.comentario}
                  </p>
                  <p className="page-profile_reviews-item-date">
                    {new Date(avaliacao.data_criacao).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">
              Este profissional ainda não recebeu avaliações.
            </p>
          )}
        </section>
      </div>
    </main>
  );
}
