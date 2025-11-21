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
        className="search-input"
      />
      <div className="categories">
        {categories.map((category, index) => (
          <button key={index} className="category-chip">
            {category}
          </button>
        ))}
      </div>
    </div>
  );
}
