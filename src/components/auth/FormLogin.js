"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import api from "@/services/api";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import "./Auth.css";

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

      // Se houver uma URL de redirecionamento, usa ela.
      if (redirectUrl) {
        router.push(redirectUrl);
      } else {
        // Caso contrário, redireciona com base no tipo de usuário.
        const destination = usuario.is_prestador ? "/dashboard" : "/";
        router.push(destination);
      }
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
    <form onSubmit={handleSubmit} className="form-login">
      <h2 className="form-login_title">Acessar sua conta</h2>
      {error && <p className="form-login_error">{error}</p>}
      <div className="flex flex-col">
        <label htmlFor="email" className="form-login_label">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="form-login_input"
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
          className="form-login_input"
        />
      </div>

      <button type="submit" disabled={loading} className="form-login_button">
        {loading ? "Entrando..." : "Entrar"}
      </button>
      <div className="form-login_register">
        <p className="form-login_register_text">
          Não tem uma conta? Cadastre-se como
        </p>
        <Link href="/cadastro/cliente" className="form-login_register_link">
          Cliente
        </Link>
        <p>Ou</p>
        <Link href="/cadastro/prestador" className="form-login_register_link">
          Prestador
        </Link>
      </div>
    </form>
  );
}
