import { useState, useEffect } from "react";

export default function SearchBox({ searchState }) {
  const {
    cidade,
    setCidade,
    handleBuscarCidade,
    categoriaSelecionada,
    handleSelectCategoria,
    categories,
    searchRef,
    loading,
  } = searchState || {};

  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef?.current && !searchRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [searchRef]);

  const handleSelectCategoriaWrapper = (categoria) => {
    if (handleSelectCategoria) {
      handleSelectCategoria(categoria);
      setDropdownOpen(false);
    }
  };

  const filtrosRapidos = ["Eletricista", "Encanador", "Limpeza", "Mudanças"];

  if (!searchState) return null;

  return (
    <div className="mt-8 w-full max-w-[900px] mx-auto bg-white/90 p-6 rounded-lg shadow-lg backdrop-blur-sm">
      {/* Dropdown de Categoria */}
      <div className="section-professional_search-wrapper mb-4" ref={searchRef}>
        <button
          type="button"
          className="section-professional_search-button bg-white"
          onClick={() => setDropdownOpen((prev) => !prev)}
        >
          <span
            className={
              !categoriaSelecionada ? "text-gray-500" : "text-gray-800"
            }
          >
            {categoriaSelecionada || "Selecione uma categoria (opcional)"}
          </span>
        </button>

        {dropdownOpen && (
          <ul className="section-professional_search-dropdown">
            {categories.map((cat) => (
              <li
                key={cat}
                className="section-professional_search-item"
                onMouseDown={(e) => {
                  e.preventDefault();
                  handleSelectCategoriaWrapper(cat);
                }}
              >
                <button className="section-professional_search-button-item w-full text-left">
                  {cat}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Input de Cidade e Botão Buscar */}
      <div className="section-professional_search-cidade">
        <input
          type="text"
          placeholder="Digite a cidade (ex: São Paulo)"
          value={cidade}
          onChange={(e) => setCidade(e.target.value)}
          className="section-professional_search-input"
        />
        <button
          onClick={handleBuscarCidade}
          disabled={loading}
          className="section-professional_search-button-cidade"
        >
          {loading ? "Buscando..." : "Buscar Profissionais"}
        </button>
      </div>

      {/* Botões de Filtros Rápidos */}
      <div className="mt-4 flex flex-wrap gap-2 justify-center">
        {filtrosRapidos.map((filtro) => (
          <button
            key={filtro}
            onClick={() =>
              handleSelectCategoria && handleSelectCategoria(filtro)
            }
            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
              categoriaSelecionada === filtro
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {filtro}
          </button>
        ))}
      </div>
    </div>
  );
}
