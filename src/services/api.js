import axios from "axios";
import Cookies from "js-cookie";

const api = axios.create({
  // Certifique-se de que a URL base da sua API está correta.
  // Usar uma variável de ambiente é uma boa prática.
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000",
});

// Interceptor de requisição para adicionar o token de autenticação
api.interceptors.request.use(
  (config) => {
    const token = Cookies.get("jobberu_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
