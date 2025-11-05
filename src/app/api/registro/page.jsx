"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  const onSubmit = async (data) => {
    setLoading(true);
    setServerError("");

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Error al registrar usuario");

      alert("Usuario registrado correctamente ✅");
      router.push("/dashboard");
    } catch (error) {
      setServerError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-amber-400 to-yellow-200 text-red-900 px-4 py-12">
      <motion.form
        onSubmit={handleSubmit(onSubmit)}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-2xl w-full max-w-sm border border-red-200"
      >
        <h1 className="text-3xl font-extrabold text-center mb-6 text-red-800">
          Crear cuenta
        </h1>

        {/* Nombre de usuario */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Nombre de usuario"
            {...register("username", { required: "El nombre de usuario es obligatorio" })}
            className="border border-red-200 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          {errors.username && (
            <p className="text-red-600 text-sm mt-1">{errors.username.message}</p>
          )}
        </div>

        {/* Correo */}
        <div className="mb-4">
          <input
            type="email"
            placeholder="Correo electrónico"
            {...register("email", {
              required: "El correo es obligatorio",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Correo inválido",
              },
            })}
            className="border border-red-200 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          {errors.email && (
            <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Contraseña */}
        <div className="mb-4">
          <input
            type="password"
            placeholder="Contraseña"
            {...register("password", {
              required: "La contraseña es obligatoria",
              minLength: { value: 6, message: "Mínimo 6 caracteres" },
            })}
            className="border border-red-200 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          {errors.password && (
            <p className="text-red-600 text-sm mt-1">{errors.password.message}</p>
          )}
        </div>

        {serverError && (
          <p className="text-red-700 text-center text-sm mb-3">{serverError}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="bg-red-700 text-white font-semibold py-2 rounded-full hover:bg-red-800 transition-all shadow-md w-full"
        >
          {loading ? "Registrando..." : "Registrarse"}
        </button>

        <p className="text-center mt-4 text-sm text-red-700">
          ¿Ya tienes cuenta?{" "}
          <Link href="/api/auth/login" className="font-semibold text-red-800 hover:underline">
            Iniciar sesión
          </Link>
        </p>

        <p className="text-center mt-2 text-sm text-red-700">
          <Link href="/" className="font-semibold text-red-800 hover:underline">
            ← Volver al inicio
          </Link>
        </p>
      </motion.form>
    </div>
  );
}
