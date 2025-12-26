"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import api from "@/services/api";

export function useRegisterPrestador() {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    senha: "",
    telefone: "",
    cep: "",
    logradouro: "",
    bairro: "",
    cidade: "",
    estado: "",
    numero: "",
    // Campos específicos do Prestador
    titulo_profissional: "",
    biografia: "",
    anos_experiencia: "",
    links_redes_sociais: "",
  });
  const [fotoPerfil, setFotoPerfil] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Remove qualquer caractere que não seja número para telefone
    if (name === "telefone") {
      const numericValue = value.replace(/\D/g, "");
      setFormData((prevState) => ({ ...prevState, [name]: numericValue }));
    } else {
      // Comportamento normal para os demais campos
      setFormData((prevState) => ({ ...prevState, [name]: value }));
    }
  };

  const handleFileChange = (e) => {
    setFotoPerfil(e.target.files[0]);
  };

  const handleCepBlur = async (e) => {
    const cep = e.target.value.replace(/\D/g, "");

    if (cep.length !== 8) {
      return;
    }

    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();

      if (!data.erro) {
        setFormData((prevState) => ({
          ...prevState,
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    // --- VALIDAÇÃO NO FRONTEND ---
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Por favor, insira um e-mail válido.");
      setLoading(false);
      return;
    }

    const phoneRegex = /^\d{10,11}$/; // Regex simples para 10 ou 11 dígitos
    if (!phoneRegex.test(formData.telefone.replace(/\D/g, ""))) {
      setError(
        "Por favor, insira um telefone válido com DDD (apenas números)."
      );
      setLoading(false);
      return;
    }

    const data = new FormData();

    for (const key in formData) {
      data.append(key, formData[key]);
    }
    // A principal diferença: enviamos 'true' para a API
    data.append("is_prestador", true);

    if (fotoPerfil) {
      data.append("foto_perfil", fotoPerfil);
    }

    try {
      await api.post("/usuario/create", data);

      setSuccess(
        "Cadastro realizado com sucesso! Redirecionando para o login..."
      );
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch (err) {
      console.error("Erro no cadastro:", err);
      setError(
        err.response?.data?.error || "Ocorreu um erro. Tente novamente."
      );
    } finally {
      setLoading(false);
    }
  };

  return {
    formData,
    fotoPerfil,
    loading,
    error,
    success,
    termsAccepted,
    handleChange,
    handleFileChange,
    handleCepBlur,
    handleSubmit,
    setTermsAccepted,
  };
}
