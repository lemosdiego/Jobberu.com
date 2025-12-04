import ProfilePublicPrestador from "@/components/sections/ProfilePublicProfessional/ProfilePublicPrestador";
import api from "@/services/api";

// Adiciona a declaração para renderização dinâmica
export const dynamic = "force-dynamic";

async function getProfessionalData(id) {
  try {
    // Usando o serviço 'api' (Axios) para buscar os dados
    const response = await api.get(`/usuario/${id}`);
    // O Axios já retorna os dados em formato JSON no `response.data`
    return response.data;
  } catch (error) {
    // O Axios lança um erro para status codes fora do range 2xx (ex: 404, 500)
    // Podemos verificar se o erro é de um 404 para ser mais específico.
    if (error.response && error.response.status === 404) {
      console.log(`Profissional com id ${id} não encontrado.`);
    } else {
      console.error("Falha ao buscar dados do profissional:", error);
    }
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
    <main className="flex flex-col items-center justify-center">
      <ProfilePublicPrestador profissional={profissional} />
    </main>
  );
}
