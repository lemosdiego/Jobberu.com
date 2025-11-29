// /app/perfil/[id]/page.jsx

// Função para buscar os dados do servidor.
// O Next.js fará isso no servidor antes de renderizar a página.
async function getPrestadorData(id) {
  // ATENÇÃO: A URL aqui deve ser a URL absoluta da sua API
  // Se a API e o front estão no mesmo projeto, pode ser http://localhost:3000/api/...
  const res = await fetch(`SUA_API_URL/usuario/${id}`);

  if (!res.ok) {
    // Isso pode ser tratado por uma página de erro (error.js)
    throw new Error("Falha ao buscar dados do prestador");
  }

  return res.json();
}

// Este é um Server Component, ideal para buscar dados.
export default async function PerfilPublicoPage({ params }) {
  const { id } = params;
  const prestador = await getPrestadorData(id);

  // Aqui você construiria a UI da página de perfil
  // com todos os dados do 'prestador' que a API retornou.
  return (
    <div className="container mx-auto p-8">
      <div className="bg-white p-6 rounded shadow-lg">
        <img
          src={prestador.foto_perfil_url}
          alt={prestador.nome}
          className="w-32 h-32 rounded-full mx-auto"
        />
        <h1 className="text-3xl font-bold text-center mt-4">
          {prestador.nome}
        </h1>
        <h2 className="text-xl text-gray-600 text-center">
          {prestador.titulo_profissional}
        </h2>
        <p className="mt-4 text-center">
          {prestador.cidade}, {prestador.estado}
        </p>

        <div className="mt-6 border-t pt-6">
          <h3 className="font-semibold text-lg">Biografia</h3>
          <p className="text-gray-700 mt-2">{prestador.biografia}</p>
        </div>

        {/* Aqui você pode listar os serviços, avaliações, etc. */}
      </div>
    </div>
  );
}
