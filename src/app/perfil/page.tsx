"use client";

import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar/page";
import Footer from "../components/Footer/page";
import { motion } from "framer-motion";

type FormData = { username: string; email: string; password?: string };

export default function PerfilPage() {
  const { data: session, status } = useSession();
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>();

  useEffect(() => {
    if (session?.user) {
      reset({ username: session.user.name || "", email: session.user.email || "" });
    }
  }, [session, reset]);

  const onSubmit = async (data: FormData) => {
    if (!session?.user?.id) return;

    setLoading(true);
    setServerError("");

    try {
      const res = await fetch("/api/user/update", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: session.user.id, ...data }),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Error al actualizar");

      alert("Perfil actualizado correctamente ✅");
      reset({ username: result.user.username, email: result.user.email });
    } catch (error: any) {
      setServerError(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (status === "loading") return <p className="text-center mt-10 text-gray-500">Cargando...</p>;
  if (!session) return <p className="text-center mt-10 text-red-500">No estás autenticado</p>;

  return (
    <>
      <Navbar />

      {/* Fondo degradado amarillo */}
      <div className="min-h-screen bg-gradient-to-b from-amber-400 via-yellow-200 to-yellow-50 flex flex-col items-center py-12">
        {/* Card central con motion */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/90 backdrop-blur-md p-10 rounded-2xl shadow-2xl w-full max-w-md"
        >
          <h1 className="text-3xl font-bold text-red-800 mb-6 text-center">
            Editar Perfil
          </h1>

          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <div>
              <input
                type="text"
                placeholder="Nombre de usuario"
                {...register("username", { required: "El nombre de usuario es obligatorio" })}
                className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              {errors.username && (
                <p className="text-red-600 text-sm mt-1">{errors.username.message}</p>
              )}
            </div>

            <div>
              <input
                type="email"
                placeholder="Correo electrónico"
                {...register("email", {
                  required: "El correo es obligatorio",
                  pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Correo inválido" },
                })}
                className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              {errors.email && (
                <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>

            <div>
              <input
                type="password"
                placeholder="Nueva contraseña (opcional)"
                {...register("password", { minLength: { value: 6, message: "Mínimo 6 caracteres" } })}
                className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              {errors.password && (
                <p className="text-red-600 text-sm mt-1">{errors.password.message}</p>
              )}
            </div>

            {serverError && <p className="text-red-600 text-center">{serverError}</p>}

            <button
              type="submit"
              disabled={loading}
              className="bg-red-600 text-white font-semibold py-2 rounded-lg hover:bg-red-700 transition-colors shadow-md"
            >
              {loading ? "Actualizando..." : "Actualizar Perfil"}
            </button>
          </form>
        </motion.div>
      </div>

      <Footer />
    </>
  );
}
