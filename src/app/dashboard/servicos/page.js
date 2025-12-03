"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ServicosPage() {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Proteção de rota: se o usuário carregou e não é prestador, redireciona.
    if (user && !user.is_prestador) {
      router.push("/dashboard");
    }
  }, [user, router]);

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-4">Gerenciar Serviços</h1>
      <p>Esta área é exclusiva para prestadores de serviço.</p>
      <p>Aqui você poderá criar, editar e excluir seus serviços.</p>
      {/* O CRUD de serviços virá aqui no futuro */}
    </main>
  );
}
