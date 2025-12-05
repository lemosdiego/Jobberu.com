"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { IoIosMenu, IoMdClose } from "react-icons/io";

export default function NavigationMobile() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]);

  return (
    <nav className="hidden max-lg:flex relative" ref={menuRef}>
      {/* Botão do menu */}
      <button onClick={() => setIsOpen(!isOpen)} className="z-30 p-2">
        {isOpen ? (
          <IoMdClose className="text-4xl" />
        ) : (
          <IoIosMenu className="text-4xl" />
        )}
      </button>

      {/* Menu com animação */}
      <ul
        className={`fixed top-0 right-0 w-full bg-blue-300 flex flex-col p-10 gap-4 transform transition-all duration-500 ease-out
          ${
            isOpen
              ? "translate-y-0 opacity-100"
              : "-translate-y-full opacity-0 pointer-events-none"
          }
        `}
      >
        <li>
          <Link
            href="/register"
            className="underline text-blue-800 text-xl font-bold hover:text-blue-500"
          >
            Seja um Profissional
          </Link>
        </li>
        <li>
          <Link href="/about" className="text-xl underline">
            Como funciona?
          </Link>
        </li>
        <li>
          <Link href="/contact" className="text-xl underline">
            Responsabilidades
          </Link>
        </li>
      </ul>
    </nav>
  );
}
