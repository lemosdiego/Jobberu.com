"use client";

import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { FaWrench, FaBriefcase, FaUser, FaLightbulb } from "react-icons/fa";
import "./dashboard.css";

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
    <main className="p-4 md:p-8 bg-gray-50 min-h-full">
      <div className="max-w-5xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
            Olá, {user.nome.split(" ")[0]}!
          </h1>
          <p className="text-lg text-gray-600 mt-1">
            Bem-vindo(a) ao seu painel de controle.
          </p>
        </header>

        {/* Seção de Ações Rápidas */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          <Link href="/dashboard/servicos" className="dashboard-card">
            <FaBriefcase className="text-3xl text-blue-500 mb-3" />
            <h2 className="text-xl font-semibold">Meus Serviços</h2>
            <p className="text-gray-500">
              Crie, edite e gerencie os serviços que você oferece.
            </p>
          </Link>

          <Link href="/dashboard/configuracoes" className="dashboard-card">
            <FaWrench className="text-3xl text-green-500 mb-3" />
            <h2 className="text-xl font-semibold">Configurações</h2>
            <p className="text-gray-500">
              Atualize suas informações de perfil, foto e contato.
            </p>
          </Link>

          <Link href={profileUrl} className="dashboard-card">
            <FaUser className="text-3xl text-purple-500 mb-3" />
            <h2 className="text-xl font-semibold">Ver Perfil Público</h2>
            <p className="text-gray-500">
              Veja como os clientes visualizam seu perfil na plataforma.
            </p>
          </Link>
        </section>

        {/* Seção de Dicas */}
        <section>
          <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-3">
            <FaLightbulb className="text-yellow-400" />
            Dicas para o Sucesso
          </h3>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 space-y-4">
            <p className="text-gray-700">
              <strong>Fotos de Qualidade:</strong> Adicione imagens nítidas e
              profissionais aos seus serviços. Isso aumenta a confiança do
              cliente e a chance de contratação.
            </p>
            <p className="text-gray-700">
              <strong>Perfil Completo:</strong> Um perfil com biografia
              detalhada e título profissional claro atrai mais olhares. Vá em{" "}
              <Link
                href="/dashboard/configuracoes"
                className="text-blue-600 hover:underline font-medium"
              >
                Configurações
              </Link>{" "}
              para atualizar.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
