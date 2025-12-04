"use client";

import { useEffect, useRef, useState } from "react";
import ProfessionalCard from "./ProfessionalCard";
import api from "@/services/api";

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
            prestadores: savedPrestadores,
            jaBuscou: savedJaBuscou,
          } = JSON.parse(savedState);

          setCidadeBuscada(savedCidade || "");
          setCategoriaSelecionada(savedCategoria || "");
          setPrestadores(savedPrestadores || []);
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
        <p>
          Desculpe, não achamos profissionais na sua cidade {cidadeBuscada}.
        </p>
      );
    }

    if (cidadeBuscada && categoriaSelecionada) {
      return (
        <p>
          Desculpe, não achamos profissionais de {categoriaSelecionada} na sua{" "}
          cidade {cidadeBuscada}.
        </p>
      );
    }

    return null;
  };

  return (
    <section className="w-[1200px]">
      {/* Dropdown somente seleção de categoria, sem digitação */}
      <div className="search-wrapper relative " ref={searchRef}>
        <button
          type="button border"
          className="search flex items-center justify-between border w-full p-3"
          onClick={() => setDropdownOpen((prev) => !prev)}
        >
          <span className={!categoriaSelecionada ? "text-gray-500" : ""}>
            {categoriaSelecionada || "Selecione uma categoria (opcional)"}
          </span>
        </button>

        {dropdownOpen && (
          <ul className="search-dropdown border absolute bg-white w-full z-20 grid shadow mt-1">
            {categories.map((cat) => (
              <li
                key={cat}
                className="search-item p-1 text-sm hover:bg-gray-100"
                // Usamos onMouseDown para garantir que o evento dispare antes do onBlur do input
                onMouseDown={(e) => {
                  e.preventDefault(); // Previne que o input perca o foco antes do clique
                  handleSelectCategoria(cat);
                }}
              >
                <button className="m-1 ml-2 cursor-pointer">{cat}</button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Cidade */}
      <div className="mt-4 grid  [grid-template-columns:4fr_1fr] gap-2">
        <input
          type="text"
          placeholder="Digite a cidade"
          value={cidade}
          onChange={(e) => setCidade(e.target.value)}
          className="p-3 border w-full"
        />
        <button
          onClick={handleBuscarCidade}
          disabled={loading}
          className="border"
        >
          {loading ? "Buscando..." : "Buscar"}
        </button>
      </div>

      {erro && <p>{erro}</p>}

      {/* Mensagens de nenhum resultado */}
      {isClient && mensagemNenhumResultado()}

      {/* Lista de profissionais */}
      {isClient && prestadores.length > 0 && (
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
        <div className="mt-4 h-[400px] mb-4 border">
          <h1 className="text-2xl font-semibold">
            Busque os melhores profissionais da sua região
          </h1>
          <p className="text-gray-600">
            Digite a cidade e, se quiser, escolha uma categoria para filtrar.
          </p>
        </div>
      )}
    </section>
  );
}
