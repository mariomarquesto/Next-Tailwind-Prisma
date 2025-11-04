"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import Navbar from "../components/Navbar/page";
import Footer from "../components/Footer/page";

export default function HomePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return <p className="text-center mt-10 text-gray-500">Cargando...</p>;
  }

  if (!session) {
    router.push("/login");
    return null;
  }

  const user = session.user;

  return (
    <>
      {/* NAVBAR */}
      <Navbar />

      <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-blue-50 to-white flex flex-col items-center">
        {/* Encabezado */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mt-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
            Bienvenido,{" "}
            <span className="text-indigo-600">{user?.name || user?.email}</span> 👋
          </h1>
          <p className="text-gray-600 mt-3">
            Este es tu panel principal. Gestioná todo desde un solo lugar.
          </p>
        </motion.div>

        {/* Tarjetas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-14 px-6 w-full max-w-6xl">
          {[
            {
              title: "Perfil",
              description: "Mirá y editá la información de tu cuenta.",
              href: "/perfil",
              emoji: "👤",
            },
            {
              title: "Estadísticas",
              description: "Visualizá tus datos y rendimiento general.",
              href: "/estadisticas",
              emoji: "📊",
            },
            {
              title: "Configuración",
              description: "Personalizá tu experiencia y preferencias.",
              href: "/configuracion",
              emoji: "⚙️",
            },
          ].map((card, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="bg-white rounded-2xl shadow-md p-8 hover:shadow-xl transition-all cursor-pointer border border-gray-100"
            >
              <Link href={card.href}>
                <div className="text-5xl mb-4">{card.emoji}</div>
                <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                  {card.title}
                </h3>
                <p className="text-gray-600">{card.description}</p>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Botón de cierre de sesión */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-16 text-center"
        >
          <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors font-semibold shadow-md"
          >
            Cerrar sesión
          </button>
        </motion.div>
      </div>

      {/* FOOTER */}
      <Footer />
    </>
  );
}
