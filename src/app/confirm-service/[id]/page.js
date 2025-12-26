"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import api from "@/services/api";
import {
  FaCheckCircle,
  FaTimesCircle,
  FaUserTie,
  FaSpinner,
} from "react-icons/fa";
import "../../dashboard/confirmar-servico.css";

export default function PaginaConfirmacaoServico() {
  const { id } = useParams(); // Pega o ID do serviço da URL
  const router = useRouter();
  const { isAuthenticated, isLoadingAuth } = useAuth();

  const [isProcessing, setIsProcessing] = useState(false);
  const [providerDetails, setProviderDetails] = useState(null);
  const [pageStatus, setPageStatus] = useState("PENDING"); // PENDING, SUCCESS, REJECTED, ERROR
  const [error, setError] = useState("");

  useEffect(() => {
    // 1. VERIFICA SE O CLIENTE ESTÁ LOGADO
    if (!isLoadingAuth && !isAuthenticated) {
      // Se não estiver logado, guarda a página atual e redireciona para o login
      const returnUrl = encodeURIComponent(`/confirmar-servico/${id}`);
      router.push(`/login?redirect=${returnUrl}`);
      return;
    }

    // 2. SE ESTIVER LOGADO, BUSCA OS DETALHES DO SERVIÇO
    const fetchServiceDetails = async () => {
      if (isAuthenticated && id) {
        try {
          const response = await api.get(`/registro-servico/${id}/detalhes`);
          setProviderDetails(response.data.prestador);
        } catch (error) {
          console.error("Erro ao buscar detalhes do serviço:", error);
          setError("Não foi possível carregar os detalhes do serviço.");
          setPageStatus("ERROR");
        }
      }
    };

    if (isAuthenticated) {
      fetchServiceDetails();
    }
  }, [isAuthenticated, isLoadingAuth, id, router]);

  // 3. FUNÇÃO PARA RESPONDER (CONFIRMAR OU RECUSAR)
  const handleResponse = async (resposta) => {
    setIsProcessing(true);
    setError("");
    try {
      // Envia para a API a resposta do cliente
      await api.patch(`/registro-servico/${id}/responder`, {
        resposta: resposta, // "CONCLUIDO" ou "RECUSADO"
      });
      // Muda o status da página para mostrar a tela de sucesso/recusa
      setPageStatus(resposta === "CONCLUIDO" ? "SUCCESS" : "REJECTED");
    } catch (err) {
      console.error("Erro ao responder:", err);
      setError(
        err.response?.data?.error || "Ocorreu um erro. Tente novamente."
      );
      setPageStatus("ERROR");
    } finally {
      setIsProcessing(false);
    }
  };

  // Tela de Carregamento
  if (
    isLoadingAuth ||
    (isAuthenticated && !providerDetails && pageStatus === "PENDING")
  ) {
    return (
      <main className="confirmation-page">
        <div className="confirmation-card">
          <FaSpinner className="animate-spin text-4xl text-blue-600 mb-4" />
          <p className="text-gray-600">Carregando detalhes da confirmação...</p>
        </div>
      </main>
    );
  }

  // Telas de Resultado (Sucesso ou Recusado)
  if (pageStatus === "SUCCESS" || pageStatus === "REJECTED") {
    return (
      <main className="confirmation-page">
        <div className="confirmation-card">
          {pageStatus === "SUCCESS" ? (
            <>
              <FaCheckCircle className="icon-success" />
              <h1>Obrigado por confirmar!</h1>
              <p>O serviço foi marcado como concluído com sucesso.</p>
            </>
          ) : (
            <>
              <FaTimesCircle className="icon-rejected" />
              <h1>Solicitação Recusada</h1>
              <p>
                Agradecemos seu feedback. O serviço foi marcado como não
                concluído.
              </p>
            </>
          )}
          <button onClick={() => router.push("/")} className="btn-home">
            Voltar para a Home
          </button>
        </div>
      </main>
    );
  }

  // Tela Principal com os Botões de Ação
  return (
    <main className="confirmation-page">
      <div className="confirmation-card">
        <h1 className="confirmation-title">Confirmação de Serviço</h1>
        <div className="provider-info">
          <div className="provider-avatar">
            <FaUserTie />
          </div>
          <p>
            O prestador <strong>{providerDetails?.nome || "..."}</strong>{" "}
            indicou que concluiu um serviço para você.
          </p>
        </div>
        <p className="confirmation-question">
          Você confirma a realização deste serviço?
        </p>
        <div className="confirmation-actions">
          <button
            onClick={() => handleResponse("CONCLUIDO")}
            disabled={isProcessing}
            className="btn-confirm"
          >
            {isProcessing ? "Processando..." : "Sim, Confirmar Serviço"}
          </button>
          <button
            onClick={() => handleResponse("RECUSADO")}
            disabled={isProcessing}
            className="btn-reject"
          >
            Não, Recusar
          </button>
        </div>
        {error && <p className="error-msg">{error}</p>}
      </div>
    </main>
  );
}
