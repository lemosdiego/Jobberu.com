"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import api from "@/services/api";
import ProfileForm from "@/components/dashboard/ProfileForm";
import "../../../components/dashboard/ProfileCllient.css";
import Image from "next/image";

export default function ClienteProfilePage() {
  const { user: loggedInUser, updateUser: updateAuthContext } = useAuth();
  const router = useRouter();
  const params = useParams();
  const userId = params.id;

  const [profileData, setProfileData] = useState(null);
  const [formData, setFormData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null); // Novo estado para o arquivo de foto
  const [loading, setLoading] = useState(true);
  const [fileError, setFileError] = useState(""); // Estado para erro de arquivo
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
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();

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
    const file = e.target.files[0];
    if (!file) return;

    // Validação de tamanho do arquivo (máximo 3MB)
    const maxSize = 3 * 1024 * 1024; // 3MB em bytes
    if (file.size > maxSize) {
      setFileError("O arquivo é muito grande. O tamanho máximo é 3MB.");
      setSelectedFile(null);
      e.target.value = ""; // Limpa o input de arquivo
      return;
    }

    setFileError(""); // Limpa o erro se o arquivo for válido
    setSelectedFile(file);
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
    <main className="page-client-profile ">
      <div className="page-client-profile_container">
        <header className="page-client-profile_header">
          <div className="relative page-client-profile_avatar">
            <div className="page-client-profile_avatar-container">
              <Image
                // Mostra a preview do arquivo selecionado ou a foto atual
                src={
                  selectedFile
                    ? URL.createObjectURL(selectedFile)
                    : profileData.foto_perfil_url || "/default-avatar.png"
                }
                alt="Foto de Perfil"
                layout="fill"
                objectFit="cover"
              />
            </div>
            {isEditing && (
              <label
                htmlFor="foto_perfil"
                className="page-client-profile_avatar-label"
              >
                {/* Ícone de lápis para edição */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                  <path
                    fillRule="evenodd"
                    d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                    clipRule="evenodd"
                  />
                </svg>
                <input
                  type="file"
                  name="foto_perfil"
                  id="foto_perfil"
                  onChange={handleFileChange}
                  disabled={!isEditing}
                  className="hidden"
                  accept="image/png, image/jpeg, image/jpg"
                />
              </label>
            )}
          </div>
          <div className="page-client-profile_container-title">
            <h1 className="page-client-profile_title">{profileData.nome}</h1>
            {fileError && (
              <p className="page-client-profile_error">{fileError}</p>
            )}
          </div>
        </header>
        {successMessage && (
          <div className="" role="alert page-client-profile-container_success">
            <p>{successMessage}</p>
          </div>
        )}
        <form onSubmit={handleFormSubmit} className="page-client-profile_form">
          <ProfileForm
            formData={formData}
            handleInputChange={handleInputChange}
            handleCepBlur={handleCepBlur} // A busca de CEP continua aqui
            handleFileChange={handleFileChange} // Passa a nova prop
            isEditing={isEditing}
          />

          {/* Link para se tornar prestador */}
          {isOwner && !profileData.is_prestador && !isEditing && (
            <div className=" page-client-profile_link-prestador">
              <button
                type="button"
                onClick={handleUpgradeToPrestador}
                className="page-client-profile_link-prestador-button"
              >
                Deseja atualizar seu perfil e se tornar um prestador?
              </button>
            </div>
          )}

          <div className="page-client-profile-buttons">
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
                      className=" page-client-profile-buttons-cancel"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className=" page-client-profile-buttons-save"
                    >
                      Salvar Alterações
                    </button>
                  </>
                ) : (
                  <button
                    type="button"
                    onClick={() => setIsEditing(true)}
                    className="page-client-profile-buttons-edit"
                  >
                    Editar Perfil
                  </button>
                )}
              </>
            )}
          </div>
        </form>
      </div>
    </main>
  );
}
