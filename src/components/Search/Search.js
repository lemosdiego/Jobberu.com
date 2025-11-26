"use client";
import { useState, useMemo, useRef, useEffect } from "react";
import "./Search.css";
import { CiSearch } from "react-icons/ci";
import { IoIosArrowDown } from "react-icons/io";

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

export default function Search() {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const searchRef = useRef(null);

  const filteredCategories = useMemo(() => {
    if (!query) return categories;
    return categories.filter((cat) =>
      cat.toLowerCase().includes(query.toLowerCase())
    );
  }, [query]);

  const handleSelect = (value) => {
    setQuery(value);
    setOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="container-search relative " ref={searchRef}>
      <div className="search-wrapper">
        <input
          type="text"
          placeholder="Qual serviço está buscando?"
          className="search"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
        />
        <CiSearch className="search-icon" />
        <IoIosArrowDown className="arrow-down" />
      </div>

      {open && (
        <ul className="search-dropdown absolute bg-white w-full z-20 grid shadow mt-1">
          {filteredCategories.map((cat) => (
            <li
              key={cat}
              className="search-item p-1 text-sm hover:bg-gray-100"
              onMouseDown={() => handleSelect(cat)}
            >
              <button className="m-1 ml-2 cursor-pointer">{cat}</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
