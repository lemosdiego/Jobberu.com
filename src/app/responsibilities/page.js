import Banner from "@/components/sections/Banner/Banner";
import Benefits from "@/components/sections/Benefits/Benefits";
import Categories from "@/components/sections/categories/Categories";
import Responsibilities from "@/components/sections/Responsibilities/Responsibilities";

export default function PageResponsibilities() {
  return (
    <main>
      <Banner
        title="Compromisso, Transparência e Respeito"
        description="Conheça as responsabilidades dos usuários e da plataforma Jobberu. Nosso objetivo é garantir uma experiência segura, clara e justa para toda a comunidade."
      />
      <Responsibilities />
      <Categories />
      <Benefits />
    </main>
  );
}
