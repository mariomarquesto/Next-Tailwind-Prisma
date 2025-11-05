"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Navbar from "../components/Navbar/page";
import Footer from "../components/Footer/page";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", content: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    setLoading(false);

    if (res.ok) {
      setSuccess(true);
      setForm({ name: "", email: "", content: "" });
    } else {
      alert("Error al enviar el mensaje 😢");
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gradient-to-b from-amber-400 to-yellow-200 flex flex-col items-center text-red-900 py-20">
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mt-10 px-6"
        >
          <h1 className="text-5xl font-extrabold text-red-800 mb-4">
            Contactanos 📬
          </h1>
          <p className="text-red-700 text-lg max-w-2xl mx-auto">
            ¿Tenés una idea, duda o propuesta?  
            ¡Nos encantaría escucharte y ayudarte en lo que necesites!
          </p>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-white/90 backdrop-blur-md shadow-2xl rounded-2xl p-8 mt-12 w-full max-w-lg border border-red-200"
        >
          <div className="mb-4">
            <label className="block text-red-800 font-semibold mb-2">Nombre</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full border border-red-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-red-400"
              placeholder="Tu nombre"
            />
          </div>

          <div className="mb-4">
            <label className="block text-red-800 font-semibold mb-2">Correo electrónico</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full border border-red-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-red-400"
              placeholder="tu@email.com"
            />
          </div>

          <div className="mb-6">
            <label className="block text-red-800 font-semibold mb-2">Mensaje</label>
            <textarea
              name="content"
              value={form.content}
              onChange={handleChange}
              className="w-full border border-red-300 rounded-lg p-2 h-32 focus:outline-none focus:ring-2 focus:ring-red-400"
              placeholder="Escribí tu mensaje..."
            />
          </div>

          <motion.button
            type="submit"
            whileTap={{ scale: 0.95 }}
            disabled={loading}
            className="bg-red-700 text-white px-6 py-2 rounded-full font-semibold hover:bg-red-800 transition-all shadow-md hover:shadow-lg w-full disabled:opacity-50"
          >
            {loading ? "Enviando..." : "Enviar Mensaje"}
          </motion.button>

          {success && (
            <p className="text-green-600 font-semibold text-center mt-4">
              ✅ ¡Mensaje enviado con éxito!
            </p>
          )}
        </motion.form>
      </div>

      <Footer />
    </>
  );
}
