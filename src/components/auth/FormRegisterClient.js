"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/services/api";
import "./auth.css";

export default function FormRegisterClient() {
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
  });
  const [fotoPerfil, setFotoPerfil] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Se o campo for o de telefone, remove qualquer caractere não numérico
    if (name === "telefone") {
      const numericValue = value.replace(/\D/g, "");
      setFormData((prevState) => ({ ...prevState, [name]: numericValue }));
    } else {
      // Para todos os outros campos, o comportamento é o normal
      setFormData((prevState) => ({ ...prevState, [name]: value }));
    }
  };

  const handleFileChange = (e) => {
    setFotoPerfil(e.target.files[0]);
  };

  const handleCepBlur = async (e) => {
    const cep = e.target.value.replace(/\D/g, ""); // Remove caracteres não numéricos

    if (cep.length !== 8) {
      return; // CEP inválido
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

    // 1. Criar o objeto FormData (nossa "caixa de encomenda")
    const data = new FormData();

    // 2. Adicionar todos os campos de texto ao FormData
    for (const key in formData) {
      data.append(key, formData[key]);
    }
    data.append("is_prestador", false);

    // 3. Adicionar o arquivo de imagem, se ele foi selecionado
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

  return (
    <form onSubmit={handleSubmit}>
      <h2>Cadastro de Cliente</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}

      <div>
        <label htmlFor="nome">Nome Completo</label>
        <input
          type="text"
          id="nome"
          name="nome"
          value={formData.nome}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="senha">Senha</label>
        <input
          type="password"
          id="senha"
          name="senha"
          value={formData.senha}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="telefone">Telefone</label>
        <input
          type="tel"
          id="telefone"
          name="telefone"
          value={formData.telefone}
          onChange={handleChange}
          placeholder="(99) 99999-9999"
          required
        />
      </div>
      <div>
        <label htmlFor="cep">CEP</label>
        <input
          type="text"
          id="cep"
          name="cep"
          value={formData.cep}
          onChange={handleChange}
          onBlur={handleCepBlur} // Adicionamos o evento onBlur aqui
          required
        />
      </div>
      <div>
        <label htmlFor="foto_perfil">Foto de Perfil (Opcional)</label>
        <input
          type="file"
          id="foto_perfil"
          name="foto_perfil"
          onChange={handleFileChange}
        />
      </div>
      <div>
        <label htmlFor="logradouro">Logradouro</label>
        <input
          type="text"
          id="logradouro"
          name="logradouro"
          value={formData.logradouro}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="bairro">Bairro</label>
        <input
          type="text"
          id="bairro"
          name="bairro"
          value={formData.bairro}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="cidade">Cidade</label>
        <input
          type="text"
          id="cidade"
          name="cidade"
          value={formData.cidade}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="estado">Estado</label>
        <input
          type="text"
          id="estado"
          name="estado"
          value={formData.estado}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="numero">Número</label>
        <input
          type="text"
          id="numero"
          name="numero"
          value={formData.numero}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit" disabled={loading}>
        {loading ? "Cadastrando..." : "Cadastrar"}
      </button>
    </form>
  );
}
