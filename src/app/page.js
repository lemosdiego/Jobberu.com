import Banner from "@/components/Banner/Banner";
import SectionProfessionals from "@/components/card/SectionProfessionals";
import Filter from "@/components/filter/Filter";

export default function Home() {
  return (
    <main className="home-page_container">
      <Banner />
      {/* <div className="border-t border-b w-[1200px] flex items-center justify-center p-8">
        <h2 className="text-4xl">Procure um profissional</h2>
      </div> */}
      {/* <div className="content-layout border">
        <Filter />
        <SectionProfessionals />
      </div> */}
    </main>
  );
}
