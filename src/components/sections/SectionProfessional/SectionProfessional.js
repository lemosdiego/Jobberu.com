"use client";

import { useState, useEffect } from "react";
import ProfessionalCard from "./ProfessionalCard";
import "./SectionProfessional.css";
import instruction from "@/data/instruction";
import { useProfessionalSearch } from "@/hooks/useProfessionalSearch";

export default function BuscarPrestadoresPorCidade() {
  const {
    cidade,
    cidadeBuscada,
    prestadores,
    loading,
    erro,
    categoriaSelecionada,
    jaBuscou,
    isClient,
    categories,
    searchRef,
    setCidade,
    handleBuscarCidade,
    handleSelectCategoria,
    mensagemNenhumResultado,
  } = useProfessionalSearch();

  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Fecha dropdown ao clicar fora (lógica que ficou no componente)
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelectCategoriaWrapper = (categoria) => {
    handleSelectCategoria(categoria);
    setDropdownOpen(false);
  };

  return (
    <section className="section-professional">
      {/* Dropdown de categoria */}
      <div className="section-professional_search-wrapper" ref={searchRef}>
        <button
          type="button"
          className="section-professional_search-button"
          onClick={() => setDropdownOpen((prev) => !prev)}
        >
          <span className={!categoriaSelecionada ? "text-gray-500" : ""}>
            {categoriaSelecionada || "Selecione uma categoria (opcional)"}
          </span>
        </button>

        {dropdownOpen && (
          <ul className="section-professional_search-dropdown">
            {categories.map((cat) => (
              <li
                key={cat}
                className="section-professional_search-item"
                onMouseDown={(e) => {
                  e.preventDefault();
                  handleSelectCategoriaWrapper(cat);
                }}
              >
                <button className="section-professional_search-button-item">
                  {cat}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Input de cidade */}
      <div className="section-professional_search-cidade">
        <input
          type="text"
          placeholder="Digite a cidade"
          value={cidade}
          onChange={(e) => setCidade(e.target.value)}
          className="section-professional_search-input"
        />
        <button
          onClick={handleBuscarCidade}
          disabled={loading}
          className="section-professional_search-button-cidade"
        >
          {loading ? "Buscando..." : "Buscar"}
        </button>
      </div>

      {erro && <p>{erro}</p>}

      {/* Mensagens de nenhum resultado */}
      {isClient && mensagemNenhumResultado() && (
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
      {isClient && prestadores.length > 0 && (
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
