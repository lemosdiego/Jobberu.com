"use client";

import { useState } from "react";
import { usePasswordRecovery } from "@/hooks/usePasswordRecovery";

export default function ForgotMyPassword() {
  const [email, setEmail] = useState("");
  const { loading, error, success, sendRecoveryLink } = usePasswordRecovery();

  const handleSubmit = (e) => {
    e.preventDefault();
    sendRecoveryLink(email);
  };

  return (
    <main>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Digite seu e-mail"
          required
        />
        <button disabled={loading}>
          {loading ? "Enviando..." : "Enviar link de recuperação"}
        </button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && (
        <p style={{ color: "green" }}>Link enviado! Verifique seu e-mail.</p>
      )}
    </main>
  );
}
