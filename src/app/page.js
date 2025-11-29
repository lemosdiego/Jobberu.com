// /app/page.js (ou o arquivo da sua Home)
"use client";
import Banner from "@/components/site/Banner/Banner";

// Adicione esta diretiva no topo!

export default function Home() {
  return (
    <main className="home-page_container">
      <Banner />
    </main>
  );
}
