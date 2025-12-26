"use client";

import Banner from "@/components/Sections/Banner/Banner";
import Benefits from "@/components/Sections/Benefits/Benefits";
import Categories from "@/components/Sections/Categories/Categories";
import ClientOrProfessionalCTA from "@/components/Sections/ClientOrProfessionalCTA/ClientOrProfessionalCTA";
import FAQ from "@/components/Sections/Faq/FAQ";
import FeaturedCategories from "@/components/Sections/FeaturedCategories/FeaturedCategories";
import HowItWorks from "@/components/Sections/HowItWorks/HowItWorks";
import SectionProfessional from "@/components/Sections/SectionProfessional/SectionProfessional";

// Adicione esta diretiva no topo!

export default function Home() {
  return (
    <main className="home-container">
      <Banner
        title="Jobberu: a ponte entre você e os melhores profissionais da sua
            região."
        description=" Mais perto, mais fácil, para facilitar o seu dia a dia."
      />
      <FeaturedCategories />
      <SectionProfessional />
      <HowItWorks />
      <ClientOrProfessionalCTA />
      <Categories />
      <Benefits />
      <FAQ />
    </main>
  );
}
