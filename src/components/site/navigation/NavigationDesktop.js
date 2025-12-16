"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function NavigationDesktop() {
  const { user, isAuthenticated } = useAuth();

  return (
    <nav className="flex max-lg:hidden">
      <ul className="flex p-3 gap-10 max-xl:gap-8">
        {/* Condição para "Seja um Profissional" (apenas para não logados) */}
        {!isAuthenticated && (
          <li>
            <Link href="/be-a-professional" className="underline font-bold">
              Seja um Profissional
            </Link>
          </li>
        )}
        {/* Condição para "Atualize seu perfil para profissional" (apenas para clientes logados) */}
        {isAuthenticated && !user?.is_prestador && (
          <li>
            <Link href={`/cliente/${user.id}`} className="underline font-bold ">
              Atualize seu perfil para profissional
            </Link>
          </li>
        )}
        <li>
          <Link href="/como-funciona" className="text-lg underline">
            Como funciona?
          </Link>
        </li>
        <li>
          <Link href="/connect#responsibilities" className="text-lg underline">
            Responsabilidades
          </Link>
        </li>
      </ul>
    </nav>
  );
}
