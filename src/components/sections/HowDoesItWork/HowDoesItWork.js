import professionalSteps from "@/data/professionals";
import "./HowDoesItWork.css";
import clientSteps from "@/data/clients";
import Link from "next/link";
import Title from "@/components/site/Title/Title";

export default function HowDoesItWork() {
  return (
    <section className="section-howDoesItWork">
      <div className="section-howDoesItWork_container">
        {/* PROFISSIONAIS */}
        <div className="section-howDoesItWork_professionals">
          <Title>Para Profissionais</Title>

          <div className="section-howDoesItWork_professionals-cards">
            {professionalSteps.map((step, index) => (
              <div key={index} className="section-howDoesItWork_card">
                <h3 className="section-howDoesItWork_card-title">
                  {step.title}
                </h3>
                <p className="section-howDoesItWork_card-description">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CLIENTES */}
        <div className="section-howDoesItWork_clients">
          <Title>Para Clientes</Title>

          <div className="section-howDoesItWork_clients-cards">
            {clientSteps.map((step, index) => (
              <div key={index} className="section-howDoesItWork_card">
                <h3 className="section-howDoesItWork_card-title">
                  {step.title}
                </h3>
                <p className="section-howDoesItWork_card-description">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="section-howDoesItWork_actions">
          <Title>Faça seu cadastro?</Title>
          <p className="section-howDoesItWork_footer-text">
            Seja profissional ou cliente e descubra como a Jobberu torna tudo
            mais simples. Profissionais ganham visibilidade, constroem reputação
            e conquistam novos clientes. Clientes encontram serviços confiáveis,
            negociam direto e resolvem tudo com rapidez. Na Jobberu, só tem
            vantagem para quem quer trabalhar ou contratar com facilidade.
          </p>
          <Link
            href={"/cadastro/prestador"}
            className="section-howDoesItWork_button-professional"
          >
            Seja um profissional{" "}
          </Link>
          <Link
            href={"/cadastro/cliente"}
            className="section-howDoesItWork_button-client"
          >
            Seja um cliente
          </Link>
        </div>
      </div>
    </section>
  );
}
