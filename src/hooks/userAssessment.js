import api from "@/services/api";
import { useState, useEffect } from "react";

export default function useAssessment(prestadorId) {
  const [podeAvaliar, setPodeAvaliar] = useState(false);
  const [registroId, setRegistroId] = useState(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    // Se não tiver ID (ex: perfil carregando), não faz nada
    if (!prestadorId) return;

    const verificarDisponibilidade = async () => {
      try {
        setCarregando(true);
        // Chama o controller que criamos no backend
        const response = await api.get(
          `/avaliacao/verificar?prestadorId=${prestadorId}`
        );

        if (response.data.disponivel) {
          setPodeAvaliar(true);
          setRegistroId(response.data.registroId);
        } else {
          setPodeAvaliar(false);
          setRegistroId(null);
        }
      } catch (error) {
        console.error("Erro ao verificar disponibilidade de avaliação:", error);
        // Em caso de erro, assumimos que não pode avaliar por segurança
        setPodeAvaliar(false);
      } finally {
        setCarregando(false);
      }
    };

    verificarDisponibilidade();
  }, [prestadorId]); // Re-executa se o ID do prestador mudar

  return { podeAvaliar, registroId, carregando };
}
