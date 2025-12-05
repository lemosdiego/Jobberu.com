import Image from "next/image";
import "./Banner.css";

export default function Banner() {
  return (
    <section className="section-banner">
      <div className="section-banner__overlay">
        <div className="section-banner__content">
          <h1 className="section-banner__title">
            Jobberu: a ponte entre você e os melhores profissionais da sua
            região.
          </h1>
          <p className="section-banner__description">
            Mais perto, mais fácil, para facilitar o seu dia a dia.
          </p>
        </div>
      </div>
    </section>
  );
}
