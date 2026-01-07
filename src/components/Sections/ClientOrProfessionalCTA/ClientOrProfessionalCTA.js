import Link from "next/link";
import "./ClientOrProfessionalCTA.css";
import Button from "@/components/Site/Button/Button";

export default function ClientOrProfessionalCTA() {
  return (
    <section className="section-dual-cta">
      <div className="section-dual-cta_container">
        <h2 className="section-dual-cta_title">
          Pronto para simplificar sua vida ou expandir seus negócios?
        </h2>
        <div className="section-dual-cta_buttons">
          <Link href="register/customer">
            <Button className="button-hire">Quero Contratar</Button>
          </Link>
          <Link href="/register/provider">
            <Button className="button-job">Quero Trabalhar</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
