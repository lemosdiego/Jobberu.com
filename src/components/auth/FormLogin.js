"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import api from "@/services/api";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

export default function FormLogin() {
  const [formData, setFormData] = useState({
    email: "",
    senha: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { login } = useAuth();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect");

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
    setLoading(true);

    try {
      const response = await api.post("/usuario/login", formData);
      const { token, usuario } = response.data;

      // Usa a função do nosso AuthContext para gerenciar o estado
      login(usuario, token);

      // Redireciona para a URL de destino ou para o dashboard como padrão
      router.push(redirectUrl || "/dashboard");
    } catch (err) {
      console.error("Erro no login:", err);
      setError(
        err.response?.data?.error || "Ocorreu um erro. Tente novamente."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <h2 className="text-4xl font-bold uppercase mb-4">Acessar sua conta</h2>
      {error && <p className="text-red-500 text-center">{error}</p>}
      <div className="flex flex-col">
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Email
        </label>
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

      <div className="flex flex-col">
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

      <button
        type="submit"
        disabled={loading}
        className="mt-4 p-3 mb-3 bg-blue-500 hover:bg-blue-400 cursor-pointer rounded shadow"
      >
        {loading ? "Entrando..." : "Entrar"}
      </button>
      <div className="flex flex-col items-start gap-0.5">
        <p className="text-center text-lg">
          Não tem uma conta? Cadastre-se como
        </p>
        <Link
          href="/cadastro/cliente"
          className="font-medium text-xl text-blue-500 hover:text-blue-400"
        >
          Cliente
        </Link>
        <p>Ou</p>
        <Link
          href="/cadastro/prestador"
          className="font-medium text-xl text-blue-500 hover:text-blue-400"
        >
          Prestador
        </Link>
      </div>
    </form>
  );
}
