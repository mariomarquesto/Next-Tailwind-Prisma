"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";





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
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || "Error al registrar usuario");
      }

      alert("Usuario registrado correctamente ✅");
      router.push("/dashboard");
    } catch (error) {
      console.error("Error en el registro:", error);
      setServerError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
   
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-sm"
      >
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Crear cuenta
        </h1>

        {/* Campo: Nombre de usuario */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Nombre de usuario"
            {...register("username", { required: "El nombre de usuario es obligatorio" })}
            className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.username && (
            <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>
          )}
        </div>

        {/* Campo: Correo */}
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
            className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Campo: Contraseña */}
        <div className="mb-4">
          <input
            type="password"
            placeholder="Contraseña"
            {...register("password", {
              required: "La contraseña es obligatoria",
              minLength: { value: 6, message: "Mínimo 6 caracteres" },
            })}
            className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
          )}
        </div>

        {serverError && (
          <p className="text-red-500 text-center text-sm mb-3">{serverError}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="bg-green-600 text-white font-semibold py-2 rounded-lg hover:bg-green-700 transition-colors w-full"
        >
          {loading ? "Registrando..." : "Registrarse"}
        </button>

        <p className="text-center mt-4 text-sm text-gray-600">
          ¿Ya tienes cuenta?{" "}
          <Link href="/api/auth/login" className="text-blue-600 hover:underline">
            Iniciar sesión
          </Link>
        </p>
          <p className="text-center mt-4 text-sm text-gray-600">
          Volver{" "}
          <Link href="/" className="text-blue-600 hover:underline">
          Volver 
          </Link>
        </p>
      </form>
    </div>
  );
}
