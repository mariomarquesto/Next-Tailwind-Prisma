"use client";

import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function LoginPage() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const router = useRouter();
  const [error, setError] = useState("");

  const onSubmit = async (data) => {
    const res = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    if (res?.error) {
      setError("Credenciales inválidas");
    } else {
      router.push("/dashboard");
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
          Iniciar sesión
        </h1>

        <div className="flex flex-col gap-4">
          {/* Correo */}
          <div>
            <input
              type="email"
              placeholder="Correo electrónico"
              {...register("email", { required: "El correo es obligatorio" })}
              className="border border-red-200 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            {errors.email && (
              <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Contraseña */}
          <div>
            <input
              type="password"
              placeholder="Contraseña"
              {...register("password", { required: "La contraseña es obligatoria" })}
              className="border border-red-200 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            {errors.password && (
              <p className="text-red-600 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          {/* Error de servidor */}
          {error && (
            <p className="text-red-700 text-center text-sm">{error}</p>
          )}

          {/* Botón */}
          <button
            type="submit"
            className="bg-red-700 text-white font-semibold py-2 rounded-full hover:bg-red-800 transition-all shadow-md"
          >
            Iniciar sesión
          </button>
        </div>

        {/* Links */}
        <p className="text-center mt-4 text-sm text-red-700">
          ¿No tienes cuenta?{" "}
          <Link href="/api/registro" className="font-semibold text-red-800 hover:underline">
            Crear una
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
