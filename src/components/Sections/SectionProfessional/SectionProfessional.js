"use client";

import ProfessionalCard from "@/components/Site/ProfessionalCard/ProfessionalCard";
import "./SectionProfessional.css";
import instruction from "@/data/instruction";
import Title from "@/components/Site/Title/Title";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function BuscarPrestadoresPorCidade({
  prestadores,
  loading,
  erro,
  isClient,
  jaBuscou,
  mensagemNenhumResultado,
}) {
  return (
    <section className="section-professional">
      {erro && <p className=" section-professional-error">{erro}</p>}

      {/* Mensagens de nenhum resultado */}
      {isClient &&
        !loading &&
        mensagemNenhumResultado &&
        mensagemNenhumResultado() && (
          <div className="section-professional-message">
            <h3 className="section-professional-message-title">
              {mensagemNenhumResultado()}
            </h3>
            <p className="section-professional-message-text">
              Que tal tentar novamente buscando por cidades vizinhas ou regiões
              próximas?
            </p>
          </div>
        )}

      {/* Loading Skeletons */}
      {isClient && loading && (
        <div className="section-professional_container-list">
          <div className="section-professional-container-card">
            {Array(6)
              .fill(0)
              .map((_, index) => (
                <div key={index} className="professional-card">
                  <div className="professional-card_image-container">
                    <Skeleton height="100%" />
                  </div>
                  <div className="professional-card_content">
                    <div className="professional-card_content-header">
                      <div className="professional-card_content-header-image">
                        <Skeleton circle height="100%" />
                      </div>
                      <div className="professional-card_content-header-container-content-user w-full">
                        <Skeleton width="70%" height={24} />
                        <Skeleton width="40%" />
                      </div>
                    </div>
                    <div className="professional-card_content-rating">
                      <Skeleton width={100} />
                    </div>
                    <div className="professional-card_content-location">
                      <Skeleton width="50%" />
                    </div>
                    <div className="professional-card_content-bio">
                      <Skeleton count={3} />
                    </div>
                    <div className="professional-card_footer">
                      <Skeleton width={100} height={20} />
                      <Skeleton width={100} height={35} />
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* Lista de profissionais */}
      {isClient && !loading && prestadores && prestadores.length > 0 && (
        <div className="section-professional_container-list">
          <Title>Os melhores profissionais perto de você</Title>
          <div className="section-professional-container-card">
            {prestadores.map((profissional) => (
              <ProfessionalCard
                key={profissional.id}
                profissional={profissional}
              />
            ))}
          </div>
        </div>
      )}

      {/* Tela inicial */}
      {isClient && !loading && !jaBuscou && (
        <div className="section-professional_default">
          {instruction.map((item, index) => (
            <div
              key={index}
              className={`section-professional_default-item ${item.bg}`}
            >
              <div className="section-professional_default-icon-container">
                <item.icon
                  className={`section-professional_default-icon ${item.iconColor}`}
                />
              </div>
              <h3 className="section-professional_default-title">
                {item.title}
              </h3>
              <p className="section-professional_default-text">{item.text}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
