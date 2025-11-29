"use client";
import { useState, useEffect } from "react";

export function useProfessionalData(professionalId = null) {
  const [data, setData] = useState(professionalId ? null : []);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    // Define a URL dinâmica: se tem professionalId, busca individual, senão lista tudo
    const url = professionalId
      ? `http://localhost:3000/usuario/${professionalId}`
      : "http://localhost:3000/usuario";

    fetch(url)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Erro ao buscar dados");
        }
        return res.json();
      })
      .then((result) => {
        setData(result);
      })
      .catch((err) => {
        setError(err.message || "Erro ao buscar dados");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [professionalId]);

  return { data, loading, error };
}
