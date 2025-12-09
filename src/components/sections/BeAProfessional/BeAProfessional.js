// src/components/section/BeAProfessional/BeAProfessional.js
"use client";

// import { useAuth } from "@/context/AuthContext"; // Importa o AuthContext
import Link from "next/link";
import {
  FaUserPlus,
  FaUserEdit,
  FaCog,
  FaEnvelope,
  FaCheckCircle,
  FaRocket,
  FaArrowRight,
  FaArrowDown,
  FaArrowLeft,
} from "react-icons/fa";

export default function BeAProfessional() {
  const steps = [
    {
      number: 1,
      title: "Cadastre-se gratuitamente",
      description:
        "Crie sua conta profissional em poucos minutos e comece sua jornada",
      icon: FaUserPlus,
      color: "text-blue-500",
      bgColor: "bg-blue-50",
    },
    {
      number: 2,
      title: "Complete seu perfil",
      description:
        "Adicione suas habilidades, experiências e portfólio para se destacar",
      icon: FaUserEdit,
      color: "text-purple-500",
      bgColor: "bg-purple-50",
    },
    {
      number: 3,
      title: "Escolha seus serviços",
      description:
        "Defina quais serviços você oferece e estabeleça seus preços",
      icon: FaCog,
      color: "text-orange-500",
      bgColor: "bg-orange-50",
    },
    {
      number: 4,
      title: "Receba solicitações",
      description: "Clientes encontram você e enviam propostas diretamente",
      icon: FaEnvelope,
      color: "text-green-500",
      bgColor: "bg-green-50",
    },
    {
      number: 5,
      title: "Aceite trabalhos",
      description:
        "Escolha os projetos que fazem sentido para você e seu negócio",
      icon: FaCheckCircle,
      color: "text-teal-500",
      bgColor: "bg-teal-50",
    },
    {
      number: 6,
      title: "Cresça seu negócio",
      description:
        "Construa sua reputação, ganhe avaliações e aumente seus ganhos",
      icon: FaRocket,
      color: "text-pink-500",
      bgColor: "bg-pink-50",
    },
  ];

  // Função para determinar qual seta mostrar
  const getArrowComponent = (index) => {
    // Card 1 (index 0) → direita para Card 2
    if (index === 0) {
      return {
        position: "right",
        Icon: FaArrowRight,
        animation: "animate-pulse",
      };
    }
    // Card 2 (index 1) → baixo para Card 4
    if (index === 1) {
      return {
        position: "bottom",
        Icon: FaArrowDown,
        animation: "animate-bounce",
      };
    }
    // Card 4 (index 3) → esquerda para Card 3
    if (index === 3) {
      return {
        position: "left",
        Icon: FaArrowLeft,
        animation: "animate-pulse",
      };
    }
    // Card 3 (index 2) → baixo para Card 5
    if (index === 2) {
      return {
        position: "bottom",
        Icon: FaArrowDown,
        animation: "animate-bounce",
      };
    }
    // Card 5 (index 4) → direita para Card 6
    if (index === 4) {
      return {
        position: "right",
        Icon: FaArrowRight,
        animation: "animate-pulse",
      };
    }
    // Card 6 (index 5) não tem seta
    return null;
  };

  // const { user, isAuthenticated, isLoadingAuth } = useAuth();

  // // Define o link do CTA baseado no status do usuário
  // let ctaLink = "/register?type=profissional"; // Link padrão para não logados ou novos profissionais
  // if (!isLoadingAuth && isAuthenticated && !user?.is_prestador) {
  //   ctaLink = `/cliente/${user.id}?edit=true`; // Redireciona para o perfil do cliente em modo de edição
  // }

  return (
    <section className="w-full min-h-screen py-12 md:py-16 lg:py-20 px-4 bg-gradient-to-b  via-primary/5 ">
      <div className="max-w-7xl mx-auto">
        {/* Banner Header */}
        <div className="relative overflow-hidden bg-gradient-to-r from-primary via-primary/90 to-primary/80 rounded-3xl p-8 md:p-12 lg:p-16 mb-16 md:mb-20 text-white shadow-2xl">
          {/* Efeitos decorativos */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-32 translate-x-32"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl translate-y-32 -translate-x-32"></div>

          <div className="relative z-10">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 text-center leading-tight">
              Torne-se um profissional Joberru
            </h1>
            <p className="text-base md:text-lg lg:text-xl text-center max-w-3xl mx-auto leading-relaxed">
              Não tenha dor de cabeça para ir atrás de clientes,{" "}
              <span className="font-bold underline decoration-2 underline-offset-4">
                o cliente vai até você
              </span>
            </p>
          </div>
        </div>

        {/* Grid de Cards com Trilha */}
        <div className="relative grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-12 mb-12 md:mb-16">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const arrow = getArrowComponent(index);

            return (
              <div key={step.number} className="relative">
                {/* Card */}
                <div className="group bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 border-2 border-gray-100 hover:border-primary/30 overflow-hidden h-full">
                  <div className="p-6 md:p-8">
                    <div className="flex items-start gap-4 md:gap-6">
                      {/* Círculo com número */}
                      <div className="flex-shrink-0 w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-primary to-primary/80 text-white rounded-full flex items-center justify-center font-bold text-xl md:text-2xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                        {step.number}
                      </div>

                      {/* Conteúdo */}
                      <div className="flex-1">
                        {/* Ícone com background */}
                        <div
                          className={`inline-flex p-3 rounded-xl ${step.bgColor} mb-4 group-hover:scale-110 transition-transform duration-300`}
                        >
                          <Icon
                            className={`text-3xl md:text-4xl ${step.color}`}
                          />
                        </div>

                        <h3 className="text-lg md:text-xl lg:text-2xl font-bold mb-2 md:mb-3 text-gray-800 group-hover:text-primary transition-colors duration-300">
                          {step.title}
                        </h3>
                        <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Barra de progresso inferior */}
                  <div className="h-1 bg-gradient-to-r from-primary/20 to-primary group-hover:from-primary group-hover:to-primary/80 transition-all duration-300"></div>
                </div>

                {/* Setas Conectoras - Mobile (sempre para baixo) */}
                {index < steps.length - 1 && (
                  <div className="flex justify-center my-4 md:hidden">
                    <div className="flex flex-col items-center">
                      <FaArrowDown className="text-primary w-6 h-6 animate-bounce" />
                    </div>
                  </div>
                )}

                {/* Setas para Desktop - Fluxo em U */}
                {arrow && (
                  <div className="hidden md:block">
                    {/* Seta para direita */}
                    {arrow.position === "right" && (
                      <div className="absolute top-1/2 -right-6 lg:-right-10 -translate-y-1/2 z-10">
                        <div className="bg-white rounded-full p-2 shadow-lg">
                          <arrow.Icon
                            className={`text-primary w-5 h-5 lg:w-6 lg:h-6 ${arrow.animation}`}
                          />
                        </div>
                      </div>
                    )}

                    {/* Seta para baixo */}
                    {arrow.position === "bottom" && (
                      <div className="absolute -bottom-6 lg:-bottom-10 left-1/2 -translate-x-1/2 z-10">
                        <div className="bg-white rounded-full p-2 shadow-lg">
                          <arrow.Icon
                            className={`text-primary w-5 h-5 lg:w-6 lg:h-6 ${arrow.animation}`}
                          />
                        </div>
                      </div>
                    )}

                    {/* Seta para esquerda */}
                    {arrow.position === "left" && (
                      <div className="absolute top-1/2 -left-6 lg:-left-10 -translate-y-1/2 z-10">
                        <div className="bg-white rounded-full p-2 shadow-lg">
                          <arrow.Icon
                            className={`text-primary w-5 h-5 lg:w-6 lg:h-6 ${arrow.animation}`}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-12 md:mt-16 lg:mt-20">
          <div className="bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 rounded-3xl p-8 md:p-12 lg:p-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-800">
              Pronto para começar?
            </h2>
            <p className="text-base md:text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Junte-se a centenas de profissionais que já estão recebendo
              propostas de trabalho todo dia
            </p>

            <Link
              href="/cadastro"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-white font-bold text-base md:text-lg px-8 md:px-10 py-4 md:py-5 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 active:scale-95"
            >
              <FaCheckCircle className="w-5 h-5 md:w-6 md:h-6" />
              Torne-se um profissional agora mesmo
            </Link>

            <div className="mt-6 flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 text-sm md:text-base text-gray-600">
              <span className="flex items-center gap-2">
                <FaCheckCircle className="text-green-500" />
                100% gratuito para começar
              </span>
              <span className="flex items-center gap-2">
                <FaCheckCircle className="text-green-500" />
                Sem taxas ocultas
              </span>
              <span className="flex items-center gap-2">
                <FaCheckCircle className="text-green-500" />
                Cancele quando quiser
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
