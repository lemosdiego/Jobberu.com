"use client";

import { useAuth } from "@/context/AuthContext";
import api from "@/services/api";
import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";

export function useLogin() {
  const [formData, setFormData] = useState({
    email: "",
    senha: "",
    telefone: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const { login } = useAuth();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect");

  // Pega o campo do formulário que foi mexido
  // e guarda o novo valor dentro de um objeto
  // com todos os dados do formulário, sem apagar o que já estava lá.
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await api.post("/auth/login", formData);
      const { token, usuario } = response.data;

      // Usa a função do nosso AuthContext para gerenciar o estado
      login(usuario, token);

      // Se houver uma URL de redirecionamento, usa ela.
      if (redirectUrl) {
        router.push(redirectUrl);
      } else {
        // Caso contrário, redireciona com base no tipo de usuário.
        const destination = usuario.is_prestador ? "/dashboard" : "/";
        router.push(destination);
      }
    } catch (err) {
      console.error("Erro no login", err);
      setError(
        err.response?.data?.message || "Ocorreu um erro durante o login."
      );
    } finally {
      setLoading(false);
    }
  };

  return {
    formData,
    error,
    loading,
    handleChange,
    handleSubmit,
  };
}
