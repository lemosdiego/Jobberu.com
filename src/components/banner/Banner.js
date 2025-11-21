"use client";
import { useState } from "react";
import Image from "next/image";
import { useEffect } from "react";

export default function Banner() {
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
  const [atualIndex, setAtualIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      proximaImagem();
    }, 5000);
    return () => clearInterval(interval);
  }, [atualIndex]);

  function proximaImagem() {
    setAtualIndex((atualIndex + 1) % imagesBanner.length);
  }

  function imagemAnterior() {
    setAtualIndex((atualIndex - 1 + imagesBanner.length) % imagesBanner.length);
  }

  return (
    <div className="w-full  border-2 border-white relative">
      {imagesBanner.map((image, index) => (
        <div
          key={image.id}
          className={`relative h-[550px] ${
            index === atualIndex ? "block" : "hidden"
          }`}
        >
          <Image src={image.image} alt={image.title} fill objectFit="cover" />
        </div>
      ))}

      <button
        onClick={imagemAnterior}
        className="absolute top-1/2 left-0 transform -translate-y-1/2"
      >
        Anterior
      </button>
      <button
        onClick={proximaImagem}
        className="absolute top-1/2 right-0 transform -translate-y-1/2"
      >
        Próxima
      </button>

      <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex items-center justify-center gap-1 ">
        {imagesBanner.map((image, index) => (
          <button
            key={image.id}
            onClick={() => setAtualIndex(index)}
            className={`w-5 h-4 rounded-full ${
              index === atualIndex ? "bg-blue-500 w-7" : "bg-neutral-400"
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
}
