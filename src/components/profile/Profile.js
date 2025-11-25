"use client";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  FaUser,
  FaSignInAlt,
  FaUserPlus,
  FaBriefcase,
  FaSignOutAlt,
} from "react-icons/fa";

export default function Profile() {
  const [dropDown, setDropDown] = useState(false);
  const dropDownRef = useRef(null);
  const [usuario, setUsuario] = useState(null);

  const pathname = usePathname();
  const params = useSearchParams();
  const router = useRouter();
  const type = params.get("type");

  // Verificar se está logado
  useEffect(() => {
    const usuarioLocal = localStorage.getItem("usuario");
    if (usuarioLocal) {
      try {
        setUsuario(JSON.parse(usuarioLocal));
      } catch {
        setUsuario(null);
      }
    } else {
      setUsuario(null);
    }
  }, [pathname]);

  function openDropDown() {
    setDropDown(!dropDown);
  }
  function closeDropDown() {
    setDropDown(false);
  }

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    setUsuario(null);
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

  // REGRAS DE EXIBIÇÃO
  const isDashboardProf = pathname === "/dashboard-professional";
  const isProfilePersonal = pathname === "/profile-personal";
  const isPrestador = usuario && usuario.tipo === "PRESTADOR";
  const isCliente = usuario && usuario.tipo === "CLIENTE";

  return (
    <div className="relative" ref={dropDownRef}>
      <button
        onClick={openDropDown}
        className="flex items-center gap-2 cursor-pointer"
      >
        <FaUser className="text-xl" />
        <span className="text-xl">
          {usuario
            ? isPrestador
              ? "Profissional"
              : usuario.nome?.split(" ")[0] || "Meu Perfil"
            : "Entrar"}
        </span>
      </button>

      {dropDown && (
        <div className="absolute right-0 p-5 grid gap-2 w-[250px] bg-white shadow mt-2 rounded">
          {usuario ? (
            <>
              {/* Usuário é PRESTADOR */}
              {isPrestador && !isDashboardProf && (
                <Link
                  href="/dashboard-professional"
                  onClick={closeDropDown}
                  className="bg-green-500 hover:bg-green-600 p-2 text-white text-sm rounded flex items-center gap-2"
                >
                  <FaBriefcase className="text-xl" />
                  <span>Dashboard Profissional</span>
                </Link>
              )}

              {/* Usuário é CLIENTE */}
              {isCliente && !isProfilePersonal && (
                <Link
                  href="/profile-personal"
                  onClick={closeDropDown}
                  className="bg-blue-500 hover:bg-blue-600 p-2 text-white text-sm rounded flex items-center gap-2"
                >
                  <FaUser className="text-xl" />
                  <span>Meu Perfil</span>
                </Link>
              )}

              {/* Botão sair sempre aparece quando logado */}
              <button
                onClick={logout}
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
              <Link
                href="/login?type=profissional"
                onClick={closeDropDown}
                className="bg-green-500 hover:bg-green-600 p-2 text-white text-sm rounded flex items-center gap-2"
              >
                <FaBriefcase className="text-xl" />
                <span>Login Profissional</span>
              </Link>
              <p className="text-center text-sm mt-1">Não tem Conta?</p>
              <Link
                href="/register"
                onClick={closeDropDown}
                className="bg-orange-400 hover:bg-orange-500 p-2 text-white text-sm rounded flex items-center gap-2"
              >
                <FaUserPlus className="text-xl" />
                <span>Criar Conta</span>
              </Link>
              <Link
                href="/register?type=profissional"
                onClick={closeDropDown}
                className="bg-purple-500 hover:bg-purple-600 p-2 text-white text-sm rounded flex items-center gap-2"
              >
                <FaBriefcase className="text-xl" />
                <span>Criar Conta Profissional</span>
              </Link>
            </>
          )}
        </div>
      )}
    </div>
  );
}
