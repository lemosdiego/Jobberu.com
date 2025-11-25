"use client";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

export default function Register() {
  const params = useSearchParams();
  const type = params.get("type");

  const isProfissional = type === "profissional";

  return (
    <main
      className={` grid [grid-template-columns:4fr_3fr] min-h-[90vh] ${
        isProfissional ? "bg-blue-200" : " bg-white"
      }`}
    >
      <div className="relative">
        {
          <Image
            src={`${isProfissional ? "/profissionais.jpg" : "/clientes.jpg"}`}
            alt="Icon"
            fill
            objectFit="cover"
          />
        }
      </div>
      <div className=" flex flex-col items-center justify-center p-20">
        <h2>
          {isProfissional
            ? "Registrar como Profissional"
            : "Registrar como Cliente"}
        </h2>
      </div>
    </main>
  );
}
