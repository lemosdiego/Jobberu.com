"use client";
import "./Benefits.css";
import { MdVerified } from "react-icons/md";
import { FaHandshakeAngle } from "react-icons/fa6";
import { GoLocation } from "react-icons/go";
import { AiFillStar } from "react-icons/ai";
import { VscFeedback } from "react-icons/vsc";
import { FaRegBookmark } from "react-icons/fa";

const benefits = [
  {
    icon: <MdVerified color="#28a745 " className="benefits-icons" />,
    label:
      "Contrate profissionais confiáveis, para qualquer serviço. Encontre prestadores qualificados para vários tipos de serviços, compare propostas e escolha sempre a melhor opção para você.",
  },
  {
    icon: <FaHandshakeAngle color="#007bff" className="benefits-icons" />,
    label:
      "Negociação direta, sem intermediários. Combine valores, prazos e formas de pagamento diretamente com o profissional; a JOBERU não interfere nas suas negociações.",
  },
  {
    icon: <GoLocation color="#fd7e14" className="benefits-icons" />,
    label:
      "Conectando pessoas da sua região. A JOBERU aproxima clientes e prestadores de serviço locais, sem burocracia e com tudo em um só lugar.",
  },
  {
    icon: <AiFillStar color="#ffc107" className="benefits-icons" />,
    label:
      "Perfis com avaliações reais. Analise o perfil do prestador, veja comentários de quem já contratou e tome decisões com mais segurança.",
  },
  {
    icon: <VscFeedback color="#6f42c1" className="benefits-icons" />,
    label:
      "Seu feedback gera mais qualidade. Avalie os profissionais após cada serviço e ajude a manter um padrão de excelência na plataforma.",
  },
  {
    icon: <FaRegBookmark color="#dc3545" className="benefits-icons" />,
    label:
      "Economize tempo na busca por ajuda. Em poucos cliques você encontra quem resolve seu problema, sem precisar pedir indicação em vários lugares​",
  },
];

export default function Benefits() {
  return (
    <section className="section-benefits">
      <div className=" section-benefits_container-title">
        <h2 className=" section-benefits_title">Beneficios Jobberu</h2>
      </div>
      <div className=" section-benefits_container-cards">
        {benefits.map((benefit, index) => (
          <div key={index} className="section-benefits_card">
            {benefit.icon}
            <p className="section-benefits_card-text">{benefit.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
