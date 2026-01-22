import "./Hero.css";
import SearchBox from "@/components/Site/Search/SearchBox";

export default function Hero({ searchState }) {
  return (
    <section className="section_hero">
      <h1>
        <span>Jobberu</span> Quem você <br />
        precisa tá aqui
      </h1>

      <SearchBox searchState={searchState} />
    </section>
  );
}
