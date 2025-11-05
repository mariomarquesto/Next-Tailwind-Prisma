"use client";

import { useSession, signOut } from "next-auth/react";
import { useState } from "react";
import Link from "next/link";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession();
  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-gray-800 p-4 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo o nombre del sitio */}
        {session ? (
          <Link href="/dashboard" className="text-xl font-bold hover:text-indigo-400 transition">
            {session.user?.email}
          </Link>
        ) : (
          <Link href="/" className="text-xl font-bold">
            Mi Sitio Web
          </Link>
        )}

        {/* Menú de escritorio */}
        <ul className="hidden md:flex space-x-4 items-center">
          {/* Mostrar "Home" solo si el usuario está logeado */}
          {session && (
            <li>
              <Link href="/Home" className="hover:text-gray-300">
                Home
              </Link>
            </li>
          )}

          <li>
            <Link href="/About" className="hover:text-gray-300">
              About
            </Link>
          </li>
          <li>
            <Link href="/Contact" className="hover:text-gray-300">
              Contact
            </Link>
          </li>

          {/* Solo mostrar "Cerrar sesión" si hay sesión */}
          {session && (
            <li>
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="hover:text-red-400"
              >
                Cerrar sesión
              </button>
            </li>
          )}
        </ul>

        {/* Botón menú móvil */}
        <button onClick={toggleMenu} className="md:hidden">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {/* Menú móvil */}
      {isOpen && (
        <ul className="md:hidden bg-gray-700 p-4 space-y-2 mt-2 rounded-lg">
          {session && (
            <li>
              <Link
                href="/Home"
                className="block hover:text-gray-300"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
            </li>
          )}

          <li>
            <Link
              href="/About"
              className="block hover:text-gray-300"
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>
          </li>
          <li>
            <Link
              href="/Contact"
              className="block hover:text-gray-300"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>
          </li>

          {session && (
            <li>
              <button
                onClick={() => {
                  signOut({ callbackUrl: "/" });
                  setIsOpen(false);
                }}
                className="text-red-400 block"
              >
                Cerrar sesión
              </button>
            </li>
          )}
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
