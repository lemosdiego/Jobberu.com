import Banner from "@/components/Sections/Banner/Banner";
import Benefits from "@/components/Sections/Benefits/Benefits";
import Categories from "@/components/Sections/Categories/Categories";
import FAQ from "@/components/Sections/Faq/FAQ";
import HowDoesItWork from "@/components/Sections/HowDoesItWork/HowDoesItWork";

export default function PageHowDoesItWork() {
  return (
    <main>
      <Banner
        title="Jobberu: simples, rápido e prático"
        description="Conectamos clientes a profissionais de forma fácil. Busque serviços, feche negócio e resolva tudo em um só lugar. Para profissionais, mais visibilidade e novas oportunidades."
      />
      <HowDoesItWork />
      <Categories />
      <Benefits />
      <FAQ />
    </main>
  );
}
