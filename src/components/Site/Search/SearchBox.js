import "./SearchBox.css";
import { useState, useEffect } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { IoSearchCircle } from "react-icons/io5";

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

  const filtrosRapidos = [
    "Eletricista",
    "Encanador(a)",
    "Profissional de Limpeza",
    "Pedreiro(a)",
    "Jardineiro(a)",
  ];

  if (!searchState) return null;

  return (
    <div className="searchBox_container">
      {/* Dropdown de Categoria */}
      <div className="searchBox_dropdown-category" ref={searchRef}>
        <button
          type="button"
          className="searchBox_dropdown-category-button"
          onClick={() => setDropdownOpen((prev) => !prev)}
        >
          <span
            className={
              !categoriaSelecionada ? "text-gray-500" : "text-gray-800"
            }
          >
            {categoriaSelecionada || "Selecione uma categoria (opcional)"}
          </span>
          <IoIosArrowDown size={25} />
        </button>

        {dropdownOpen && (
          <ul className="searchBox_dropdown-category-list">
            {categories.map((cat) => (
              <li
                key={cat}
                className=""
                onMouseDown={(e) => {
                  e.preventDefault();
                  handleSelectCategoriaWrapper(cat);
                }}
              >
                <button className="">{cat}</button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Input de Cidade e Botão Buscar */}
      <div className="searchBox_city-container">
        <input
          type="text"
          placeholder="Digite a cidade (ex: São Paulo)"
          value={cidade}
          onChange={(e) => setCidade(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleBuscarCidade()}
          className="searchBox_city-input"
        />
        <button
          onClick={handleBuscarCidade}
          disabled={loading}
          className="searchBox_city-button"
        >
          {loading ? "..." : <IoSearchCircle size={45} />}
        </button>
      </div>

      {/* Botões de Filtros Rápidos */}
      <div className="searchBox_filters-container">
        {filtrosRapidos.map((filtro) => (
          <button
            key={filtro}
            onClick={() =>
              handleSelectCategoria && handleSelectCategoria(filtro)
            }
            className={`searchBox_filters-button ${
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
