import Banner from "@/components/Sections/Banner/Banner";
import Benefits from "@/components/Sections/Benefits/Benefits";
import Categories from "@/components/Sections/Categories/Categories";
import ClientOrProfessionalCTA from "@/components/Sections/ClientOrProfessionalCTA/ClientOrProfessionalCTA";
import FAQ from "@/components/Sections/Faq/FAQ";
import Responsibilities from "@/components/Sections/Responsibilities/Responsibilities";

export default function PageResponsibilities() {
  return (
    <main>
      <Banner
        title="Compromisso, Transparência e Respeito"
        description="Conheça as responsabilidades dos usuários e da plataforma Jobberu. Nosso objetivo é garantir uma experiência segura, clara e justa para toda a comunidade."
      />
      <Responsibilities />
      <ClientOrProfessionalCTA />
      <Categories />
      <Benefits />
      <FAQ />
    </main>
  );
}
