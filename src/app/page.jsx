"use client";

import Navbar from "../app/components/Navbar/page";
import Footer from "../app/components/Footer/page";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";

export default function HomePage() {
  const { data: session } = useSession();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-amber-400 to-yellow-200 text-red-900">
      {/* Navbar */}
      <Navbar />

      {/* Contenido principal */}
      <main className="flex-grow flex flex-col justify-center items-center text-center px-4 mt-12 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="bg-white/90 backdrop-blur-md p-10 rounded-2xl shadow-2xl max-w-lg w-full border border-red-200"
        >
          <h1 className="text-4xl font-extrabold mb-4 tracking-tight text-red-800">
            Bienvenido a Mi Sitio Web
          </h1>

          <p className="text-lg mb-8 text-red-700">
            Una experiencia limpia, rápida y con estilo.  
            Disfrutá de una interfaz pensada para vos.
          </p>

          <div className="flex gap-4 justify-center">
            {!session ? (
              <>
                <Link
                  href="/api/auth/login"
                  className="bg-red-700 text-white px-6 py-2 rounded-full font-semibold hover:bg-red-800 transition-all shadow-md hover:shadow-lg"
                >
                  Iniciar sesión
                </Link>
                <Link
                  href="/api/registro"
                  className="bg-white text-red-800 border border-red-700 px-6 py-2 rounded-full font-semibold hover:bg-red-100 transition-all shadow-sm hover:shadow-md"
                >
                  Registrarse
                </Link>
              </>
            ) : (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6 }}
              >
                <p className="text-xl font-bold text-red-800">
                  👋 Hola, {session.user?.name || session.user?.email}
                </p>
                <p className="text-sm text-red-600 mt-2">
                  Gracias por volver, te estábamos esperando.
                </p>
              </motion.div>
            )}
          </div>
        </motion.div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
