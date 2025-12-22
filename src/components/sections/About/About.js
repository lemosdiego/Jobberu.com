"use client";
import Image from "next/image";
import "./About.css";

export default function About() {
  return (
    <section className="section-about">
      <div className="section-about_container">
        <div className="section-about_content">
          <h2 className="section-about_content-title">Sobre a Jobberu</h2>
          <p className="section-about_content-description">
            A Jobberu nasceu com o propósito de facilitar a vida das pessoas
            através da tecnologia, conectando quem precisa de um serviço a quem
            sabe fazê-lo com excelência. Seja para reparos domésticos, cuidados
            pessoais ou serviços especializados, nossa plataforma oferece uma
            maneira rápida e segura de encontrar o profissional ideal.
          </p>
          <p className="section-about_content-description">
            Valorizamos a confiança e a qualidade. Por isso, criamos um espaço
            onde prestadores de serviço podem divulgar seu trabalho de forma
            profissional e clientes podem contratar com tranquilidade. Junte-se
            a nós e descubra como a Jobberu pode transformar o seu dia a dia.
          </p>
        </div>
        <div className="section-about_container-image">
          <Image src={"/about.jpg"} alt="Sobre nós" fill objectFit="cover" />
        </div>
      </div>
    </section>
  );
}
