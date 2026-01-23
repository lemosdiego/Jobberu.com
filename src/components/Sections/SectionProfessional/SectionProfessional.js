"use client";

import ProfessionalCard from "@/components/Site/ProfessionalCard/ProfessionalCard";
import "./SectionProfessional.css";
import instruction from "@/data/instruction";
import Title from "@/components/Site/Title/Title";

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
      {isClient && mensagemNenhumResultado && mensagemNenhumResultado() && (
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

      {/* Lista de profissionais */}
      {isClient && prestadores && prestadores.length > 0 && (
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
      {isClient && !jaBuscou && (
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
