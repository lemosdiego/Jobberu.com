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
            <Link
              href="/be-a-professional"
              className="underline font-bold"
              prefetch={true}
            >
              Seja um Profissional
            </Link>
          </li>
        )}
        {/* Condição para "Atualize seu perfil para profissional" (apenas para clientes logados) */}
        {isAuthenticated && !user?.is_prestador && (
          <li>
            <Link
              href={`/customer/${user.id}`}
              className="underline font-bold "
              prefetch={true}
            >
              Atualize seu perfil para profissional
            </Link>
          </li>
        )}
        <li>
          <Link
            href="/how-it-works"
            className="text-lg underline"
            prefetch={true}
          >
            Como funciona?
          </Link>
        </li>
        <li>
          <Link
            href="/responsibilities"
            className="text-lg underline"
            prefetch={true}
          >
            Responsabilidades
          </Link>
        </li>
      </ul>
    </nav>
  );
}
