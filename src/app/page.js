import Banner from "@/components/banner/Banner";
import Filter from "@/components/filter/Filter";

export default function Home() {
  return (
    <main className="home">
      <aside>
        <Filter />
      </aside>
      <section>
        <Banner />
      </section>
    </main>
  );
}
