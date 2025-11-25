"use client";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function DetailsPublicProfessionalsPage() {
  const { id } = useParams();
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUsuario() {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:3000/usuario/${id}`);
        const dados = await response.json();
        setUsuario(dados);
      } catch {
        setUsuario(null);
      }
      setLoading(false);
    }
    if (id) fetchUsuario();
  }, [id]);

  if (loading)
    return <main className="max-w-4xl mx-auto p-6">Carregando...</main>;
  if (!usuario || usuario.tipo !== "PRESTADOR")
    return (
      <main className="max-w-4xl mx-auto p-6">
        Profissional não encontrado.
      </main>
    );

  return (
    <main className="max-w-4xl mx-auto p-6">
      <div className="relative w-[200px] h-[200px] mb-4">
        <Image
          src={usuario.foto_perfil_url || "/default-profile.png"}
          alt={usuario.nome}
          fill
          objectFit="cover"
        />
      </div>
      <h1 className="text-2xl font-bold">{usuario.nome}</h1>
      <p>{usuario.titulo_profissional}</p>
      <p>{usuario.biografia}</p>
      <p>Experiência: {usuario.anos_experiencia} anos</p>
      {usuario.links_redes_sociais?.length > 0 && (
        <div>
          <span>Redes sociais:</span>
          <ul>
            {usuario.links_redes_sociais.map((link, idx) => (
              <li key={idx}>
                <a href={link} target="_blank" rel="noopener noreferrer">
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
      {/* Adicione mais campos públicos conforme necessário */}
    </main>
  );
}
