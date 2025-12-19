import { FaSearch, FaUsers, FaHandshake } from "react-icons/fa";
import "./HowItWorks.css";

const steps = [
  {
    icon: <FaSearch size={40} className="text-blue-700" />,
    title: "1. Busque o Serviço",
    description:
      "Encontre o profissional perfeito para o que você precisa, de forma rápida e fácil.",
  },
  {
    icon: <FaUsers size={40} className="text-blue-700" />,
    title: "2. Compare Perfis",
    description:
      "Analise os perfis, veja os serviços oferecidos e escolha a melhor opção para você.",
  },
  {
    icon: <FaHandshake size={40} className="text-blue-700" />,
    title: "3. Contrate Direto",
    description:
      "Converse diretamente com o profissional pelo WhatsApp ou telefone e combine os detalhes.",
  },
];

export default function HowItWorks() {
  return (
    <section className="section-how-it-works">
      <div className="section-how-it-works_container">
        <h2 className="section-how-it-works_title">Como a Jobberu Funciona?</h2>
        <p className="section-how-it-works_subtitle">
          Conectamos você ao profissional ideal em apenas 3 passos.
        </p>
        <div className="section-how-it-works_steps-grid">
          {steps.map((step, index) => (
            <div key={index} className="section-how-it-works_step-card">
              <div className="section-how-it-works_step-icon">{step.icon}</div>
              <h3 className="section-how-it-works_step-title">{step.title}</h3>
              <p className="section-how-it-works_step-description">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
