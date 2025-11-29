"use client";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";

export default function ProfileClientPage() {
  const { id } = useParams();
  const [usuarioCliente, setUsuarioCliente] = useState(null);

  useEffect(() => {
    const userLocal = localStorage.getItem("usuario");
    if (userLocal) {
      try {
        setUsuarioCliente(JSON.parse(userLocal));
      } catch {
        setUsuarioCliente(null);
      }
    }
  }, []);

  return (
    <h1>
      {usuarioCliente
        ? `Bem-vindo, ${usuarioCliente.nome} (ID da URL: ${id})`
        : "Carregando..."}
    </h1>
  );
}
