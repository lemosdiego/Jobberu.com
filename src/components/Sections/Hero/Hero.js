import SearchBox from "@/components/Site/Search/SearchBox";

export default function Hero({ searchState }) {
  return (
    <section>
      <SearchBox searchState={searchState} />
    </section>
  );
}
