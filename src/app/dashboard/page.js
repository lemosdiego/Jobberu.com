"use client";

import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { FaWrench, FaBriefcase, FaUser, FaLightbulb } from "react-icons/fa";
import "./dashboard.css";
import ServiceConfirmationRequest from "@/components/sections/ServiceConfirmationRequest/ServiceConfirmationRequest";

// Helper para criar um slug a partir do nome do usuário
const slugify = (text) => {
  if (!text) return "";
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-") // Substitui espaços por -
    .replace(/[^\w\-]+/g, "") // Remove caracteres inválidos
    .replace(/\-\-+/g, "-") // Substitui múltiplos - por um único -
    .replace(/^-+/, "") // Remove hífens do início
    .replace(/-+$/, ""); // Remove hífens do final
};

export default function DashboardPage() {
  const { user, isLoadingAuth } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Se a autenticação já foi verificada e o usuário não é um prestador, redireciona.
    if (!isLoadingAuth && (!user || !user.is_prestador)) {
      router.push("/");
    }
  }, [user, isLoadingAuth, router]);

  // Mostra um loader enquanto o usuário está sendo carregado
  if (isLoadingAuth || !user) {
    return <div className="p-8 text-center">Carregando seu painel...</div>;
  }

  // Se por algum motivo o usuário não for prestador, mostra uma mensagem (o useEffect já deve ter redirecionado)
  if (!user.is_prestador) {
    return (
      <div className="p-8 text-center text-red-600">
        Acesso negado. Esta área é exclusiva para prestadores.
      </div>
    );
  }

  const profileUrl = `/perfil/${slugify(user.nome)}-${user.id}`;

  return (
    <main className="page-dashboard">
      <div className="page-dashboard_container">
        <header className="page-dashboard_header">
          <h1 className=" page-dashboard_header-title">
            Olá, {user.nome.split(" ")[0]}!
          </h1>
          <p className="text-lg text-gray-600 mt-1">
            Bem-vindo(a) ao seu painel de controle.
          </p>
        </header>

        {/* Componente de Aperto de Mão Digital */}
        <ServiceConfirmationRequest />

        {/* Seção de Ações Rápidas */}
        <section className="page-dashboard_actions">
          <Link href="/dashboard/servicos" className="dashboard-card">
            <FaBriefcase className="text-blue-500  page-dashboard_actions-icon" />
            <h2 className=" page-dashboard_actions-title">Meus Serviços</h2>
            <p className=" page-dashboard_actions-description">
              Crie, edite e gerencie os serviços que você oferece.
            </p>
          </Link>

          <Link href="/dashboard/configuracoes" className="dashboard-card">
            <FaWrench className="text-green-500 page-dashboard_actions-icon" />
            <h2 className="page-dashboard_actions-title">Configurações</h2>
            <p className="page-dashboard_actions-description">
              Atualize suas informações de perfil, foto e contato.
            </p>
          </Link>

          <Link href={profileUrl} className="dashboard-card">
            <FaUser className="page-dashboard_actions-icon text-purple-500 " />
            <h2 className="page-dashboard_actions-title">Ver Perfil Público</h2>
            <p className="page-dashboard_actions-description">
              Veja como os clientes visualizam seu perfil na plataforma.
            </p>
          </Link>
        </section>

        {/* Seção de Dicas */}
        <section className="page-dashboard_info">
          <h3 className="page-dashboard_info-title">
            <FaLightbulb className="text-yellow-400" />
            Dicas para o Sucesso
          </h3>
          <div className="page-dashboard_info-container-description">
            <p className="page-dashboard_info-description">
              <strong>Fotos de Qualidade:</strong> Adicione imagens nítidas e
              profissionais aos seus serviços. Isso aumenta a confiança do
              cliente e a chance de contratação.
            </p>
            <p className="page-dashboard_info-description">
              <strong>Perfil Completo:</strong> Um perfil com biografia
              detalhada e título profissional claro atrai mais olhares. Vá em{" "}
              <Link
                href="/dashboard/configuracoes"
                className="page-dashboard_info-link"
              >
                Configurações
              </Link>
              para atualizar.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
