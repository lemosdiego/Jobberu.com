import Banner from "@/components/Banner/Banner";
import Search from "@/components/Search/Search";
import SectionProfessionals from "@/components/SectionProfessional/SectionProfessionals";

export default function Home() {
  return (
    <main className="home-page_container">
      <Banner />
      <Search />
      <SectionProfessionals />
    </main>
  );
}
