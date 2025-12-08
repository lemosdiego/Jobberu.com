"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ServicosPage() {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Proteção de rota: se o usuário não for prestador, redireciona para o dashboard
    if (isAuthenticated && user && !user.is_prestador) {
      router.push("/dashboard");
    }
  }, [user, isAuthenticated, router]);

  return <main className="p-8">oi</main>;
}
