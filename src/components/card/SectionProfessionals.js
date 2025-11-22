import professionals from "@/data/dataProfissionais";

export default function SectionProfessionals() {
  return (
    <section className="main-content w-full grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
      {professionals.map((professional, index) => (
        <div key={index} className="border">
          <h3>{professional.nome}</h3>
        </div>
      ))}
    </section>
  );
}
