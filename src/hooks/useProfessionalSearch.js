"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import api from "@/services/api";

export function useProfessionalSearch() {
  const [cidade, setCidade] = useState("");
  const [cidadeBuscada, setCidadeBuscada] = useState("");
  const [prestadores, setPrestadores] = useState([]);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState(null);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState("");
  const [jaBuscou, setJaBuscou] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const searchRef = useRef(null);

  const categories = [
    "Todas as categorias",
    "Jardineiro(a)",
    "Manicure e Pedicure",
    "Barbeiro(a)",
    "Profissional de Limpeza",
    "Eletricista",
    "Encanador(a)",
    "Pintor(a)",
    "Montador(a) de Móveis",
    "Personal Trainer",
    "Piscineiro(a)",
    "Professor(a) Particular",
    "Motorista",
    "Profissional de Fretes",
    "Pedreiro(a)",
    "Cabeleireiro(a)",
    "Dedetizador(a)",
    "Chaveiro(a)",
    "Programador(a) Web",
  ];

  // Busca prestadores pela API
  const buscarPrestadores = useCallback(
    async (cidadeParam, categoriaParam, options = {}) => {
      const { isRevalidation = false } = options;
      if (!cidadeParam.trim()) return;

      try {
        // Apenas mostra o loading principal para novas buscas iniciadas pelo usuário
        if (!isRevalidation) {
          setLoading(true);
          setPrestadores([]); // Limpa resultados antigos para uma nova busca
        }
        setErro(null);
        setJaBuscou(true);

        const response = await api.get(
          `/usuario/prestadores/cidade/${cidadeParam}`,
          {
            params: {
              categoria: categoriaParam || undefined,
            },
          },
        );

        setPrestadores(response.data.prestadores || []);
      } catch (error) {
        console.error(error);
        setErro("Erro ao buscar prestadores.");
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  const handleBuscarCidade = () => {
    if (!cidade.trim()) return;
    setCidadeBuscada(cidade);
    buscarPrestadores(cidade, categoriaSelecionada); // Nova busca
    setCidade("");
  };

  const handleSelectCategoria = (categoria) => {
    const novaCategoria = categoria === "Todas as categorias" ? "" : categoria;
    setCategoriaSelecionada(novaCategoria);

    if (cidadeBuscada.trim()) {
      buscarPrestadores(cidadeBuscada, novaCategoria); // Nova busca
    }
  };

  // Carrega estado do localStorage
  useEffect(() => {
    setIsClient(true);

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

          // Se já existia uma busca, revalida os dados em segundo plano
          // para garantir que estejam sempre atualizados ao carregar a página.
          if (savedJaBuscou && savedCidade) {
            buscarPrestadores(savedCidade, savedCategoria || "", {
              isRevalidation: true,
            });
          }
        }
      } catch (error) {
        console.error("Falha ao carregar estado do localStorage:", error);
        localStorage.removeItem("professionalSearchState");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [buscarPrestadores]);

  // Salva estado no localStorage
  useEffect(() => {
    const stateToSave = {
      cidadeBuscada,
      categoriaSelecionada,
      prestadores,
      jaBuscou,
    };
    if (isClient) {
      localStorage.setItem(
        "professionalSearchState",
        JSON.stringify(stateToSave),
      );
    }
  }, [cidadeBuscada, categoriaSelecionada, prestadores, jaBuscou, isClient]);

  // Revalida os dados quando a aba do navegador se torna ativa
  useEffect(() => {
    if (!isClient) return;

    const handleVisibilityChange = () => {
      // Apenas re-busca se uma busca já foi feita e a página ficou visível
      if (document.visibilityState === "visible" && jaBuscou && cidadeBuscada) {
        buscarPrestadores(cidadeBuscada, categoriaSelecionada, {
          isRevalidation: true,
        });
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [
    isClient,
    jaBuscou,
    cidadeBuscada,
    categoriaSelecionada,
    buscarPrestadores,
  ]);

  // Click outside para fechar dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        // Fechar dropdown seria controlado pelo componente
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const mensagemNenhumResultado = () => {
    if (!jaBuscou) return null;
    if (prestadores.length > 0) return null;

    if (cidadeBuscada && !categoriaSelecionada) {
      return (
        <>
          Desculpe, não encontramos profissionais disponíveis na cidade &quot;
          <span>{cidadeBuscada}</span>&quot;.
        </>
      );
    }

    if (cidadeBuscada && categoriaSelecionada) {
      return (
        <>
          Desculpe, não achamos profissionais de &quot;
          <span>{categoriaSelecionada}</span>&quot; na cidade de &quot;
          <span>{cidadeBuscada}</span>&quot;.
        </>
      );
    }

    return null;
  };

  return {
    // Estados
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

    // Ações
    setCidade,
    handleBuscarCidade,
    handleSelectCategoria,
    mensagemNenhumResultado,
  };
}
