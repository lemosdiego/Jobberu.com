"use client";

import { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true); // Novo estado

  useEffect(() => {
    // Ao carregar a aplicação, verifica se existe um token nos cookies
    const token = Cookies.get("jobberu_token");
    const userData = Cookies.get("jobberu_user");

    if (token && userData) {
      setUser(JSON.parse(userData));
      setIsAuthenticated(true);
    }
    // Independentemente de encontrar ou não, a verificação inicial terminou.
    setIsLoadingAuth(false);
  }, []);

  const login = (userData, token) => {
    setUser(userData);
    setIsAuthenticated(true);
    // Armazena o token e os dados do usuário nos cookies
    // O token expira em 1 hora (1/24 de um dia)
    Cookies.set("jobberu_token", token, { expires: 1 / 24 });
    Cookies.set("jobberu_user", JSON.stringify(userData), { expires: 1 / 24 });
  };

  const updateUser = (newUserData) => {
    setUser(newUserData);
    Cookies.set("jobberu_user", JSON.stringify(newUserData), {
      expires: 1 / 24,
    });
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    // Remove os cookies
    Cookies.remove("jobberu_token");
    Cookies.remove("jobberu_user");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoadingAuth, // Expondo o novo estado
        login,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
