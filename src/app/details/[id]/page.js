import professionals from "@/data/dataProfissionais";

export default function Details({ params }) {
  const id = Number(params.id); // converte para número
  //metodo find responsavel por procurar o primeiro elemento do array
  const professional = professionals.find(
    (profissional) => profissional.id === id
  );

  if (!professional) {
    return <p className="text-center mt-10">Profissional não encontrado.</p>;
  }

  return (
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-2">{professional.nome}</h1>
      <p className="text-gray-600 mb-4">{professional.profissao}</p>
      <p>{professional.breve_descricao}</p>
      {/* Adicione mais detalhes aqui: foto, preço, contato, etc. */}
    </main>
  );
}
