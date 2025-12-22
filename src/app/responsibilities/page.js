import Banner from "@/components/sections/Banner/Banner";
import Benefits from "@/components/sections/Benefits/Benefits";
import Categories from "@/components/sections/categories/Categories";
import DualCTA from "@/components/sections/DualCTA/DualCTA";
import FAQ from "@/components/sections/Faq/FAQ";
import Responsibilities from "@/components/sections/Responsibilities/Responsibilities";

export default function PageResponsibilities() {
  return (
    <main>
      <Banner
        title="Compromisso, Transparência e Respeito"
        description="Conheça as responsabilidades dos usuários e da plataforma Jobberu. Nosso objetivo é garantir uma experiência segura, clara e justa para toda a comunidade."
      />
      <Responsibilities />
      <DualCTA />
      <Categories />
      <Benefits />
      <FAQ />
    </main>
  );
}
