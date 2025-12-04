import ProfilePublicPrestador from "@/components/sections/ProfilePublicProfessional/ProfilePublicPrestador";

// Adiciona a declaração para renderização dinâmica
export const dynamic = "force-dynamic";

async function getProfessionalData(id) {
  try {
    // Usando fetch com cache desabilitado para sempre buscar os dados mais recentes
    const response = await fetch(`http://localhost:3000/usuario/${id}`, {
      cache: "no-store",
    });

    if (!response.ok) {
      // Se a resposta não for 2xx, consideramos como não encontrado
      return null;
    }

    return response.json();
  } catch (error) {
    console.error("Falha ao buscar dados do profissional:", error);
    return null;
  }
}

export default async function ProfilePage({ params }) {
  // Extrai o ID do final do slug. Ex: "nome-do-profissional-2" -> "2"
  const urlSegment = params.id || "";
  const id = urlSegment.split("-").pop();

  // Se não for um ID numérico válido, não busca
  if (!id || isNaN(Number(id))) {
    return (
      <main className="text-center p-8">
        <h1>URL de Perfil Inválida</h1>
      </main>
    );
  }

  const profissional = await getProfessionalData(id);

  if (!profissional) {
    return (
      <main className="text-center p-8">
        <h1>Perfil não encontrado</h1>
        <p>Não foi possível carregar as informações deste profissional.</p>
      </main>
    );
  }

  return (
    <main>
      <ProfilePublicPrestador profissional={profissional} />
    </main>
  );
}
