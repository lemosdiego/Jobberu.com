"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import api from "@/services/api";
import PrestadorForm from "@/components/dashboard/PrestadorForm";
import Image from "next/image";
import { FaPen } from "react-icons/fa";

export default function ConfiguracoesPage() {
  const {
    user: loggedInUser,
    updateUser: updateAuthContext,
    isLoadingAuth,
  } = useAuth();

  const [formData, setFormData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  // Popula o formulário com os dados do usuário logado
  useEffect(() => {
    if (loggedInUser) {
      setFormData(loggedInUser);
      setLoading(false);
    } else if (!isLoadingAuth) {
      // Se não está carregando e não tem usuário, mostra erro.
      setLoading(false);
      setError("Usuário não encontrado. Faça login novamente.");
    }
  }, [loggedInUser, isLoadingAuth]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCepBlur = async (e) => {
    const cep = e.target.value.replace(/\D/g, "");
    if (cep.length !== 8) return;

    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();
      if (!data.erro) {
        setFormData((prev) => ({
          ...prev,
          cidade: data.localidade,
          estado: data.uf,
        }));
      }
    } catch (error) {
      console.error("Erro ao buscar CEP:", error);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage("");
    setError(null);

    const dataToSubmit = new FormData();
    const allowedFields = [
      "nome",
      "email",
      "telefone",
      "cep",
      "titulo_profissional",
      "biografia",
    ];

    allowedFields.forEach((field) => {
      if (formData[field] !== null && formData[field] !== undefined) {
        dataToSubmit.append(field, formData[field]);
      }
    });

    if (selectedFile) {
      dataToSubmit.append("foto_perfil", selectedFile);
    }

    try {
      const response = await api.patch(
        `/usuario/atualizar/${loggedInUser.id}`,
        dataToSubmit,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      updateAuthContext(response.data); // Atualiza o usuário no contexto global
      setFormData(response.data); // Atualiza o estado local do formulário
      setSelectedFile(null);
      setIsEditing(false);
      setSuccessMessage("Perfil atualizado com sucesso!");
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        "Falha ao atualizar o perfil. Tente novamente.";
      setError(errorMessage);
      console.error(err);
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setFormData(loggedInUser); // Restaura os dados originais
    setSelectedFile(null);
    setError(null);
    setSuccessMessage("");
  };

  if (loading || isLoadingAuth)
    return <div className="p-8 text-center">Carregando...</div>;
  if (error) return <p className="p-8 text-center text-red-500">{error}</p>;

  return (
    <main className="p-4 md:p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6 md:p-8">
        <header className="flex flex-col sm:flex-row items-center gap-6 mb-8">
          <div className="relative w-32 h-32">
            <Image
              src={
                selectedFile
                  ? URL.createObjectURL(selectedFile)
                  : formData.foto_perfil_url || "/default-avatar.png"
              }
              alt="Foto de Perfil"
              layout="fill"
              objectFit="cover"
              className="rounded-full"
            />
            {isEditing && (
              <label
                htmlFor="foto_perfil"
                className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full cursor-pointer hover:bg-blue-700 transition-colors"
              >
                <FaPen size={16} />
                <input
                  type="file"
                  name="foto_perfil"
                  id="foto_perfil"
                  onChange={handleFileChange}
                  className="hidden"
                  accept="image/png, image/jpeg, image/jpg"
                />
              </label>
            )}
          </div>
          <div className="text-center sm:text-left">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
              {formData.nome}
            </h1>
            <p className="text-gray-600">
              {formData.titulo_profissional || "Prestador de Serviços"}
            </p>
          </div>
        </header>

        {successMessage && (
          <div
            className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6"
            role="alert"
          >
            <p>{successMessage}</p>
          </div>
        )}

        <form onSubmit={handleFormSubmit}>
          <PrestadorForm
            formData={formData}
            handleInputChange={handleInputChange}
            handleCepBlur={handleCepBlur}
            isEditing={isEditing}
          />

          <div className="mt-8 pt-6 border-t border-gray-200 flex justify-end gap-4">
            {isEditing ? (
              <>
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="bg-gray-200 text-gray-800 font-semibold py-2 px-6 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Salvar Alterações
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Editar Informações
              </button>
            )}
          </div>
        </form>
      </div>
    </main>
  );
}
