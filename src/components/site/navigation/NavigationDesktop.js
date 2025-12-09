"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function NavigationDesktop() {
  const { user, isAuthenticated } = useAuth();

  return (
    <nav className="flex max-lg:hidden">
      <ul className="flex p-3 gap-10 max-xl:gap-8">
        {/* Mostra o link apenas se o usuário não for um prestador */}
        {(!isAuthenticated || (isAuthenticated && !user?.is_prestador)) && (
          <li>
            <Link href="/be-a-professional" className="underline font-bold">
              Seja um Profissional
            </Link>
          </li>
        )}
        <li>
          <Link href="/connect#how-it-works" className="text-lg underline">
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
