import Banner from "@/components/Sections/Banner/Banner";
import BeAProfessional from "@/components/Sections/BeAProfessional/BeAProfessional";
import Benefits from "@/components/Sections/Benefits/Benefits";
import Categories from "@/components/Sections/Categories/Categories";
import FAQ from "@/components/Sections/Faq/FAQ";

export default function BeAProfessionalPage() {
  return (
    <main>
      <BeAProfessional />
      <Categories />
      <Benefits />
      <FAQ />
    </main>
  );
}
