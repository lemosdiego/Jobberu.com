import Banner from "@/components/banner/Banner";
import Filter from "@/components/filter/Filter";

export default function Home() {
  return (
    <main className="home-page_container">
      <div className="home-page_content">
        {/* Banner principal */}
        <div className="banner-wrapper">
          <Banner />
        </div>
        {/* Conteúdo principal */}
        <div className="content-layout ">
          {/* Filtro lateral */}
          <aside className="sidebar ">
            <Filter />
          </aside>

          {/* Seção principal */}
          <section className="main-content  grid grid-cols-3 max-xl:grid-cols-2 gap-2">
            <div className="border h-[300px]"></div>
            <div className="border h-[300px]"></div>
            <div className="border h-[300px]"></div>
            <div className="border h-[300px]"></div>
            <div className="border h-[300px]"></div>
            <div className="border h-[300px]"></div>
            <div className="border h-[300px]"></div>
            <div className="border h-[300px]"></div>
            <div className="border h-[300px]"></div>
          </section>
        </div>
      </div>
    </main>
  );
}
