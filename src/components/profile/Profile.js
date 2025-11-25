"use client";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { FaUser, FaSignInAlt, FaUserPlus, FaBriefcase } from "react-icons/fa";

export default function Profile() {
  const [dropDown, setDropDown] = useState(false);
  const dropDownRef = useRef(null);

  const pathname = usePathname();
  const params = useSearchParams();
  const type = params.get("type");

  // ======== FLAGS SIMPLES E CLARAS ========
  const isLogin = pathname === "/login";
  const isLoginProfessional = isLogin && type === "profissional";

  const isRegister = pathname === "/register";
  const isRegisterProfessional = isRegister && type === "profissional";
  // ==========================================

  function openDropDown() {
    setDropDown(!dropDown);
  }
  function closeDropDown() {
    setDropDown(false);
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
        <FaUser className="text-xl" />
        <span className="text-xl">Entrar</span>
      </button>

      {dropDown && (
        <div className="absolute right-0 p-5 grid gap-2 w-[250px] bg-white shadow mt-2 rounded">
          {/* ==== LOGIN ==== */}
          {!isLogin || isLoginProfessional ? (
            <Link
              href="/login"
              onClick={closeDropDown}
              className="bg-blue-500 hover:bg-blue-600 p-2 text-white text-sm rounded flex items-center gap-2"
            >
              <FaSignInAlt className="text-xl" />
              <span>Fazer Login</span>
            </Link>
          ) : null}

          {!isLoginProfessional ? (
            <Link
              href="/login?type=profissional"
              onClick={closeDropDown}
              className="bg-green-500 hover:bg-green-600 p-2 text-white text-sm rounded flex items-center gap-2"
            >
              <FaBriefcase className="text-xl" />
              <span>Login Profissional</span>
            </Link>
          ) : null}

          <p className="text-center text-sm mt-1">Não tem Conta?</p>

          {/* ==== REGISTRO ==== */}
          {!isRegister || isRegisterProfessional ? (
            <Link
              href="/register"
              onClick={closeDropDown}
              className="bg-orange-400 hover:bg-orange-500 p-2 text-white text-sm rounded flex items-center gap-2"
            >
              <FaUserPlus className="text-xl" />
              <span>Criar Conta</span>
            </Link>
          ) : null}

          {!isRegisterProfessional ? (
            <Link
              href="/register?type=profissional"
              onClick={closeDropDown}
              className="bg-purple-500 hover:bg-purple-600 p-2 text-white text-sm rounded flex items-center gap-2"
            >
              <FaBriefcase className="text-xl" />
              <span>Criar Conta Profissional</span>
            </Link>
          ) : null}
        </div>
      )}
    </div>
  );
}
