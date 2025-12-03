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
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-2xl font-bold text-center">Acessar sua conta</h2>
      {error && <p className="text-red-500 text-center">{error}</p>}

      <div>
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
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
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
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
      >
        {loading ? "Entrando..." : "Entrar"}
      </button>
      <p className="text-center text-sm">
        Não tem uma conta?{" "}
        <Link
          href="/cadastro/cliente"
          className="font-medium text-indigo-600 hover:text-indigo-500"
        >
          Cadastre-se
        </Link>
      </p>
    </form>
  );
}
