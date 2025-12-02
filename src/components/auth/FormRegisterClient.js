"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/services/api";

export default function FormRegisterClient() {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    senha: "",
    telefone: "",
    cep: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const dataToSubmit = {
        ...formData,
        is_prestador: false, // Definindo que é um cadastro de cliente
      };

      await api.post("/usuario/create", dataToSubmit);

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
          required
        />
      </div>
      <button type="submit">Cadastrar</button>
    </form>
  );
}
