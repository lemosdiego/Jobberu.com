import Link from "next/link";
import "./DualCTA.css";

export default function DualCTA() {
  return (
    <section className="section-dual-cta">
      <div className="section-dual-cta_container">
        <div className="section-dual-cta_content">
          <h2 className="section-dual-cta_title">
            Pronto para simplificar sua vida ou expandir seus negócios?
          </h2>

          <div className="section-dual-cta_buttons">
            <Link href="/servicos" className="section-dual-cta_button primary">
              Quero Contratar
            </Link>
            <Link
              href="/register/prestador"
              className="section-dual-cta_button secondary"
            >
              Quero Trabalhar
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
