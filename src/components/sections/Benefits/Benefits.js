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
    icon: <MdVerified size={70} color="#28a745" />,
    label:
      "Contrate profissionais confiáveis, para qualquer serviço. Encontre prestadores qualificados para vários tipos de serviços, compare propostas e escolha sempre a melhor opção para você.",
  },
  {
    icon: <FaHandshakeAngle size={70} color="#007bff" />,
    label:
      "Negociação direta, sem intermediários. Combine valores, prazos e formas de pagamento diretamente com o profissional; a JOBERU não interfere nas suas negociações.",
  },
  {
    icon: <GoLocation size={70} color="#fd7e14" />,
    label:
      "Conectando pessoas da sua região. A JOBERU aproxima clientes e prestadores de serviço locais, sem burocracia e com tudo em um só lugar.",
  },
  {
    icon: <AiFillStar size={70} color="#ffc107" />,
    label:
      "Perfis com avaliações reais. Analise o perfil do prestador, veja comentários de quem já contratou e tome decisões com mais segurança.",
  },
  {
    icon: <VscFeedback size={70} color="#6f42c1" />,
    label:
      "Seu feedback gera mais qualidade. Avalie os profissionais após cada serviço e ajude a manter um padrão de excelência na plataforma.",
  },
  {
    icon: <FaRegBookmark size={70} color="#dc3545" />,
    label:
      "Economize tempo na busca por ajuda. Em poucos cliques você encontra quem resolve seu problema, sem precisar pedir indicação em vários lugares​",
  },
];

export default function Benefits() {
  return (
    <section className="w-full flex flex-col items-center justify-center  p-14 pt-4">
      <div className=" w-[1200px] flex items-center gap-4">
        <h2 className="text-4xl flex-shrink-0">Beneficios Jobberu</h2>
        <span className="border border-slate-300  flex-1" />
      </div>
      <div className="w-[1200px] max-lg:w-full grid grid-cols-3 mt-20 ">
        {benefits.map((benefit, index) => (
          <div
            key={index}
            className="flex flex-col p-5 items-center justify-center gap-3"
          >
            {benefit.icon}
            <p className="text-center">{benefit.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
