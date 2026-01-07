"use client";

import Link from "next/link";
import "./Footer.css";
import { useAuth } from "@/context/AuthContext";
import { FaInstagram, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  const { user, isAuthenticated } = useAuth();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="layout-footer">
      <div className="layout-footer_container">
        {/* Coluna 1: Institucional */}
        <div className="footer-column">
          <h4 className="footer-column-title">Jobberu</h4>
          <div className="footer-links">
            <Link href={"/about"} className="footer-link" prefetch={true}>
              Sobre Nós
            </Link>
            <Link
              href={"/how-it-works"}
              className="footer-link"
              prefetch={true}
            >
              Como Funciona
            </Link>
            <Link
              href={"/responsibilities"}
              className="footer-link"
              prefetch={true}
            >
              Responsabilidades
            </Link>
          </div>
        </div>

        {/* Coluna 2: Para Profissionais e Parceiros */}
        <div className="footer-column">
          <h4 className="footer-column-title">Parcerias</h4>
          <div className="footer-links">
            {/* Só mostra se o usuário não estiver logado, ou se estiver logado e NÃO for prestador */}
            {(!isAuthenticated || (isAuthenticated && !user?.is_prestador)) && (
              <Link
                href={"/be-a-professional"}
                className="footer-link"
                prefetch={true}
              >
                Seja um Profissional
              </Link>
            )}
            <Link href={"/contato"} className="footer-link" prefetch={true}>
              Ajude a plataforma
            </Link>
          </div>
        </div>

        {/* Coluna 3: Suporte e Legal */}
        <div className="footer-column">
          <h4 className="footer-column-title">Suporte</h4>
          <div className="footer-links">
            <Link
              href={"/politica-de-privacidade"}
              className="footer-link"
              prefetch={true}
            >
              Política de Privacidade
            </Link>
            <Link
              href={"/terms-of-use"}
              className="footer-link"
              prefetch={true}
            >
              Termos de Uso
            </Link>
          </div>
        </div>

        {/* Coluna 4: Social e Copyright */}
        <div className="footer-column footer-column-right">
          <h4 className="footer-column-title">Redes Sociais</h4>
          <div className="footer-social">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social-icon"
            >
              <FaInstagram size={24} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social-icon"
            >
              <FaLinkedin size={24} />
            </a>
          </div>
          <div className="footer-copyright">
            <p>&copy; {currentYear} Jobberu. Todos os direitos reservados.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
