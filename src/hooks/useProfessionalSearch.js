"use client";

import { useEffect, useRef, useState } from "react";
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

  // Busca prestadores pela API
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
    setCidadeBuscada(cidade);
    buscarPrestadores(cidade, categoriaSelecionada);
    setCidade("");
  };

  const handleSelectCategoria = (categoria) => {
    const novaCategoria = categoria === "Todas as categorias" ? "" : categoria;
    setCategoriaSelecionada(novaCategoria);

    if (cidadeBuscada.trim()) {
      buscarPrestadores(cidadeBuscada, novaCategoria);
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
        }
      } catch (error) {
        console.error("Falha ao carregar estado do localStorage:", error);
        localStorage.removeItem("professionalSearchState");
      }
    }
  }, []);

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
        JSON.stringify(stateToSave)
      );
    }
  }, [cidadeBuscada, categoriaSelecionada, prestadores, jaBuscou, isClient]);

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
      return `Desculpe, não encontramos profissionais disponíveis na cidade ${cidadeBuscada}.`;
    }

    if (cidadeBuscada && categoriaSelecionada) {
      return `Desculpe, não achamos profissionais de ${categoriaSelecionada} na sua cidade ${cidadeBuscada}.`;
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
