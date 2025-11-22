import Banner from "@/components/banner/Banner";
import SectionProfessionals from "@/components/card/SectionProfessionals";
import Filter from "@/components/filter/Filter";

export default function Home() {
  return (
    <main className="home-page_container">
      <Banner />
      <div className="border-t border-b w-[80vw] flex items-center justify-center p-8">
        <h2 className="text-4xl">Procure um profissional</h2>
      </div>
      <div className="content-layout border">
        <Filter />
        <SectionProfessionals />
      </div>
    </main>
  );
}
