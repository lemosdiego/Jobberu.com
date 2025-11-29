// /components/TelaPadrao.jsx
import React, { useState } from "react";

// Este componente recebe uma função 'onSearch' para comunicar a busca ao componente pai
export default function TelaPadrao({ onSearch, mensagemInicial }) {
  const [inputCidade, setInputCidade] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputCidade.trim()) {
      onSearch(inputCidade.trim());
    }
  };

  return (
    <div className="w-[1200px] grid gap-4 [grid-template-columns:2.5fr_3fr]">
      <div className="flex flex-col justify-center">
        <h3 className="text-4xl ">
          {mensagemInicial ||
            "Encontre os melhores profissionais perto de você"}
        </h3>
        <p className="text-xl mt-2">
          Digite o nome de uma cidade para começar.
        </p>
        <form
          onSubmit={handleSubmit}
          className="grid [grid-template-columns:4fr_2fr] gap-2 mt-3"
        >
          <input
            type="text"
            value={inputCidade}
            onChange={(e) => setInputCidade(e.target.value)}
            placeholder="Ex: Santo André"
            className="shadow p-3 rounded border border-gray-100 outline-none"
          />
          <button type="submit" className="bg-blue-400 rounded shadow">
            Buscar
          </button>
        </form>
      </div>
      <div className="bg-[url('https://res.cloudinary.com/dkrpmbjml/image/upload/v1764378209/clientes_xj6sze.jpg')] h-[400px] bg-contain bg-no-repeat bg-center bg-fixed shadow-2xl rounded"></div>
    </div>
  );
}
