import { useRouter } from "next/navigation";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import StarRating from "./StarRating";

const slugify = (text) => {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-") // Substitui espaços por -
    .replace(/[^\w\-]+/g, "") // Remove caracteres inválidos
    .replace(/\-\-+/g, "-"); // Substitui múltiplos - por um único -
};

const ProfessionalCard = ({ profissional }) => {
  const router = useRouter();
  const { isAuthenticated, isLoadingAuth } = useAuth();

  const {
    nome,
    foto_perfil_url,
    titulo_profissional,
    biografia,
    cidade,
    estado,
    total_avaliacoes,
    soma_das_notas,
    primeiro_servico,
  } = profissional;

  const fotoPerfil = foto_perfil_url || "/default-avatar.png"; // Imagem padrão para o perfil
  const imagemServico =
    primeiro_servico?.imagem_url || "/default-service-image.jpg"; // Imagem padrão para o serviço

  const precoFormatado =
    primeiro_servico?.preco != null
      ? `A partir de R$ ${primeiro_servico.preco.toFixed(2).replace(".", ",")}`
      : "Preço a combinar";

  const handleViewProfile = () => {
    // Não faz nada enquanto a autenticação ainda está carregando
    if (isLoadingAuth) {
      return;
    }

    const slug = slugify(profissional.nome);
    const profileUrl = `/perfil/${slug}-${profissional.id}`;

    if (isAuthenticated) {
      router.push(profileUrl);
    } else {
      // Redireciona para o login, guardando a página de destino
      router.push(`/login?redirect=${profileUrl}`);
    }
  };

  return (
    <div className="border border-gray-100 rounded-lg overflow-hidden shadow-lg flex flex-col">
      <div className="relative h-48 w-full">
        <Image
          src={imagemServico}
          alt={`Serviço de ${primeiro_servico?.categoria || "profissional"}`}
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="p-5 flex-grow flex flex-col">
        <div className="flex items-center mb-1">
          <div className="relative h-12 w-12 rounded-full overflow-hidden mr-3">
            <Image
              src={fotoPerfil}
              alt={`Foto de ${nome}`}
              layout="fill"
              objectFit="cover"
            />
          </div>
          <div>
            <h3 className="font-bold text-lg">{nome}</h3>
            <p className="text-sm text-gray-600">{titulo_profissional}</p>
          </div>
        </div>
        <div className="mb-1">
          <StarRating soma={soma_das_notas} total={total_avaliacoes} />
        </div>
        <p className="text-sm text-gray-500 mb-1">
          {cidade} - {estado}
        </p>
        <p className="text-gray-700 text-sm mb-2 flex-grow">{biografia}</p>
        <div className="mt-auto pt-3 border-t">
          <div className="flex justify-between items-center">
            <p className="text-gray-800 font-semibold">{precoFormatado}</p>
            <button
              onClick={handleViewProfile}
              disabled={isLoadingAuth}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
            >
              Ver detalhes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalCard;
