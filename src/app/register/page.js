"use client";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function Register() {
  const params = useSearchParams();
  const type = params.get("type");
  const isProfissional = type === "profissional";
  const tipo = isProfissional ? "PRESTADOR" : "CLIENTE";
  const router = useRouter();

  // States cadastro
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [telefone, setTelefone] = useState("");
  const [cep, setCep] = useState("");
  const [logradouro, setLogradouro] = useState("");
  const [numero, setNumero] = useState("");
  const [complemento, setComplemento] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");
  const [foto, setFoto] = useState(null);

  // Profissional (campos extra)
  const [tituloProfissional, setTituloProfissional] = useState("");
  const [biografia, setBiografia] = useState("");
  const [anosExperiencia, setAnosExperiencia] = useState("");
  const [linksRedesSociais, setLinksRedesSociais] = useState([""]);
  const [mensagem, setMensagem] = useState("");
  const [erroTipo, setErroTipo] = useState("");

  // Links dinâmicos
  function handleLinkChange(index, value) {
    const novosLinks = [...linksRedesSociais];
    novosLinks[index] = value;
    setLinksRedesSociais(novosLinks);
  }
  function adicionarLink() {
    setLinksRedesSociais([...linksRedesSociais, ""]);
  }
  function removerLink(index) {
    setLinksRedesSociais(linksRedesSociais.filter((_, i) => i !== index));
  }

  async function handleRegister(e) {
    e.preventDefault();

    setErroTipo(""); // Limpa erro anterior

    // RESTRIÇÃO: cliente só cadastra em /register, profissional só em /register?type=profissional
    if (!isProfissional && type === "profissional") {
      setErroTipo("Cliente não pode se cadastrar nesta página! Use /register");
      return;
    }
    if (isProfissional && !type) {
      setErroTipo(
        "Profissional só pode se cadastrar em /register?type=profissional"
      );
      return;
    }

    const formData = new FormData();
    formData.append("nome", nome);
    formData.append("email", email);
    formData.append("senha", senha);
    formData.append("telefone", telefone);
    formData.append("tipo", tipo);
    formData.append("cep", cep);
    formData.append("logradouro", logradouro);
    formData.append("numero", numero);
    formData.append("complemento", complemento);
    formData.append("bairro", bairro);
    formData.append("cidade", cidade);
    formData.append("estado", estado);
    if (foto) formData.append("foto_perfil", foto);

    if (isProfissional) {
      formData.append("titulo_profissional", tituloProfissional);
      formData.append("biografia", biografia);
      formData.append("anos_experiencia", anosExperiencia);
      formData.append("links_redes_sociais", JSON.stringify(linksRedesSociais));
    }

    try {
      const response = await fetch("http://localhost:3000/usuario/create", {
        method: "POST",
        body: formData,
      });
      const dados = await response.json();
      if (response.ok && dados.id) {
        // LOGIN AUTOMÁTICO após cadastro
        const loginResponse = await fetch(
          "http://localhost:3000/usuario/login",
          {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ email, senha }),
          }
        );
        const loginData = await loginResponse.json();

        if (loginResponse.ok) {
          localStorage.setItem("token", loginData.token);
          localStorage.setItem("usuario", JSON.stringify(loginData.usuario));
          if (tipo === "PRESTADOR") {
            router.push(`/dashboard-professional/${dados.id}`);
          } else {
            router.push(`/profile-client/${dados.id}`);
          }
        } else {
          setMensagem("Cadastro ok, mas erro ao autenticar.");
        }
      } else {
        setMensagem(dados.error || "Erro ao cadastrar");
      }
    } catch {
      setMensagem("Erro ao conectar com o servidor");
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
      <div className="flex flex-col items-center justify-center p-20">
        <h2 className="text-3xl font-semibold mb-6">
          {isProfissional
            ? "Registrar como Profissional"
            : "Registrar como Cliente"}
        </h2>
        {erroTipo && <p className="text-red-600 mb-4">{erroTipo}</p>}
        <form onSubmit={handleRegister} className="grid gap-2 w-[400px]">
          {/* Foto */}
          <label className="font-medium">Foto de perfil:</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFoto(e.target.files[0])}
            className="border p-3 rounded"
          />
          {/* Campos comuns */}
          <input
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Nome completo"
            className="border p-3 rounded"
            required
          />
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="E-mail"
            type="email"
            className="border p-3 rounded"
            required
          />
          <input
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            placeholder="Senha"
            type="password"
            className="border p-3 rounded"
            required
          />
          <input
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
            placeholder="Telefone"
            className="border p-3 rounded"
          />
          <input
            value={cep}
            onChange={(e) => setCep(e.target.value)}
            placeholder="CEP"
            className="border p-3 rounded"
          />
          <input
            value={logradouro}
            onChange={(e) => setLogradouro(e.target.value)}
            placeholder="Logradouro"
            className="border p-3 rounded"
          />
          <input
            value={numero}
            onChange={(e) => setNumero(e.target.value)}
            placeholder="Número"
            className="border p-3 rounded"
          />
          <input
            value={complemento}
            onChange={(e) => setComplemento(e.target.value)}
            placeholder="Complemento"
            className="border p-3 rounded"
          />
          <input
            value={bairro}
            onChange={(e) => setBairro(e.target.value)}
            placeholder="Bairro"
            className="border p-3 rounded"
          />
          <input
            value={cidade}
            onChange={(e) => setCidade(e.target.value)}
            placeholder="Cidade"
            className="border p-3 rounded"
          />
          <input
            value={estado}
            onChange={(e) => setEstado(e.target.value)}
            placeholder="Estado"
            className="border p-3 rounded"
          />
          {/* Profissional */}
          {isProfissional && (
            <>
              <input
                value={tituloProfissional}
                onChange={(e) => setTituloProfissional(e.target.value)}
                placeholder="Título profissional"
                className="border p-3 rounded"
              />
              <input
                value={biografia}
                onChange={(e) => setBiografia(e.target.value)}
                placeholder="Biografia"
                className="border p-3 rounded"
              />
              <input
                value={anosExperiencia}
                onChange={(e) => setAnosExperiencia(e.target.value)}
                type="number"
                placeholder="Anos de experiência"
                className="border p-3 rounded"
                min="0"
              />
              <label className="font-medium">Links de redes sociais:</label>
              {linksRedesSociais.map((link, idx) => (
                <div key={idx} className="flex gap-2 mb-2">
                  <input
                    value={link}
                    onChange={(e) => handleLinkChange(idx, e.target.value)}
                    placeholder={`Link #${idx + 1}`}
                    className="border p-3 rounded w-full"
                  />
                  <button
                    type="button"
                    onClick={() => removerLink(idx)}
                    className="text-red-500"
                  >
                    Remover
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={adicionarLink}
                className="bg-purple-400 text-white px-4 py-2 rounded mb-2"
              >
                Adicionar link
              </button>
            </>
          )}
          <button
            type="submit"
            className="bg-black text-white p-3 mt-2 rounded"
          >
            {isProfissional
              ? "Registrar como Profissional"
              : "Registrar como Cliente"}
          </button>
        </form>
        {mensagem && <p className="text-center mt-4 text-sm">{mensagem}</p>}
      </div>
    </main>
  );
}
