"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/services/api";
import "./auth.css";

const profissoes = [
  "Jardineiro(a)",
  "Manicure e Pedicure",
  "Barbeiro(a)",
  "Profissional de Limpeza",
  "Eletricista",
  "Encanador(a)",
  "Pintor(a)",
  "Montador(a) de Móveis",
  "Personal Trainer",
  "Piscineiro(a)",
  "Professor(a) Particular",
  "Motorista",
  "Profissional de Fretes",
  "Pedreiro(a)",
  "Cabeleireiro(a)",
  "Dedetizador(a)",
  "Chaveiro(a)",
];

export default function FormRegisterPrestador() {
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

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <h2 className="text-4xl uppercase mb-4">
        Cadastro de Prestador de Serviço
      </h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}

      {/* Campos comuns */}
      <div className="flex flex-col gap-0.5">
        <label htmlFor="nome">Nome Completo</label>
        <input
          type="text"
          id="nome"
          name="nome"
          value={formData.nome}
          onChange={handleChange}
          required
          className="mt-1 p-3 border border-slate-300 outline-none rounded shadow"
        />
      </div>
      <div className="flex flex-col gap-0.5">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="mt-1 p-3 border border-slate-300 outline-none rounded shadow"
        />
      </div>
      <div className="flex flex-col gap-0.5">
        <label htmlFor="senha">Senha</label>
        <input
          type="password"
          id="senha"
          name="senha"
          value={formData.senha}
          onChange={handleChange}
          required
          className="mt-1 p-3 border border-slate-300 outline-none rounded shadow"
        />
      </div>
      <div className="flex flex-col gap-0.5">
        <label htmlFor="telefone">Telefone</label>
        <input
          type="tel"
          id="telefone"
          name="telefone"
          value={formData.telefone}
          onChange={handleChange}
          placeholder="(99) 99999-9999"
          required
          className="mt-1 p-3 border border-slate-300 outline-none rounded shadow"
        />
      </div>
      <div className="flex flex-col gap-0.5">
        <label htmlFor="foto_perfil">Foto de Perfil (Opcional)</label>
        <input
          type="file"
          id="foto_perfil"
          name="foto_perfil"
          onChange={handleFileChange}
          className="mt-1 p-3 border border-slate-300 outline-none rounded shadow"
        />
      </div>

      {/* Campos específicos do Prestador */}
      <div className="flex flex-col gap-0.5">
        <label htmlFor="titulo_profissional">Título Profissional</label>
        <select
          id="titulo_profissional"
          name="titulo_profissional"
          value={formData.titulo_profissional}
          onChange={handleChange}
          required
          className="mt-1 p-3 border border-slate-300 outline-none rounded shadow"
        >
          <option value="" disabled>
            Selecione sua profissão
          </option>
          {profissoes.map((profissao) => (
            <option key={profissao} value={profissao}>
              {profissao}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-col gap-0.5">
        <label htmlFor="biografia">
          Biografia (Fale um pouco sobre você e seu trabalho)
        </label>
        <textarea
          id="biografia"
          name="biografia"
          value={formData.biografia}
          onChange={handleChange}
          className="mt-1 p-3 border border-slate-300 outline-none rounded shadow resize-none h-40"
        />
      </div>
      <div className="flex flex-col gap-0.5">
        <label htmlFor="anos_experiencia">Anos de Experiência</label>
        <input
          type="number"
          id="anos_experiencia"
          name="anos_experiencia"
          value={formData.anos_experiencia}
          onChange={handleChange}
          className="mt-1 p-3 border border-slate-300 outline-none rounded shadow"
        />
      </div>

      {/* Campos de endereço */}
      <div className="flex flex-col gap-0.5">
        <label htmlFor="cep">CEP</label>
        <input
          type="text"
          id="cep"
          name="cep"
          value={formData.cep}
          onChange={handleChange}
          onBlur={handleCepBlur}
          required
          className="mt-1 p-3 border border-slate-300 outline-none rounded shadow"
        />
      </div>
      <div className="flex flex-col gap-0.5">
        <label htmlFor="logradouro">Logradouro</label>
        <input
          type="text"
          id="logradouro"
          name="logradouro"
          value={formData.logradouro}
          onChange={handleChange}
          required
          className="mt-1 p-3 border border-slate-300 outline-none rounded shadow"
        />
      </div>
      <div className="flex flex-col gap-0.5">
        <label htmlFor="bairro">Bairro</label>
        <input
          type="text"
          id="bairro"
          name="bairro"
          value={formData.bairro}
          onChange={handleChange}
          required
          className="mt-1 p-3 border border-slate-300 outline-none rounded shadow"
        />
      </div>
      <div className="flex flex-col gap-0.5">
        <label htmlFor="cidade">Cidade</label>
        <input
          type="text"
          id="cidade"
          name="cidade"
          value={formData.cidade}
          onChange={handleChange}
          required
          className="mt-1 p-3 border border-slate-300 outline-none rounded shadow"
        />
      </div>
      <div className="flex flex-col gap-0.5">
        <label htmlFor="estado">Estado</label>
        <input
          type="text"
          id="estado"
          name="estado"
          value={formData.estado}
          onChange={handleChange}
          required
          className="mt-1 p-3 border border-slate-300 outline-none rounded shadow"
        />
      </div>
      <div className="flex flex-col gap-0.5">
        <label htmlFor="numero">Número</label>
        <input
          type="text"
          id="numero"
          name="numero"
          value={formData.numero}
          onChange={handleChange}
          required
          className="mt-1 p-3 border border-slate-300 outline-none rounded shadow"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full mt-4 p-3 mb-4 bg-blue-500 hover:bg-blue-400 cursor-pointer rounded shadow"
      >
        {loading ? "Cadastrando..." : "Cadastrar como Prestador"}
      </button>
    </form>
  );
}
