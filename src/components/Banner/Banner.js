import "./Banner.css";

export default function Banner() {
  return (
    <section className="section-banner">
      <div className="section-banner__content">
        <h1>
          Jobberu: a ponte entre você e os melhores profissionais da sua região.
        </h1>
        <p>Mais perto, mais fácil, para facilitar o seu dia a dia.</p>
      </div>
      <div className="section-banner__image"></div>
      <div className="section-banner__overlay"></div>
    </section>
  );
}
