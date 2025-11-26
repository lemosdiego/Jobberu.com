import Banner from "@/components/Banner/Banner";
import Benefits from "@/components/Benefits/Benefits";
import Feedbacks from "@/components/Feedback/Feedback";
import Search from "@/components/Search/Search";
import SectionProfessionals from "@/components/SectionProfessional/SectionProfessionals";

export default function Home() {
  return (
    <main className="home-page_container">
      <Banner />
      <Search />
      <SectionProfessionals />
      <Benefits />
      <Feedbacks />
    </main>
  );
}
