"use client";

import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-amber-400 text-red-900">
      <div className="bg-white p-8 rounded-xl shadow-xl text-center">
        <h1 className="text-3xl font-bold mb-4">
          ¡HomePage cargada correctamente!
        </h1>
        <p className="mb-6">
          Si ves este mensaje con colores, Tailwind CSS está funcionando.
        </p>

        <div className="flex gap-4 justify-center">
          <Link
            href="/api/auth/login"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all"
          >
            Iniciar sesión
          </Link>

          <Link
            href="/api/registro"
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-all"
          >
            Registrarse
          </Link>
        </div>
      </div>
    </div>
  );
}
