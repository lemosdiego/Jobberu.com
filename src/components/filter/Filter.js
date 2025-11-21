const categories = [
  "Jardinagem",
  "Manicure e Pedicure",
  "Barbeiro",
  "Limpeza Residencial",
  "Eletricista",
  "Encanador",
  "Pintor",
  "Montagem de Móveis",
  "Personal Trainer",
  "Manutenção de Piscinas",
  "Aulas Particulares",
  "Motorista",
  "Frete",
];

export default function Filter() {
  return (
    <div className="filter-container">
      <input
        type="text"
        placeholder="Buscar serviço ou prestador"
        className="p-2.5 rounded-xl border border-blue-500 bg-amber-50 w-full outline-none shadow"
      />
      <div className="categories grid gap-2 mt-2 max-md:flex overflow-x-auto">
        {categories.map((category, index) => (
          <button
            key={index}
            className="rounded-xl p-2 bg-blue-200 hover:bg-green-200 shadow-2xs cursor-pointer max-md:min-w-[200px]"
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
}
