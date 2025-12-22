import About from "@/components/sections/About/About";
import Banner from "@/components/sections/Banner/Banner";
import Benefits from "@/components/sections/Benefits/Benefits";
import Categories from "@/components/sections/categories/Categories";
import DualCTA from "@/components/sections/DualCTA/DualCTA";
import FeaturedCategories from "@/components/sections/FeaturedCategories/FeaturedCategories";

export default function AboutPage() {
  return (
    <main>
      <Banner
        title="Feita para a Comunidade"
        description="A Jobberu foi criada para fortalecer a comunidade, conectando profissionais locais a clientes que buscam serviços com confiança e facilidade."
      />
      <About />
      <DualCTA />
      <Categories />
      <Benefits />
    </main>
  );
}
