import { useState } from "react";
import api from "@/services/api";

export function usePasswordRecovery() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const sendRecoveryLink = async (email) => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      await api.post("/usuario/recuperar-senha", { email });
      setSuccess(true);
    } catch (err) {
      setError(
        err.response?.data?.message || "Erro ao enviar link de recuperação.",
      );
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (token, newPassword) => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      await api.post("/usuario/redefinir-senha", { token, newPassword });
      setSuccess(true);
    } catch (err) {
      setError(err.response?.data?.message || "Erro ao redefinir senha.");
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    success,
    sendRecoveryLink,
    resetPassword,
  };
}
