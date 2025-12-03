"use client";

import { useAuth } from "@/context/AuthContext";

export default function ConfiguracoesPage() {
  const { user } = useAuth();

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-4">Configurações da Conta</h1>
      <p>Aqui você poderá editar suas informações de perfil.</p>
      {/* Formulário de edição virá aqui no futuro */}
    </main>
  );
}
