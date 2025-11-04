"use client";

import { motion } from "framer-motion";
import Navbar from "../components/Navbar/page";
import Footer from "../components/Footer/page";

export default function AboutPage() {
  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-blue-50 to-white flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mt-16 px-6 max-w-3xl"
        >
          <h1 className="text-5xl font-bold text-gray-800 mb-6">Sobre Nosotros 💡</h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            Somos un equipo apasionado por la tecnología, la innovación y el
            desarrollo web. Creemos en construir experiencias digitales simples,
            potentes y visualmente atractivas. 🚀
          </p>
        </motion.div>

        {/* Sección con tarjetas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-14 px-6 w-full max-w-6xl">
          {[
            {
              title: "Nuestra Misión",
              text: "Crear soluciones digitales que faciliten la vida de las personas.",
              emoji: "🎯",
            },
            {
              title: "Nuestros Valores",
              text: "Innovación, compromiso, calidad y colaboración.",
              emoji: "💎",
            },
            {
              title: "Nuestro Equipo",
              text: "Desarrolladores, diseñadores y soñadores que aman lo que hacen.",
              emoji: "👨‍💻",
            },
          ].map((card, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              className="bg-white rounded-2xl shadow-md p-8 text-center border hover:shadow-lg transition-all"
            >
              <div className="text-5xl mb-4">{card.emoji}</div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                {card.title}
              </h3>
              <p className="text-gray-600">{card.text}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
}
