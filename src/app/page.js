"use client";

import Benefits from "@/components/Sections/Benefits/Benefits";
import Categories from "@/components/Sections/Categories/Categories";
import ClientOrProfessionalCTA from "@/components/Sections/ClientOrProfessionalCTA/ClientOrProfessionalCTA";
import FAQ from "@/components/Sections/Faq/FAQ";
import FeaturedCategories from "@/components/Sections/FeaturedCategories/FeaturedCategories";
import Hero from "@/components/Sections/Hero/Hero";
import HowItWorks from "@/components/Sections/HowItWorks/HowItWorks";
import SectionProfessional from "@/components/Sections/SectionProfessional/SectionProfessional";
import { useProfessionalSearch } from "@/hooks/useProfessionalSearch";

export default function Home() {
  const searchState = useProfessionalSearch();

  return (
    <main className="home-container">
      <Hero searchState={searchState} />
      <SectionProfessional
        prestadores={searchState.prestadores}
        loading={searchState.loading}
        erro={searchState.erro}
        isClient={searchState.isClient}
        jaBuscou={searchState.jaBuscou}
        mensagemNenhumResultado={searchState.mensagemNenhumResultado}
      />
    </main>
  );
}
