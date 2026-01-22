"use client";

import ProfessionalCard from "./ProfessionalCard";
import "./SectionProfessional.css";
import instruction from "@/data/instruction";

export default function BuscarPrestadoresPorCidade({
  prestadores,
  loading,
  erro,
  isClient,
  jaBuscou,
  mensagemNenhumResultado,
}) {
  return (
    <section className="section-professional border-none shadow-none mt-0">
      {erro && <p className="text-red-500 text-center mt-4">{erro}</p>}

      {/* Mensagens de nenhum resultado */}
      {isClient && mensagemNenhumResultado && mensagemNenhumResultado() && (
        <div className="section-professional-message text-center">
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
        <div className="section-professional_container-card">
          {prestadores.map((profissional) => (
            <ProfessionalCard
              key={profissional.id}
              profissional={profissional}
            />
          ))}
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
              <item.icon
                className={`section-professional_default-icon ${item.iconColor}`}
              />
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
