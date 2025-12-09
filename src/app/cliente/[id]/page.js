"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios"; // Importa o axios diretamente
import { useAuth } from "@/context/AuthContext";
import api from "@/services/api";
import ProfileForm from "@/components/dashboard/ProfileForm";

export default function ClienteProfilePage() {
  const { user: loggedInUser, updateUser: updateAuthContext } = useAuth();
  const router = useRouter();
  const params = useParams();
  // const searchParams = useSearchParams(); // Hook para ler parâmetros da URL
  const userId = params.id;

  const [profileData, setProfileData] = useState(null);
  const [formData, setFormData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null); // Novo estado para o arquivo de foto
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  // Busca os dados do perfil do usuário assim que a página carrega
  useEffect(() => {
    if (userId) {
      const fetchProfileData = async () => {
        try {
          setLoading(true);
          const response = await api.get(`/usuario/${userId}`);
          setProfileData(response.data);
          setFormData(response.data); // Preenche o formulário com os dados iniciais
        } catch (err) {
          setError("Erro ao carregar os dados do perfil.");
          console.error(err);
        } finally {
          setLoading(false);
        }
      };
      fetchProfileData();
    }
  }, [userId]);

  // Função para lidar com a mudança nos inputs do formulário
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Função para buscar o CEP e autocompletar o endereço
  const handleCepBlur = async (e) => {
    const cep = e.target.value.replace(/\D/g, "");
    if (cep.length !== 8) return;

    try {
      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
      const data = response.data;

      if (!data.erro) {
        setFormData((prev) => ({
          ...prev,
          logradouro: data.logradouro,
          bairro: data.bairro,
          cidade: data.localidade,
          estado: data.uf,
        }));
      }
    } catch (error) {
      console.error("Erro ao buscar CEP:", error);
    }
  };

  // Função para lidar com a mudança do arquivo de foto
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  // Função para salvar as alterações do perfil
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage("");
    setError(null);

    // Lista de campos que podem ser atualizados pelo usuário
    const allowedFields = [
      "nome",
      "email",
      "telefone",
      "cep",
      "titulo_profissional",
      "biografia",
      "anos_experiencia",
      "complemento",
    ];

    const dataToSubmit = new FormData();

    // Adiciona apenas os campos permitidos ao FormData
    allowedFields.forEach((field) => {
      if (formData[field] !== null && formData[field] !== undefined) {
        dataToSubmit.append(field, formData[field]);
      }
    });

    // Adiciona o campo is_prestador se ele foi alterado
    if (formData.is_prestador) {
      dataToSubmit.append("is_prestador", formData.is_prestador);
    }

    // Adiciona o arquivo de foto se houver um selecionado
    if (selectedFile) {
      dataToSubmit.append("foto_perfil", selectedFile);
    }

    try {
      const response = await api.patch(
        `/usuario/atualizar/${userId}`,
        dataToSubmit
      );
      setProfileData(response.data); // Atualiza os dados exibidos
      setFormData(response.data); // Reseta o formulário com os novos dados
      updateAuthContext(response.data); // Atualiza o usuário no contexto de autenticação
      setSelectedFile(null); // Limpa o arquivo selecionado após o envio
      setIsEditing(false); // Sai do modo de edição
      setSuccessMessage("Perfil atualizado com sucesso!");
    } catch (err) {
      setError("Falha ao atualizar o perfil. Tente novamente.");
      console.error(err);
    }
  };

  // Função para o upgrade para prestador
  const handleUpgradeToPrestador = () => {
    const confirmation = window.confirm(
      "Deseja se tornar um prestador de serviços? Campos adicionais serão exibidos para você preencher."
    );
    if (confirmation) {
      setFormData((prev) => ({ ...prev, is_prestador: true }));
      setIsEditing(true);
      setSuccessMessage(
        "Preencha seus dados profissionais para se tornar um prestador!"
      );
    }
  };

  if (loading) return <p className="p-8">Carregando perfil...</p>;
  if (error) return <p className="p-8 text-red-500">{error}</p>;
  if (!profileData) return <p className="p-8">Perfil não encontrado.</p>;

  // Verifica se o usuário logado é o dono do perfil
  const isOwner = loggedInUser?.id === profileData.id;

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Perfil de {profileData.nome}</h1>

      {successMessage && (
        <div
          className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6"
          role="alert"
        >
          <p>{successMessage}</p>
        </div>
      )}

      <form onSubmit={handleFormSubmit}>
        <ProfileForm
          formData={formData}
          handleInputChange={handleInputChange}
          handleCepBlur={handleCepBlur}
          handleFileChange={handleFileChange} // Passa a nova prop
          isEditing={isEditing}
        />

        {/* Link para se tornar prestador */}
        {isOwner && !profileData.is_prestador && !isEditing && (
          <div className="mt-8 text-center">
            <button
              type="button"
              onClick={handleUpgradeToPrestador}
              className="text-blue-600 hover:underline"
            >
              Deseja atualizar seu perfil e se tornar um prestador?
            </button>
          </div>
        )}

        <div className="mt-8 flex flex-col sm:flex-row justify-end items-center space-y-4 sm:space-y-0 sm:space-x-4">
          {/* Botões de Ação para o dono do perfil */}
          {isOwner && (
            <>
              {isEditing ? (
                <>
                  <button
                    type="button"
                    onClick={() => {
                      setIsEditing(false);
                      setFormData(profileData); // Restaura os dados originais
                    }}
                    className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    Salvar Alterações
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Editar Perfil
                </button>
              )}
            </>
          )}
        </div>
      </form>
    </div>
  );
}
