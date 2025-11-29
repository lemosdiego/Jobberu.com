// /hooks/usePrestadoresPorCidade.js
import { useState, useEffect } from "react";

// A URL base da nossa API. É uma boa prática usar variáveis de ambiente.
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export function usePrestadoresPorCidade(cidade) {
  // 1. Os três estados que nosso hook vai gerenciar
  const [prestadores, setPrestadores] = useState([]); // Começa como um array vazio
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // 2. O useEffect vai rodar sempre que a 'cidade' mudar
  useEffect(() => {
    // Não faz nada se a cidade não for fornecida
    if (!cidade) {
      setPrestadores([]); // Garante que a lista fique vazia se a cidade for removida
      return;
    }

    // Função para buscar os dados
    const fetchData = async () => {
      setIsLoading(true); // Começa o carregamento
      setError(null); // Limpa erros de buscas anteriores

      try {
        // Formata a cidade para o formato da URL (ex: "São Paulo" -> "Sao-Paulo")
        const cidadeFormatada = cidade.replace(/ /g, "-");

        const response = await fetch(
          `${API_URL}/usuario/prestadores/cidade/${cidadeFormatada}`
        );

        if (!response.ok) {
          throw new Error("Não foi possível buscar os prestadores.");
        }

        const data = await response.json();
        setPrestadores(data.prestadores); // Salva a lista de prestadores no estado
      } catch (err) {
        setError(err); // Salva o erro no estado
        setPrestadores([]); // Limpa os dados em caso de erro
      } finally {
        setIsLoading(false); // Termina o carregamento, independente de sucesso ou erro
      }
    };

    fetchData();
  }, [cidade]); // O array de dependências garante que o efeito rode de novo se a 'cidade' mudar

  // 3. O hook retorna os estados para o componente poder usar
  return { prestadores, isLoading, error };
}
