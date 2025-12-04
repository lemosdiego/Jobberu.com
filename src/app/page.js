"use client";

import Banner from "@/components/sections/Banner/Banner";
import Benefits from "@/components/sections/Benefits/Benefits";
import Categories from "@/components/sections/categories/Categories";
import SectionProfessional from "@/components/sections/SectionProfessional/SectionProfessional";

// Adicione esta diretiva no topo!

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center gap-8 w-full">
      <Banner />
      <SectionProfessional />
      <Categories />
      <Benefits />
    </main>
  );
}
