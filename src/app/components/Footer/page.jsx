"use client";
import { useSession } from "next-auth/react";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

const Footer = () => {
  const { data: session } = useSession();

  return (
    <footer className="bg-gray-900 text-gray-300 py-8 mt-auto border-t border-gray-700">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        
        {/* Marca o texto */}
        <div className="text-center md:text-left">
          <h2 className="text-lg font-semibold text-white">
            {/* Solo mostrar el email si hay sesión */}
            {session?.user?.email ? `${session.user.email} 🚀` : "Bienvenido a mi sitio 🚀"}
          </h2>
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} Todos los derechos reservados.
          </p>
        </div>

        {/* Enlaces rápidos */}
        <div className="flex space-x-6">
          <a href="/about" className="hover:text-white transition-colors duration-300">
            Acerca de
          </a>
          <a href="/contact" className="hover:text-white transition-colors duration-300">
            Contacto
          </a>
          <a href="/privacy" className="hover:text-white transition-colors duration-300">
            Privacidad
          </a>
        </div>

        {/* Redes sociales */}
        <div className="flex space-x-5 text-xl">
          <a
            href="https://github.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white hover:scale-110 transition-transform duration-300"
          >
            <FaGithub />
          </a>
          <a
            href="https://linkedin.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400 hover:scale-110 transition-transform duration-300"
          >
            <FaLinkedin />
          </a>
          <a
            href="https://twitter.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-sky-400 hover:scale-110 transition-transform duration-300"
          >
            <FaTwitter />
          </a>
        </div>
      </div>

      {/* Línea decorativa inferior */}
      <div className="mt-6 text-center text-gray-500 text-sm">
        Hecho con ❤️ por{" "}
        <span className="text-indigo-400 font-medium">Mario Marquestó Dev</span>
      </div>
    </footer>
  );
};

export default Footer;
