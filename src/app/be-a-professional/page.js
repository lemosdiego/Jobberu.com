import Banner from "@/components/sections/Banner/Banner";
import BeAProfessional from "@/components/sections/BeAProfessional/BeAProfessional";
import Benefits from "@/components/sections/Benefits/Benefits";
import Categories from "@/components/sections/categories/Categories";
import FAQ from "@/components/sections/Faq/FAQ";

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
