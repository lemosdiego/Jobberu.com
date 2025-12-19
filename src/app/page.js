"use client";

import Banner from "@/components/sections/Banner/Banner";
import Benefits from "@/components/sections/Benefits/Benefits";
import Categories from "@/components/sections/categories/Categories";
import FAQ from "@/components/sections/Faq/FAQ";
import SectionProfessional from "@/components/sections/SectionProfessional/SectionProfessional";

// Adicione esta diretiva no topo!

export default function Home() {
  return (
    <main className="home-container">
      <Banner
        title="Jobberu: a ponte entre você e os melhores profissionais da sua
            região."
        description=" Mais perto, mais fácil, para facilitar o seu dia a dia."
      />
      <SectionProfessional />
      <Categories />
      <Benefits />
      <FAQ />
    </main>
  );
}
