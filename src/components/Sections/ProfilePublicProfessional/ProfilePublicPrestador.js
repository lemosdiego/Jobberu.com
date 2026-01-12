"use client";

import { useState } from "react";
import Image from "next/image";
import {
  FaMapMarkerAlt,
  FaBriefcase,
  FaWhatsapp,
  FaStar,
} from "react-icons/fa";
import { FaLink } from "react-icons/fa6";
import StarRating from "@/components/Sections/SectionProfessional/StarRating"; // Importa o componente StarRating compartilhado
import "./ProfilePublicProfessional.css";
import Link from "next/link";
import ProviderLevelBadge from "../SectionProfessional/ProviderLevelBadge";
import useAssessment from "@/hooks/userAssessment";
import api from "@/services/api";

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

  // Filtra para mostrar apenas avaliações que foram aprovadas
  const avaliacoesAprovadas = avaliacoes_recebidas.filter(
    (avaliacao) => avaliacao.aprovada
  );

  const fotoPerfil = foto_perfil_url || "/default-avatar.png";
  const whatsappLink = telefone
    ? `https://wa.me/55${telefone.replace(/\D/g, "")}`
    : null;

  // Hook para verificar se o usuário logado pode avaliar este prestador
  const { podeAvaliar, registroId, carregando } = useAssessment(
    profissional.id
  );

  // Estados do Modal de Avaliação
  const [showModal, setShowModal] = useState(false);
  const [notaAvaliacao, setNotaAvaliacao] = useState(0);
  const [comentarioAvaliacao, setComentarioAvaliacao] = useState("");
  const [enviando, setEnviando] = useState(false);

  const handleEnviarAvaliacao = async (e) => {
    e.preventDefault();
    if (notaAvaliacao === 0) return alert("Por favor, selecione uma nota.");

    setEnviando(true);
    try {
      await api.post("/avaliacao/create", {
        registroId: registroId, // Vincula a avaliação ao "Aperto de Mão Digital"
        nota: notaAvaliacao,
        comentario: comentarioAvaliacao,
      });
      alert(
        "Avaliação enviada com sucesso! Seu comentário será publicado após aprovação."
      );
      setShowModal(false);
    } catch (error) {
      console.error("Erro ao enviar avaliação:", error);
      // Usa a mensagem de erro da API se disponível, senão uma mensagem padrão.
      const errorMessage =
        error.response?.data?.error ||
        "Erro ao enviar avaliação. Tente novamente.";
      alert(errorMessage);
    } finally {
      setEnviando(false);
    }
  };

  // Calcula a média das avaliações com base nas aprovadas
  const totalAvaliacoes = avaliacoesAprovadas.length;
  const somaNotas = avaliacoesAprovadas.reduce((acc, av) => acc + av.nota, 0);
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

          {/* Botão de Avaliar (Só aparece se for elegível) */}
          {!carregando && podeAvaliar && (
            <div className="mb-6">
              <button
                onClick={() => setShowModal(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
              >
                Avaliar Serviço Realizado
              </button>
            </div>
          )}

          {avaliacoesAprovadas.length > 0 ? (
            <div className="page-profile_reviews-container">
              {avaliacoesAprovadas.map((avaliacao) => (
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

      {/* Modal de Avaliação */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">Avaliar Serviço</h3>
            <form onSubmit={handleEnviarAvaliacao}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Sua Nota:</label>
                <div className="flex space-x-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setNotaAvaliacao(star)}
                      className={`text-2xl ${
                        star <= notaAvaliacao
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }`}
                    >
                      <FaStar />
                    </button>
                  ))}
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Comentário:</label>
                <textarea
                  className="w-full border rounded p-2"
                  rows="4"
                  value={comentarioAvaliacao}
                  onChange={(e) => setComentarioAvaliacao(e.target.value)}
                  placeholder="Conte como foi sua experiência..."
                  required
                ></textarea>
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={enviando}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
                >
                  {enviando ? "Enviando..." : "Enviar Avaliação"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
