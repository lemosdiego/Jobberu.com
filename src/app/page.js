// /app/page.js (ou o arquivo da sua Home)
"use client"; // Adicione esta diretiva no topo!

import Banner from "@/components/Banner/Banner";
import Benefits from "@/components/Benefits/Benefits";
import PrestadoresEmDestaque from "@/components/PrestadoresDestaque/PrestadoresDestaque";
import Search from "@/components/Search/Search";

export default function Home() {
  return (
    <main className="home-page_container">
      <Banner />
      <Search />
      <PrestadoresEmDestaque />
      <Benefits />
    </main>
  );
}
