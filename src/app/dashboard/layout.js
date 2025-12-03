"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";

export default function DashboardLayout({ children }) {
  const { user, isAuthenticated, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Centralizando a proteção de rota: se não estiver autenticado, vai para o login.
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  // Mostra um estado de carregamento enquanto as informações do usuário não chegam.
  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <p className="text-lg">Carregando painel...</p>
      </div>
    );
  }

  // Função para aplicar classes CSS se o link estiver ativo
  const getLinkClassName = (path) => {
    return pathname === path
      ? "block px-4 py-2 text-white bg-blue-600 rounded"
      : "block px-4 py-2 text-gray-700 rounded hover:bg-gray-200";
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Barra Lateral (Sidebar) */}
      <aside className="w-64 bg-white p-6 border-r">
        <h2 className="text-2xl font-bold mb-8 text-blue-700">JobberU</h2>
        <nav className="space-y-2">
          <Link href="/dashboard" className={getLinkClassName("/dashboard")}>
            Início
          </Link>
          <Link
            href="/dashboard/configuracoes"
            className={getLinkClassName("/dashboard/configuracoes")}
          >
            Configurações
          </Link>

          {/* Link condicional para Prestadores */}
          {user.is_prestador && (
            <Link
              href="/dashboard/servicos"
              className={getLinkClassName("/dashboard/servicos")}
            >
              Meus Serviços
            </Link>
          )}
        </nav>
      </aside>

      {/* Conteúdo Principal */}
      <div className="flex-1 flex flex-col">
        {/* Cabeçalho Superior */}
        <header className="flex justify-end items-center p-4 bg-white border-b">
          <span className="mr-4">
            Olá, <strong>{user.nome}</strong>
          </span>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Sair
          </button>
        </header>

        {/* O conteúdo da página atual será renderizado aqui */}
        <main className="flex-1 p-8">{children}</main>
      </div>
    </div>
  );
}
