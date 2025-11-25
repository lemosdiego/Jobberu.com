// app/dashboard-professional/[id]/page.js
"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function DashboardProfessionalPage() {
  const { id } = useParams();
  const [usuarioPrestador, setUsuarioPrestador] = useState(null);

  useEffect(() => {
    const userLocal = localStorage.getItem("usuario");
    if (userLocal) {
      setUsuarioPrestador(JSON.parse(userLocal));
    }
  }, []);

  return (
    <h1>
      {usuarioPrestador
        ? `Bem-vindo, ${usuarioPrestador.nome} (ID: ${id})`
        : "Carregando..."}
    </h1>
  );
}
