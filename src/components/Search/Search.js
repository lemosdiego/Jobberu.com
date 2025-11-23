import "./Search.css";
import { CiSearch } from "react-icons/ci";

// const categories = [
//   "Jardinagem",
//   "Manicure e Pedicure",
//   "Barbeiro",
//   "Limpeza Residencial",
//   "Eletricista",
//   "Encanador",
//   "Pintor",
//   "Montagem de Móveis",
//   "Personal Trainer",
//   "Manutenção de Piscinas",
//   "Aulas Particulares",
//   "Motorista",
//   "Frete",
// ];

export default function Search() {
  return (
    <div className="container-search">
      <input
        type="text"
        placeholder="Buscar serviço ou prestador"
        className="search"
      />

      <CiSearch className="search-icon" />
    </div>
  );
}
