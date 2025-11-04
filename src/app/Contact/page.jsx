"use client";

import { motion } from "framer-motion";
import Navbar from "../components/Navbar/page";
import Footer from "../components/Footer/page";

export default function ContactPage() {
  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-100 to-white flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mt-16 px-6"
        >
          <h1 className="text-5xl font-bold text-gray-800 mb-4">Contactanos 📬</h1>
          <p className="text-gray-600 text-lg">
            ¿Tenés una idea, duda o propuesta? ¡Nos encantaría escucharte!
          </p>
        </motion.div>

        {/* Formulario de contacto */}
        <motion.form
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-white shadow-lg rounded-2xl p-8 mt-10 w-full max-w-lg border border-gray-100"
        >
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              Nombre
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="Tu nombre"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              Correo electrónico
            </label>
            <input
              type="email"
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="tu@email.com"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              Mensaje
            </label>
            <textarea
              className="w-full border border-gray-300 rounded-lg p-2 h-32 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="Escribí tu mensaje..."
            />
          </div>

          <motion.button
            whileTap={{ scale: 0.95 }}
            className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors font-semibold w-full"
          >
            Enviar Mensaje
          </motion.button>
        </motion.form>

        {/* Info extra */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-12 text-center text-gray-600"
        >
          <p>📍 Buenos Aires, Argentina</p>
          <p>📞 +54 9 11 1234-5678</p>
          <p>📧 contacto@tusitio.com</p>
        </motion.div>
      </div>

      <Footer />
    </>
  );
}
