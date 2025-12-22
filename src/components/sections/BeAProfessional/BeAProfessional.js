// src/components/section/BeAProfessional/BeAProfessional.js
"use client";

import Link from "next/link";
import "./BeAProfessional.css";
import { BiSolidCheckboxChecked } from "react-icons/bi";
import steps from "@/data/steps";
import Title from "@/components/site/Title/Title";

export default function BeAProfessional() {
  return (
    <section className="section-beAprofessional">
      <div className="section-beAProfessional_container">
        <Title>Seja um Profissional</Title>
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
