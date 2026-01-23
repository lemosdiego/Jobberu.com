"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { usePasswordRecovery } from "@/hooks/usePasswordRecovery";

export default function RecoverMyPassword() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [token, setToken] = useState(null);

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [validationError, setValidationError] = useState("");

  const { loading, error, success, resetPassword } = usePasswordRecovery();

  useEffect(() => {
    const tokenParam = searchParams.get("token");
    if (tokenParam) {
      setToken(tokenParam);
      // Remove o token da URL visualmente sem recarregar a página
      window.history.replaceState(null, "", window.location.pathname);
    }
  }, [searchParams]);

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        router.push("/login");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [success, router]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setValidationError("");

    if (newPassword !== confirmPassword) {
      setValidationError("As senhas não coincidem.");
      return;
    }

    if (!token) {
      setValidationError(
        "Token inválido ou ausente. Por favor, solicite um novo link.",
      );
      return;
    }

    resetPassword(token, newPassword);
  };

  if (success) {
    return (
      <main>
        <p style={{ color: "green" }}>
          Senha redefinida com sucesso! Redirecionando para o login...
        </p>
        <button onClick={() => router.push("/login")}>Ir para Login</button>
      </main>
    );
  }

  return (
    <main>
      <h1>Redefinir Senha</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="Nova Senha"
          required
        />
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirmar Senha"
          required
        />
        <button disabled={loading}>
          {loading ? "Redefinindo..." : "Redefinir Senha"}
        </button>
      </form>
      {validationError && <p style={{ color: "red" }}>{validationError}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </main>
  );
}
