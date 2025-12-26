import About from "@/components/Sections/About/About";
import Banner from "@/components/Sections/Banner/Banner";
import Benefits from "@/components/Sections/Benefits/Benefits";
import Categories from "@/components/Sections/Categories/Categories";
import ClientOrProfessionalCTA from "@/components/Sections/ClientOrProfessionalCTA/ClientOrProfessionalCTA";

export default function AboutPage() {
  return (
    <main>
      <Banner
        title="Feita para a Comunidade"
        description="A Jobberu foi criada para fortalecer a comunidade, conectando profissionais locais a clientes que buscam serviços com confiança e facilidade."
      />
      <About />
      <ClientOrProfessionalCTA />
      <Categories />
      <Benefits />
    </main>
  );
}
