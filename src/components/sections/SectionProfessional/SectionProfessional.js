"use client";

import { useEffect, useRef, useState } from "react";
import ProfessionalCard from "./ProfessionalCard";
import api from "@/services/api";
import "./SectionProfessional.css";
import instruction from "@/data/instruction";

const categories = [
  // Adicionando a opção para limpar o filtro
  "Todas as categorias",
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
  "Obras",
  "Cabeleireira",
  "Dedetização",
  "Chaveiro",
];

export default function BuscarPrestadoresPorCidade() {
  const [cidade, setCidade] = useState("");
  const [cidadeBuscada, setCidadeBuscada] = useState(""); // Novo estado para guardar a cidade da busca
  const [prestadores, setPrestadores] = useState([]);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState(null);

  const [categoriaSelecionada, setCategoriaSelecionada] = useState(""); // somente valor escolhido
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const searchRef = useRef(null);

  const [jaBuscou, setJaBuscou] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // busca sempre levando em conta cidade + categoriaSelecionada
  const buscarPrestadores = async (cidadeParam, categoriaParam) => {
    if (!cidadeParam.trim()) return;

    try {
      setLoading(true);
      setErro(null);
      setJaBuscou(true);

      const response = await api.get(
        `/usuario/prestadores/cidade/${cidadeParam}`,
        {
          params: {
            categoria: categoriaParam || undefined,
          },
        }
      );

      setPrestadores(response.data.prestadores || []);
    } catch (error) {
      console.error(error);
      setErro("Erro ao buscar prestadores.");
    } finally {
      setLoading(false);
    }
  };

  const handleBuscarCidade = () => {
    if (!cidade.trim()) return;
    setCidadeBuscada(cidade); // Guarda a cidade que está sendo buscada
    buscarPrestadores(cidade, categoriaSelecionada);
    setCidade(""); // Limpa o input para a próxima busca
  };

  const handleSelectCategoria = (categoria) => {
    // Se "Todas as categorias" for selecionado, tratamos como string vazia
    const novaCategoria = categoria === "Todas as categorias" ? "" : categoria;
    setCategoriaSelecionada(novaCategoria);
    setDropdownOpen(false);

    // se já existe uma cidade preenchida, ao escolher categoria faz nova busca filtrando
    if (cidadeBuscada.trim()) {
      buscarPrestadores(cidadeBuscada, novaCategoria);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Efeito para carregar o estado do sessionStorage ao montar o componente
  // e definir que estamos no lado do cliente
  useEffect(() => {
    // Este código só roda no cliente
    setIsClient(true);

    // Apenas tentamos carregar o estado se estivermos no cliente
    if (typeof window !== "undefined") {
      try {
        const savedState = localStorage.getItem("professionalSearchState");
        if (savedState) {
          const {
            cidadeBuscada: savedCidade,
            categoriaSelecionada: savedCategoria,
            prestadores: savedPrestadores = [],
            jaBuscou: savedJaBuscou,
          } = JSON.parse(savedState);

          setCidadeBuscada(savedCidade || "");
          setCategoriaSelecionada(savedCategoria || "");
          setPrestadores(savedPrestadores);
          setJaBuscou(savedJaBuscou || false);
        }
      } catch (error) {
        console.error("Falha ao carregar estado do localStorage:", error);
        localStorage.removeItem("professionalSearchState");
      }
    }
  }, []); // Array vazio garante que rode apenas uma vez

  // Efeito para salvar o estado no sessionStorage sempre que ele mudar
  useEffect(() => {
    const stateToSave = {
      cidadeBuscada,
      categoriaSelecionada,
      prestadores,
      jaBuscou,
    };
    // Apenas salvamos o estado se estivermos no cliente
    if (isClient) {
      localStorage.setItem(
        "professionalSearchState",
        JSON.stringify(stateToSave)
      );
    }
  }, [cidadeBuscada, categoriaSelecionada, prestadores, jaBuscou]);

  const mensagemNenhumResultado = () => {
    if (!jaBuscou) return null;
    if (prestadores.length > 0) return null;

    if (cidadeBuscada && !categoriaSelecionada) {
      return (
        <div className="section-professional-message">
          <h3 className=" section-professional-message-title">
            Desculpe, não encontramos profissionais disponíveis na cidade{" "}
            {cidadeBuscada}.
          </h3>
          <p className=" section-professional-message-text">
            Que tal tentar novamente buscando por cidades vizinhas ou regiões
            próximas? Assim, você aumenta as chances de encontrar o profissional
            ideal para o seu serviço.
          </p>
        </div>
      );
    }

    if (cidadeBuscada && categoriaSelecionada) {
      return (
        <div className="section-professional-message">
          <h3 className=" section-professional-message-title">
            Desculpe, não achamos profissionais de {categoriaSelecionada} na sua{" "}
            cidade {cidadeBuscada}.
          </h3>
          <p className=" section-professional-message-text">
            Que tal tentar novamente buscando por cidades vizinhas ou regiões
            próximas? Assim, você aumenta as chances de encontrar o profissional
            ideal para o seu serviço.
          </p>
        </div>
      );
    }

    return null;
  };

  return (
    <section className="section-professional">
      {/* Dropdown somente seleção de categoria, sem digitação */}
      <div className="section-professional_search-wrapper" ref={searchRef}>
        <button
          type="button "
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
                // Usamos onMouseDown para garantir que o evento dispare antes do onBlur do input
                onMouseDown={(e) => {
                  e.preventDefault(); // Previne que o input perca o foco antes do clique
                  handleSelectCategoria(cat);
                }}
              >
                <button className=" section-professional_search-button-item">
                  {cat}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Cidade */}
      <div className=" section-professional_search-cidade">
        <input
          type="text"
          placeholder="Digite a cidade"
          value={cidade}
          onChange={(e) => setCidade(e.target.value)}
          className=" section-professional_search-input"
        />
        <button
          onClick={handleBuscarCidade}
          disabled={loading}
          className=" section-professional_search-button-cidade"
        >
          {loading ? "Buscando..." : "Buscar"}
        </button>
      </div>

      {erro && <p>{erro}</p>}

      {/* Mensagens de nenhum resultado */}
      {isClient && mensagemNenhumResultado()}

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
      {/* Tela inicial padrão */}
      {isClient && !jaBuscou && (
        <div className="section-professional_default">
          {instruction.map((item, index) => (
            <div
              key={index}
              className={`  section-professional_default-item ${item.bg}`}
            >
              <item.icon
                className={`section-professional_default-icon ${item.iconColor}`}
              />
              <h3 className=" section-professional_default-title">
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
