"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import api from "@/services/api";
import { FaPlusCircle } from "react-icons/fa";
import ServiceForm from "./ServiceForm";
import ServiceList from "./ServiceList";

export default function ServicosPage() {
  const { user, isLoadingAuth } = useAuth();
  const router = useRouter();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Estado para controlar a visão: 'list', 'create', 'edit'
  const [view, setView] = useState("list");
  const [currentService, setCurrentService] = useState(null);

  const fetchServices = useCallback(async () => {
    if (user?.id && user.is_prestador) {
      try {
        setLoading(true);
        const response = await api.get(`/usuario/${user.id}/servicos`);
        setServices(response.data);
        setError(null);
      } catch (err) {
        console.error("Erro ao buscar serviços:", err);
        setError(
          "Não foi possível carregar seus serviços. Tente novamente mais tarde."
        );
      } finally {
        setLoading(false);
      }
    }
  }, [user]);

  useEffect(() => {
    // Aguarda o contexto de autenticação terminar de carregar
    if (isLoadingAuth) {
      return;
    }

    if (user) {
      if (user.is_prestador) {
        fetchServices();
      } else {
        setLoading(false);
        setError("Esta área é exclusiva para prestadores de serviços.");
      }
    } else {
      // Se não há usuário e a autenticação já foi verificada, o usuário não está logado.
      setLoading(false);
      router.push("/login"); // Redireciona para o login se não estiver autenticado
    }
  }, [user, isLoadingAuth, fetchServices, router]);

  const handleShowCreateForm = () => {
    setCurrentService(null);
    setView("create");
  };

  const handleShowEditForm = (service) => {
    setCurrentService(service);
    setView("edit");
  };

  const handleBackToList = () => {
    setCurrentService(null);
    setView("list");
  };

  const handleSaveService = async (formData) => {
    try {
      const data = new FormData();

      // Adiciona os campos de texto ao FormData, garantindo que não sejam nulos ou indefinidos
      Object.keys(formData).forEach((key) => {
        if (
          key !== "imagens" &&
          formData[key] != null &&
          formData[key] !== ""
        ) {
          data.append(key, formData[key]);
        }
      });

      // Adiciona os arquivos de imagem, se existirem
      if (formData.imagens && formData.imagens.length > 0) {
        Array.from(formData.imagens).forEach((file) => {
          data.append("imagens", file);
        });
      }

      // Adiciona a lista de imagens a serem removidas, se houver
      if (formData.imagens_a_remover && formData.imagens_a_remover.length > 0) {
        formData.imagens_a_remover.forEach((url) => {
          data.append("imagens_a_remover", url);
        });
      }

      if (currentService) {
        // Atualização (PATCH) - Sempre usando FormData
        await api.patch(`/servico/atualizar/${currentService.id}`, data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        // Criação (POST) - Sempre usando FormData
        await api.post("/servico/create", data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      await fetchServices();
      handleBackToList();
      return { success: true };
    } catch (err) {
      console.error("Erro ao salvar serviço:", err);
      const errorMessage =
        err.response?.data?.mensagem ||
        err.response?.data?.message ||
        "Ocorreu um erro. Verifique os dados e tente novamente.";
      return { success: false, error: errorMessage };
    }
  };

  const handleDeleteService = async (serviceId) => {
    if (
      window.confirm(
        "Tem certeza que deseja excluir este serviço? Esta ação não pode ser desfeita."
      )
    ) {
      try {
        await api.delete(`/servico/excluir/${serviceId}`);
        setError(null); // Limpa erros anteriores
        // Filtra o serviço excluído do estado local para uma atualização de UI mais rápida
        setServices((prevServices) =>
          prevServices.filter((s) => s.id !== serviceId)
        );
      } catch (err) {
        console.error("Erro ao excluir serviço:", err);
        const errorMessage =
          err.response?.data?.message ||
          "Falha ao excluir o serviço. Tente novamente.";
        setError(errorMessage);
      }
    }
  };

  if (isLoadingAuth || loading) {
    return <div className="p-8 text-center">Carregando...</div>;
  }

  if (!user || !user.is_prestador) {
    return (
      <div className="p-8 text-center text-red-600">
        <h1 className="text-2xl font-bold mb-4">Acesso Negado</h1>
        <p>
          {error ||
            "Você precisa estar logado e ser um prestador de serviços para acessar esta página."}
        </p>
      </div>
    );
  }

  // Renderiza o formulário se a view for 'create' ou 'edit'
  if (view === "create" || view === "edit") {
    return (
      <ServiceForm
        service={currentService}
        onSave={handleSaveService}
        onCancel={handleBackToList}
      />
    );
  }

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-4">Gerenciar Serviços</h1>
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
          Meus Serviços
        </h1>
        <button
          onClick={handleShowCreateForm}
          className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
        >
          <FaPlusCircle size={20} />
          Adicionar Serviço
        </button>
      </header>

      {error && (
        <p className="text-red-500 bg-red-100 p-3 rounded-md mb-4">{error}</p>
      )}

      <ServiceList
        services={services}
        onEdit={handleShowEditForm}
        onDelete={handleDeleteService}
      />
    </main>
  );
}
