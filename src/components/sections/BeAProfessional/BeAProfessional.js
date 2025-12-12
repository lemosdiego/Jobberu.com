// src/components/section/BeAProfessional/BeAProfessional.js
"use client";

import Link from "next/link";
import "./BeAProfessional.css";
import { BiSolidCheckboxChecked } from "react-icons/bi";

import {
  PiNumberSquareOneLight,
  PiNumberSquareTwoLight,
  PiNumberSquareThreeLight,
  PiNumberSquareFourLight,
  PiNumberSquareFiveLight,
  PiNumberSquareSixLight,
} from "react-icons/pi";

export default function BeAProfessional() {
  const steps = [
    {
      icon: <PiNumberSquareOneLight size={55} className="mb-2" />,
      title: "Cadastre-se como Profissional Jobberu",
      description:
        "Crie sua conta, adicione uma boa foto de perfil, uma biografia atraente e defina seu título profissional, como 'Jardineiro'. Isso é essencial para começar sua jornada e impactar a vida de muitos clientes.",
    },
    {
      icon: <PiNumberSquareTwoLight size={55} className="mb-2" />,
      title: "Crie seu Serviço",
      description:
        "Selecione fotos de trabalhos realizados, prepare uma descrição detalhada e defina a categoria do seu serviço. Você pode estipular um valor mínimo e, em breve, verá os resultados da sua dedicação.",
    },
    {
      icon: <PiNumberSquareThreeLight size={55} className="mb-2" />,
      title: "Conexão Direta com o Cliente",
      description:
        "Na Jobberu, todo o contato é privativo. O cliente entra em contato diretamente pelo WhatsApp, negociando valores, local e prazo do serviço. A plataforma garante a privacidade e a autonomia de ambas as partes.",
    },
    {
      icon: <PiNumberSquareFourLight size={55} className="mb-2" />,
      title: "Feche Negócio com Confiança",
      description:
        "O fechamento do serviço é uma decisão mútua. Uma boa biografia, descrições claras e imagens de qualidade atraem mais clientes e aumentam suas chances de sucesso.",
    },
    {
      icon: <PiNumberSquareFiveLight size={55} className="mb-2" />,
      title: "Construa sua Reputação",
      description:
        "Com nosso sistema de avaliações, o cliente pode reconhecer a qualidade do seu trabalho. Cada avaliação positiva fortalece sua reputação e destaca seu perfil.",
    },
    {
      icon: <PiNumberSquareSixLight size={55} className="mb-4" />,
      title: "Cresça com Jobberu",
      description:
        "Jobberu foi criada para conectar pessoas. Nosso objetivo é facilitar o encontro entre profissionais locais e clientes que precisam de serviços, promovendo crescimento para ambos os lados.",
    },
  ];
  return (
    <section className="section-beAprofessional">
      <div className="section-beAProfessional_container">
        {/* Banner Header */}
        <div className="section-beAProfessional_banner">
          <h1 className="section-beAProfessional_banner-title">
            Torne-se um profissional Joberru
          </h1>
          <p className="section-beAProfessional_banner-subtitle">
            Não tenha dor de cabeça para ir atrás de clientes,
            <span className="">o cliente vai até você</span>
          </p>
        </div>

        {/* Grid de Cards com Trilha */}
        <div className="section-beAProfessional_cards-container">
          {steps.map((item, index) => (
            <div key={index} className="section-beAProfessional_cards">
              {item.icon}
              <h2 className="section-beAProfessional_cards-title">
                {item.title}
              </h2>
              <p className="section-beAProfessional_cards-description">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className=" section-beAProfessional_cta-container">
          <h2 className="section-beAProfessional_cta-title">
            Pronto para começar?
          </h2>
          <p className="section-beAProfessional_cta-text">
            Junte-se a centenas de profissionais que já estão recebendo
            propostas de trabalho todo dia
          </p>

          <Link href="/cadastro" className="section-beAProfessional_cta-link">
            {/* Sem ícone aqui */}
            Torne-se um profissional agora mesmo
          </Link>

          <div className="section-beAProfessional_info">
            <span className="flex items-center gap-0.5">
              <BiSolidCheckboxChecked size={22} className="text-green-700" />
              100% gratuito para começar
            </span>
            <span className="flex items-center gap-0.5">
              <BiSolidCheckboxChecked size={22} className="text-green-700" />{" "}
              Sem taxas ocultas
            </span>
            <span className="flex items-center gap-0.5">
              <BiSolidCheckboxChecked size={22} className="text-green-700" />{" "}
              Cancele quando quiser
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
