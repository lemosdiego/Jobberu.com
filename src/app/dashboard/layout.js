"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import "./dashboard.css";

export default function DashboardLayout({ children }) {
  const { user, isAuthenticated, isLoadingAuth, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Se a verificação de autenticação terminou e o usuário não está autenticado, redireciona.
    if (!isLoadingAuth && !isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, isLoadingAuth, router]);

  const handleLogout = () => {
    logout();
    // A rota já é protegida pelo useEffect, mas um push explícito garante a navegação imediata.
    router.push("/login");
  };

  // Mostra um estado de carregamento enquanto as informações do usuário não chegam.
  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <p className="text-lg">Carregando...</p>
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
    <div className="layout-dashboard_container">
      {/* Barra Lateral (Sidebar) */}
      <aside className="layout-dashboard_sidebar">
        <h2 className="layout-dashboard_sidebar-title">JobberU</h2>
        <nav className="layout-dashboard_sidebar-nav">
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
      <div className="layout-dashboard_content">
        {/* Cabeçalho Superior */}
        <header className="layout-dashboard_header">
          <span className="layout-dashboard_header-user">
            Olá, <strong>{user.nome}</strong>
          </span>
          <button
            onClick={handleLogout}
            className=" layout-dashboard_header-logout"
          >
            Sair
          </button>
        </header>

        {/* O conteúdo da página atual será renderizado aqui */}
        <main className="flex-1 p-8 layout-dashboard_content-main">
          {children}
        </main>
      </div>
    </div>
  );
}
