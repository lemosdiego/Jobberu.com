"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { FaUser } from "react-icons/fa";
import { FaSignInAlt, FaUserPlus } from "react-icons/fa";

export default function Profile() {
  const [dropDown, setDropDown] = useState(false);
  const dropDownRef = useRef(null);

  function openDropDown() {
    setDropDown(!dropDown);
  }
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
  }, [dropDownRef]);

  return (
    <div className="relative " ref={dropDownRef}>
      <button
        onClick={openDropDown}
        className="flex items-center gap-2 cursor-pointer"
      >
        <FaUser className="text-xl max-md:text-xl" />
        <span className="text-xl max-md:text-xl">Entrar</span>
      </button>
      {dropDown && (
        <div className="absolute right-0 p-4 grid gap-2 w-[250px] bg-white shadow mt-2">
          <Link
            href={"/login"}
            className="bg-blue-500 p-2 text-white text-sm rounded flex items-center gap-2"
          >
            <span>Fazer Login</span>
            <FaSignInAlt className="text-xl" />
          </Link>
          <p className="text-center text-sm">Não tem Conta?</p>
          <Link
            href={"/register"}
            className="bg-orange-300 p-2 rounded text-white text-sm flex items-center gap-2"
          >
            <span>Criar uma Conta</span>
            <FaUserPlus className="text-xl" />
          </Link>
          <Link
            href={"/register"}
            className="text-blue-700 font-bold underline text-sm"
          >
            Quer ser um Profissional?
          </Link>
        </div>
      )}
    </div>
  );
}
