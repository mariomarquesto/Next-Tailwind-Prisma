"use client";

import { useEffect, useState } from "react";
import Navbar from '../components/Navbar/page';
import Footer from '../components/Footer/page';



// 🔹 Página principal de estadísticas
export default function EstadisticasPage() {
  const [usuarios, setUsuarios] = useState(128);
  const [proyectos, setProyectos] = useState(56);
  const [ganancias, setGanancias] = useState(12400);

  useEffect(() => {
    // Simulación de actualización de datos
    const interval = setInterval(() => {
      setUsuarios((u) => u + Math.floor(Math.random() * 3));
      setProyectos((p) => p + Math.floor(Math.random() * 2));
      setGanancias((g) => g + Math.floor(Math.random() * 100));
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-yellow-50 text-gray-900 p-6 flex flex-col items-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-10 text-red-600">
          📊 Panel de Estadísticas
        </h1>

        {/* Tarjetas de resumen */}
        <div className="grid md:grid-cols-3 gap-8 w-full max-w-5xl">
          {/* Usuarios */}
          <div className="bg-yellow-200 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold text-red-700">Usuarios</h2>
              <span className="text-3xl">👥</span>
            </div>
            <p className="text-5xl font-bold">{usuarios}</p>
            <p className="text-gray-700 mt-2">Usuarios activos</p>
          </div>

          {/* Proyectos */}
          <div className="bg-yellow-300 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold text-red-700">Proyectos</h2>
              <span className="text-3xl">📁</span>
            </div>
            <p className="text-5xl font-bold">{proyectos}</p>
            <p className="text-gray-700 mt-2">Proyectos completados</p>
          </div>

          {/* Ganancias */}
          <div className="bg-yellow-400 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold text-red-700">Ganancias</h2>
              <span className="text-3xl">💰</span>
            </div>
            <p className="text-5xl font-bold">${ganancias.toLocaleString()}</p>
            <p className="text-gray-700 mt-2">Ingresos mensuales</p>
          </div>
        </div>

        {/* Gráfico simple sin librerías */}
        <div className="mt-16 w-full max-w-3xl bg-yellow-200 rounded-2xl shadow-md p-6">
          <h3 className="text-xl font-semibold text-red-700 mb-4">Crecimiento semanal 📈</h3>
          <div className="flex items-end justify-between h-40">
            {[40, 80, 60, 100, 70, 120, 90].map((altura, i) => (
              <div
                key={i}
                className="bg-red-600 w-8 rounded-t-md transition-all"
                style={{ height: `${altura}px` }}
              ></div>
            ))}
          </div>
          <div className="flex justify-between mt-2 text-sm text-gray-700">
            <span>Lun</span>
            <span>Mar</span>
            <span>Mié</span>
            <span>Jue</span>
            <span>Vie</span>
            <span>Sáb</span>
            <span>Dom</span>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
