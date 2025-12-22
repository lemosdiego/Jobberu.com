import Link from "next/link";
import "./DualCTA.css";
import Button from "@/components/site/button/Button";

export default function DualCTA() {
  return (
    <section className="section-dual-cta">
      <div className="section-dual-cta_container">
        <h2 className="section-dual-cta_title">
          Pronto para simplificar sua vida ou expandir seus negócios?
        </h2>
        <div className="section-dual-cta_buttons">
          <Link href="cadastro/cliente">
            <Button className="button-hire">Quero Contratar</Button>
          </Link>
          <Link href="/cadastro/prestador">
            <Button className="button-job">Quero Trabalhar</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
