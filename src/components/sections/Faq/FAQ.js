"use client";

import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import "./FAQ.css";

const faqData = [
  {
    question: "Como faço para contratar um serviço?",
    answer:
      "Para contratar um serviço, basta criar uma conta como cliente, navegar pelas categorias ou buscar pelo serviço desejado e entrar em contato diretamente com o profissional através do WhatsApp ou telefone disponibilizado no perfil dele.",
  },
  {
    question: "A Jobberu cobra taxas pelos serviços?",
    answer:
      "Não. A Jobberu é uma plataforma de conexão. Não cobramos taxas sobre os serviços prestados. O valor e a forma de pagamento são negociados diretamente entre você e o profissional.",
  },
  {
    question: "Como posso me cadastrar como profissional?",
    answer:
      "Clique em 'Seja um Profissional' no rodapé ou no menu, preencha o formulário com seus dados pessoais e profissionais, e aguarde a confirmação. É rápido e gratuito.",
  },
  {
    question: "É seguro contratar pela Jobberu?",
    answer:
      "Nós verificamos os dados básicos dos profissionais, mas recomendamos sempre que você verifique as avaliações, peça referências e combine todos os detalhes com segurança antes de fechar o serviço.",
  },
  {
    question: "Esqueci minha senha, o que fazer?",
    answer:
      "Na página de login, clique em 'Esqueci minha senha' e siga as instruções enviadas para o seu e-mail para redefinir o acesso.",
  },
];

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="section-faq">
      <div className="section-faq_container">
        <div className="section-fac_container-title">
          <h2 className="section-faq_title">Perguntas Frequentes</h2>
        </div>
        <div className="section-faq_list">
          {faqData.map((item, index) => (
            <div
              key={index}
              className={`section-faq_item ${
                activeIndex === index ? "active" : ""
              }`}
            >
              <button
                className="section-faq_question"
                onClick={() => toggleFAQ(index)}
              >
                {item.question}
                {activeIndex === index ? <FaChevronUp /> : <FaChevronDown />}
              </button>
              <div className="section-faq_answer">
                <p>{item.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
