"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  FaUser,
  FaCog, // Adicionado FaCog para o ícone de configurações
  FaSignInAlt,
  FaUserPlus,
  FaBriefcase,
  FaSignOutAlt,
} from "react-icons/fa";
import { useAuth } from "@/context/AuthContext";

export default function Profile() {
  const [dropDown, setDropDown] = useState(false);
  const dropDownRef = useRef(null); // Referência para fechar o dropdown ao clicar fora

  // Usar o AuthContext para gerenciar o estado do usuário
  const {
    user,
    isAuthenticated,
    logout: authLogout,
    isLoadingAuth,
  } = useAuth();
  const router = useRouter();

  function openDropDown() {
    setDropDown(!dropDown);
  }
  function closeDropDown() {
    setDropDown(false);
  }

  // Função de logout que usa o AuthContext
  function handleLogout() {
    authLogout(); // Chama a função de logout do AuthContext
    setDropDown(false);
    router.push("/");
  }

  // Fecha ao clicar fora
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropDownRef.current && !dropDownRef.current.contains(event.target)) {
        setDropDown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropDownRef}>
      <button
        onClick={openDropDown}
        className="flex items-center gap-2 cursor-pointer"
      >
        <div className="relative w-8 h-8 flex items-center justify-center">
          {isAuthenticated && user?.foto_perfil_url ? (
            <Image
              src={user.foto_perfil_url}
              alt={user.nome}
              fill
              className="rounded-full object-cover"
            />
          ) : isAuthenticated && !user?.foto_perfil_url ? (
            <FaUser className="text-2xl" /> // Ícone padrão se logado mas sem foto
          ) : (
            <FaUser className="text-2xl" />
          )}
        </div>
        <span className="text-xl">
          {isAuthenticated
            ? user?.is_prestador
              ? "Profissional"
              : user?.nome?.split(" ")[0] || "Meu Perfil"
            : "Entrar"}
        </span>
      </button>

      {dropDown && (
        <div className="absolute right-0 p-5 grid gap-2 w-[250px] bg-white shadow mt-2 rounded">
          {isAuthenticated ? (
            <>
              {user?.is_prestador ? (
                // Se for PRESTADOR, mostra apenas o Dashboard Profissional
                <Link
                  href={`/dashboard`}
                  onClick={closeDropDown}
                  className="bg-green-500 hover:bg-green-600 p-2 text-white text-sm rounded flex items-center gap-2"
                >
                  <FaBriefcase className="text-xl" />
                  <span>Dashboard Profissional</span>
                </Link>
              ) : (
                // Se for CLIENTE, mostra apenas Configurações
                <Link
                  href="/dashboard" // Rota para configurações do cliente
                  onClick={closeDropDown}
                  className="bg-blue-500 hover:bg-blue-600 p-2 text-white text-sm rounded flex items-center gap-2"
                >
                  <FaCog className="text-xl" />
                  <span>Configurações</span>
                </Link>
              )}

              {/* Botão sair sempre aparece quando logado */}
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 p-2 text-white text-sm rounded flex items-center gap-2"
              >
                <FaSignOutAlt className="text-xl" />
                <span>Sair</span>
              </button>
            </>
          ) : (
            <>
              {/* Login e registro aparecem apenas se não estiver logado */}
              <Link
                href="/login"
                onClick={closeDropDown}
                className="bg-blue-500 hover:bg-blue-600 p-2 text-white text-sm rounded flex items-center gap-2"
              >
                <FaSignInAlt className="text-xl" />
                <span>Fazer Login</span>
              </Link>

              <p className="text-center text-sm mt-1">Não tem Conta?</p>
              <Link
                href="/register"
                onClick={closeDropDown}
                className="bg-orange-400 hover:bg-orange-500 p-2 text-white text-sm rounded flex items-center gap-2"
              >
                <FaUserPlus className="text-xl" />
                <span>Seja um Cliente</span>
              </Link>
              <Link
                href="/register?type=profissional"
                onClick={closeDropDown}
                className="bg-purple-500 hover:bg-purple-600 p-2 text-white text-sm rounded flex items-center gap-2"
              >
                <FaBriefcase className="text-xl" />
                <span>Seja um Profissional</span>
              </Link>
            </>
          )}
        </div>
      )}
    </div>
  );
}
