import professionals from "@/data/dataProfissionais";
import Link from "next/link";

export default function SectionProfessionals() {
  return (
    <section className="main-content w-full grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
      {professionals.map((professional) => (
        <div key={professional.id} className="border">
          <h3>{professional.nome}</h3>
          <Link href={`/details/${professional.id}`}>Detalhes</Link>
        </div>
      ))}
    </section>
  );
}
