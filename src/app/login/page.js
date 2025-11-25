"use client";
import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const params = useSearchParams();
  const router = useRouter();
  const type = params.get("type");

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");

  // Define se é página de login profissional pelo tipo da URL
  const isProfissional = type === "profissional";

  async function loginUsuario(event) {
    event.preventDefault();
    setErro("");
    setSucesso("");

    try {
      const response = await fetch(`http://localhost:3000/usuario/login`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ email, senha }),
      });

      const dados = await response.json();

      if (!response.ok) {
        setSucesso(""); // Limpa sucesso em caso de erro
        setErro(dados.error || dados.mensagem || "Erro ao fazer Login");
        return;
      }

      // Permite login apenas do tipo correto na rota correta
      if (isProfissional && dados.usuario?.tipo !== "PRESTADOR") {
        setErro("Apenas profissionais podem acessar esta página de login.");
        return;
      }
      if (!isProfissional && dados.usuario?.tipo !== "CLIENTE") {
        setErro("Apenas clientes podem acessar esta página de login.");
        return;
      }

      setErro("");
      setSucesso("Login realizado com sucesso!");

      localStorage.setItem("token", dados.token);
      localStorage.setItem("usuario", JSON.stringify(dados.usuario));

      // Redireciona para a página correta, usando o ID
      if (dados.usuario?.tipo === "PRESTADOR") {
        router.push(`/dashboard-professional/${dados.usuario.id}`);
      } else {
        router.push(`/profile-client/${dados.usuario.id}`);
      }
    } catch (erro) {
      setSucesso("");
      setErro("Erro ao fazer login");
    }
  }

  return (
    <main
      className={`grid [grid-template-columns:4fr_3fr] min-h-[90vh] ${
        isProfissional ? "bg-blue-200" : "bg-white"
      }`}
    >
      <div className="relative">
        <Image
          src={isProfissional ? "/profissionais.jpg" : "/clientes.jpg"}
          alt="Icon"
          fill
          objectFit="cover"
        />
      </div>

      <div className="p-20 flex flex-col items-center justify-center">
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

        <form onSubmit={loginUsuario} className="grid gap-2">
          <input
            className="border p-4 w-[500px] rounded"
            placeholder={
              isProfissional
                ? "Digite seu e-mail profissional"
                : "Digite seu e-mail"
            }
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <input
            className="border p-4 w-[500px] rounded"
            placeholder="Digite sua senha"
            type="password"
            value={senha}
            onChange={(event) => setSenha(event.target.value)}
          />
          <button
            type="submit"
            className="border p-4 rounded bg-black text-white"
          >
            {isProfissional ? "Acessar Painel" : "Entrar"}
          </button>
        </form>

        {erro && <p className="text-red-600 mt-2 text-sm">{erro}</p>}
        {sucesso && <p className="text-green-600 mt-2 text-sm">{sucesso}</p>}

        <div className="mt-4 text-center">
          <p className="text-sm">
            {isProfissional
              ? "Ainda não é profissional cadastrado?"
              : "Não tem uma conta?"}
          </p>
          <a
            href={isProfissional ? "/register?type=profissional" : "/register"}
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
