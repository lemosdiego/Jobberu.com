import Banner from "@/components/sections/Banner/Banner";
import Benefits from "@/components/sections/Benefits/Benefits";
import Categories from "@/components/sections/categories/Categories";
import HowDoesItWork from "@/components/sections/HowDoesItWork/HowDoesItWork";

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
    </main>
  );
}
