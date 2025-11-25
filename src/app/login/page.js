"use client";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

export default function LoginPage() {
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
      <div className="p-20 flex flex-col items-center justify-center">
        {" "}
        <h2 className="text-3xl font-semibold mb-1">
          {isProfissional
            ? "Acessar painel do profissional"
            : "Entrar na sua conta"}
        </h2>
        <p className="mb-4 text-gray-600 w-[500px] text-center">
          {isProfissional
            ? "Faça login para gerenciar seus serviços, gerenciar perfil e responder clientes."
            : "Acesse sua conta para contratar serviços, favoritar profissionais e avaliar suas experiências."}
        </p>
        <form className="grid gap-2">
          <input
            className="border p-4 w-[500px] rounded"
            placeholder={
              isProfissional
                ? "Digite seu e-mail profissional"
                : "Digite seu e-mail"
            }
          />
          <input
            className="border p-4 w-[500px] rounded"
            placeholder="Digite sua senha"
            type="password"
          />
          <button className="border p-4 rounded bg-black text-white">
            {isProfissional ? "Acessar Painel" : "Entrar"}
          </button>
        </form>
        <div className="mt-4 text-center">
          <p className="text-sm">
            {isProfissional
              ? "Ainda não é profissional cadastrado?"
              : "Não tem uma conta?"}
          </p>

          <a
            href={isProfissional ? "/register-professional" : "/register"}
            className="text-blue-600 underline text-sm"
          >
            {isProfissional
              ? "Criar conta profissional"
              : "Criar conta gratuita"}
          </a>
        </div>
      </div>
    </main>
  );
}
