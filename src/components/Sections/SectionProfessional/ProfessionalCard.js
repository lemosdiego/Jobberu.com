import { useRouter } from "next/navigation";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import StarRating from "./StarRating";
import "./ProfessionalCard.css";

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
      ? `A partir de R$ ${parseFloat(primeiro_servico.preco)
          .toFixed(2)
          .replace(".", ",")}`
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
    <div className="professional-card">
      <div className="professional-card_image-container">
        <Image
          src={imagemServico}
          alt={`Serviço de ${primeiro_servico?.categoria || "profissional"}`}
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="professional-card_content">
        <div className="professional-card_content-header">
          <div className="professional-card_content-header-image">
            <Image
              src={fotoPerfil}
              alt={`Foto de ${nome}`}
              layout="fill"
              objectFit="cover"
            />
          </div>
          <div>
            <h3 className="professional-card_content-header-name">{nome}</h3>
            <p className="professional-card_content-header-title">
              {titulo_profissional}
            </p>
          </div>
        </div>
        <div className="professional-card_content-rating">
          <StarRating soma={soma_das_notas} total={total_avaliacoes} />
        </div>
        <p className=" professional-card_content-location">
          {cidade} - {estado}
        </p>
        <p className="professional-card_content-bio">{biografia}</p>
        <p className="professional-card_content-footer-price-text">
          {precoFormatado}
        </p>
        <button
          onClick={handleViewProfile}
          disabled={isLoadingAuth}
          className="professional-card_content-footer-button"
        >
          Ver detalhes
        </button>
      </div>
    </div>
  );
};

export default ProfessionalCard;
