"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar/page"; // 👈 Asegúrate de que la ruta sea correcta
import Footer from "../components/Footer/page"; // 👈 Asegúrate de que la ruta sea correcta

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return <p className="text-center mt-10 text-gray-500">Cargando...</p>;
  }

  if (!session) {
    router.push("/login");
    return null;
  }

  return (
    <>
      <Navbar /> {/* 👈 Aquí se agrega el Navbar */}

      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200">
        <div className="bg-white p-10 rounded-2xl shadow-xl text-center w-full max-w-md">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">
            Bienvenido al Dashboard 🎉
          </h1>

          <p className="text-lg text-gray-700 mb-4">
            Has iniciado sesión como:{" "}
            <span className="font-semibold text-indigo-600">
              {session.user?.email}
            </span>
          </p>

          <button
            onClick={() => signOut({ callbackUrl: "/api/registro" })}
            className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors font-semibold"
          >
            Cerrar sesión
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
}
