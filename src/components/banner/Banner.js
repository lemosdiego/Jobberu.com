"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import {
  IoIosArrowDroprightCircle,
  IoIosArrowDropleftCircle,
} from "react-icons/io";

// Array de imagens para o carrossel, com id, url da imagem, título e descrição
const imagesBanner = [
  {
    id: 1,
    image:
      "https://res.cloudinary.com/dkrpmbjml/image/upload/v1756744866/brecho/fy4hddcmiam1vky137qp.png",
    title: "Banner 1",
    description: "Banner 1 description",
  },
  {
    id: 2,
    image:
      "https://res.cloudinary.com/dkrpmbjml/image/upload/v1756746203/brecho/tmuo5iekk0drwqrfurph.png",
    title: "Banner 2",
    description: "Banner 2 description",
  },
  {
    id: 3,
    image:
      "https://res.cloudinary.com/dkrpmbjml/image/upload/v1756650877/brecho/hlcadinpvj8au1y0bhqz.png",
    title: "Banner 3",
    description: "Banner 3 description",
  },
];

export default function Banner() {
  // Estado com o índice da imagem atualmente exibida; começa em 0
  const [atualIndex, setAtualIndex] = useState(0);

  // useEffect cria um intervalo que troca a imagem a cada 5 segundos
  // A função setAtualIndex usa a forma funcional para acessar estado atualizado
  // O array de dependência vazio faz o efeito rodar só ao montar, evitando recriação constante do intervalo
  useEffect(() => {
    const interval = setInterval(() => {
      setAtualIndex((prevIndex) => (prevIndex + 1) % imagesBanner.length);
    }, 8000);
    return () => clearInterval(interval); // Limpa o intervalo ao desmontar o componente
  }, []);

  // Função chamada ao clicar no botão "Próxima", avança para a próxima imagem ciclicamente
  function proximaImagem() {
    setAtualIndex((prevIndex) => (prevIndex + 1) % imagesBanner.length);
  }

  // Função chamada ao clicar no botão "Anterior", volta para a imagem anterior ciclicamente
  function imagemAnterior() {
    setAtualIndex(
      (prevIndex) => (prevIndex - 1 + imagesBanner.length) % imagesBanner.length
    );
  }

  return (
    <div className="w-[80vw] relative max-md:w-full h-[450px] overflow-hidden max-sm:h-[200px] max-md:h-[300px]">
      {/* Mapeia as imagens, colocando-as todas absolutas e sobrepostas
          Apenas a imagem atual fica visível (opacity 100), as demais ficam invisíveis (opacity 0)
          Aplica transição suave de opacidade com Tailwind CSS */}
      {imagesBanner.map((image, index) => (
        <div
          key={image.id}
          className={`absolute inset-0 h-full transition-opacity duration-500 ease-in-out rounded ${
            index === atualIndex
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }`}
        >
          <Image src={image.image} alt={image.title} fill objectFit="cover" />
        </div>
      ))}

      {/* Botão para imagem anterior, posicionado na esquerda verticalmente centralizado */}
      <button
        onClick={imagemAnterior}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 z-10 text-neutral-300 cursor-pointer text-5xl hover:text-6xl max-md:text-3xl"
      >
        <IoIosArrowDropleftCircle />
      </button>

      {/* Botão para próxima imagem, posicionado na direita verticalmente centralizado */}
      <button
        onClick={proximaImagem}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 z-10 text-neutral-300 cursor-pointer text-5xl hover:text-6xl  max-md:text-3xl"
      >
        <IoIosArrowDroprightCircle />
      </button>

      {/* Indicadores (dots) na parte inferior centralizados, permitem selecionar imagem diretamente */}
      <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex items-center justify-center gap-1 z-10">
        {imagesBanner.map((image, index) => (
          <button
            key={image.id}
            onClick={() => setAtualIndex(index)}
            className={`w-5 h-5 rounded-full transition-all duration-300 ${
              index === atualIndex ? "bg-blue-500 w-7" : "bg-neutral-400"
            }`}
            aria-label={`Selecionar ${image.title}`}
          />
        ))}
      </div>
    </div>
  );
}
