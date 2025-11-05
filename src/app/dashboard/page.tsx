"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar/page";
import Footer from "../components/Footer/page";
import { motion } from "framer-motion";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (session) {
      fetch("/api/messages")
        .then((res) => res.json())
        .then((data) => setMessages(data.messages || []));
    }
  }, [session]);

  if (status === "loading") {
    return <p className="text-center mt-10 text-red-700">Cargando...</p>;
  }

  if (!session) {
    router.push("/login");
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-amber-400 to-yellow-200 text-red-900">
      {/* Navbar */}
      <Navbar />

      {/* Contenido principal */}
      <main className="flex-grow flex flex-col items-center justify-start px-4 py-16 mt-8 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white/90 backdrop-blur-md p-10 rounded-2xl shadow-2xl max-w-2xl w-full border border-red-200 text-center mb-10"
        >
          <h1 className="text-4xl font-extrabold mb-4 text-red-800">
            Bienvenido al Dashboard 🎉
          </h1>

          <p className="text-lg text-red-700 mb-6">
            Has iniciado sesión como:{" "}
            <span className="font-semibold text-red-800">
              {session.user?.email}
            </span>
          </p>

          <button
            onClick={() => signOut({ callbackUrl: "/api/registro" })}
            className="bg-red-700 text-white px-6 py-2 rounded-full font-semibold hover:bg-red-800 transition-all shadow-md hover:shadow-lg"
          >
            Cerrar sesión
          </button>
        </motion.div>

        {/* Lista de mensajes */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl p-8 w-full max-w-3xl border border-red-200"
        >
          <h2 className="text-2xl font-bold text-red-800 mb-6 text-center">
            📨 Mensajes Recibidos
          </h2>

          {messages.length > 0 ? (
            <ul className="space-y-4">
              {messages.map((msg) => (
                <motion.li
                  key={msg.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="border border-red-200 bg-white/80 rounded-xl p-4 shadow-sm hover:shadow-lg transition-all"
                >
                  <p className="font-semibold text-red-700">
                    {msg.name} ({msg.email})
                  </p>
                  <p className="text-red-800">{msg.content}</p>
                  <p className="text-sm text-red-600 mt-1">
                    {new Date(msg.createdAt).toLocaleString()}
                  </p>
                </motion.li>
              ))}
            </ul>
          ) : (
            <p className="text-center text-red-700">
              No hay mensajes aún.
            </p>
          )}
        </motion.div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
