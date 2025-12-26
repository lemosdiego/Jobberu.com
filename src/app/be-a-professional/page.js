import Banner from "@/components/Sections/Banner/Banner";
import BeAProfessional from "@/components/Sections/BeAProfessional/BeAProfessional";
import Benefits from "@/components/Sections/Benefits/Benefits";
import Categories from "@/components/Sections/Categories/Categories";
import FAQ from "@/components/Sections/Faq/FAQ";

export default function BeAProfessionalPage() {
  return (
    <main>
      <Banner
        title="Torne-se um profissional Joberru"
        description="Não tenha dor de cabeça para ir atrás de clientes,
            o cliente vai até você"
      />
      <BeAProfessional />
      <Categories />
      <Benefits />
      <FAQ />
    </main>
  );
}
