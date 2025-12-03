"use client";

import { useAuth } from "@/context/AuthContext";

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Painel Principal</h1>
      <p>Bem-vindo ao seu painel, {user?.nome}!</p>
      <div className="mt-8 p-6 bg-white rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Resumo</h2>
        {/* Aqui podemos adicionar widgets e resumos no futuro */}
        <p>Em breve, você verá um resumo de suas atividades aqui.</p>
      </div>
    </div>
  );
}
