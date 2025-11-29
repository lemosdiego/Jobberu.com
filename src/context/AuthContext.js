// /context/AuthContext.js
"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/router";

// 1. Cria o Contexto
// Pense nisso como a "frequência de rádio" da nossa Rádio Autenticação.
const AuthContext = createContext();

// 2. Cria o Componente Provedor
// Esta é a "torre de transmissão" que vai emitir o sinal para toda a aplicação.
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Um estado para sabermos quando a verificação inicial terminou.
  const router = useRouter();

  // 3. Efeito para verificar o login no carregamento inicial
  // Quando o site carrega, este useEffect olha no navegador se já existe um login salvo.
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
      const storedToken = localStorage.getItem("token");

      if (storedUser && storedToken) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Falha ao carregar dados de autenticação", error);
      // Limpa o storage se os dados estiverem corrompidos
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    }
    setLoading(false); // Avisa que a verificação inicial terminou.
  }, []);

  // 4. Função de Login
  // Esta função será chamada pela sua página de login após a API confirmar o sucesso.
  const login = (userData, token) => {
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", token);
    setUser(userData);
    // Redireciona para o dashboard ou para a página inicial após o login.
    router.push("/");
  };

  // 5. Função de Logout
  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    router.push("/login"); // Redireciona para a página de login após o logout.
  };

  // 6. O "sinal" que será transmitido
  // Todos os componentes que "ouvirem" esta rádio terão acesso a este objeto.
  const value = {
    user,
    isAuthenticated: !!user, // Um atalho útil: true se 'user' existir, false se for nulo.
    loading,
    login,
    logout,
  };

  // Se ainda estiver na verificação inicial, pode mostrar um loader global.
  if (loading) {
    return <div>Carregando aplicação...</div>;
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// 7. O Hook Personalizado
// Este é o "rádio" que nossos componentes usarão para sintonizar na frequência.
export function useAuth() {
  return useContext(AuthContext);
}
