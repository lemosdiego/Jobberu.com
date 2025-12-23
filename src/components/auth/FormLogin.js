"use client";

import Link from "next/link";
import "./Auth.css";
import { useLogin } from "@/hooks/useLogin"; // ajuste o path conforme sua estrutura

export default function FormLogin() {
  const { formData, error, loading, handleChange, handleSubmit } = useLogin();

  return (
    <form onSubmit={handleSubmit} className="form-login">
      <div className="form-register_container-title">
        <h2 className="form-login_title">Acessar sua conta</h2>
      </div>

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
        <label htmlFor="senha" className="form-login_label">
          Senha
        </label>
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
