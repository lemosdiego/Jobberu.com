import Banner from "@/components/banner/Banner";
import SectionProfessionals from "@/components/card/SectionProfessionals";
import Filter from "@/components/filter/Filter";

export default function Home() {
  return (
    <main className="home-page_container">
      <Banner />
      <div className="content-layout ">
        <Filter />
        <SectionProfessionals />
      </div>
    </main>
  );
}
