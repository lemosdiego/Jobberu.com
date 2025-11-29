// /components/PrestadoresEmDestaque/PrestadoresEmDestaque.jsx
"use client";

import { useState, useEffect } from "react";
// CORREÇÃO PRINCIPAL: Importando do pacote correto para o App Router
import { useRouter, useSearchParams } from "next/navigation";
import { usePrestadoresPorCidade } from "@/hooks/usePrestadores";
import TelaPadrao from "../TelaPadrao/TelaPadrao";
import PrestadorCard from "../PrestadorCard/PrestadorCard";

export default function PrestadoresEmDestaque() {
  const router = useRouter();
  // NOVO: Hook para ler os parâmetros da URL no App Router
  const searchParams = useSearchParams();

  const [cidadeDeBusca, setCidadeDeBusca] = useState(null);

  // Efeito para ler a cidade da URL
  useEffect(() => {
    const cidadeDaUrl = searchParams.get("cidade");
    if (cidadeDaUrl) {
      const cidadeFormatada = cidadeDaUrl.replace(/-/g, " ");
      setCidadeDeBusca(cidadeFormatada);
    } else {
      setCidadeDeBusca(null);
    }
  }, [searchParams]); // Roda sempre que os parâmetros da URL mudarem

  // Busca os dados usando nosso hook
  const { prestadores, isLoading, error } =
    usePrestadoresPorCidade(cidadeDeBusca);

  // Função para iniciar uma nova busca
  const handleSearch = (cidade) => {
    const cidadeFormatada = cidade.replace(/ /g, "-");
    // A navegação no App Router é mais simples
    router.push(`/?cidade=${cidadeFormatada}`);
  };

  // Função para decidir o que renderizar
  const renderContent = () => {
    if (isLoading) {
      return <p>Buscando profissionais em {cidadeDeBusca}...</p>;
    }
    if (error) {
      return (
        <TelaPadrao
          onSearch={handleSearch}
          mensagemInicial="Ocorreu um erro ao buscar. Por favor, tente novamente."
        />
      );
    }
    if (prestadores.length > 0) {
      return (
        <>
          {prestadores.map((prestador) => (
            <PrestadorCard key={prestador.id} prestador={prestador} />
          ))}
        </>
      );
    }
    if (cidadeDeBusca && prestadores.length === 0) {
      return (
        <TelaPadrao
          onSearch={handleSearch}
          mensagemInicial={`Nenhum profissional encontrado em "${cidadeDeBusca}". Tente outra cidade.`}
        />
      );
    }
    return <TelaPadrao onSearch={handleSearch} />;
  };

  return (
    <section className="featured-providers-section w-[1200px] grid grid-cols-3">
      {renderContent()}
    </section>
  );
}
