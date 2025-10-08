"use client";

import { useState, useEffect } from "react";
import { Wrench, Smartphone, Wifi, ShoppingBag } from "lucide-react";

export default function Banner() {
  const [servicios, setServicios] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/data/services.json");
        if (!res.ok) throw new Error("No se pudo cargar el JSON");

        const data = await res.json();

        const iconMap = {
          Wrench: <Wrench className="text-neon-yellow w-10 h-10" />,
          Smartphone: <Smartphone className="text-neon-pink w-10 h-10" />,
          Wifi: <Wifi className="text-neon-blue w-10 h-10" />,
          ShoppingBag: <ShoppingBag className="text-neon-orange w-10 h-10" />,
        };

        const serviciosConIcon = data.map((s) => ({
          ...s,
          icon: iconMap[s.icon] || null,
        }));

        setServicios(serviciosConIcon);
      } catch (error) {
        console.error("Error cargando servicios:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-black via-[#0a0a0a] to-black text-center py-32 px-6">
      {/* Glow background effect */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#2a2a72,#000)] opacity-70 -z-10" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6 text-neon-yellow drop-shadow-lg">
          Bienvenido a <span className="text-neon-pink">Tanocell</span>
        </h1>

        <p className="text-lg md:text-2xl mb-8 text-neon-blue drop-shadow-md">
          Accesorios, celulares, servicio técnico y mucho más.
        </p>

        {/* <a
          href="https://wa.me/54911XXXXXXX?text=Hola%20quiero%20hacer%20una%20consulta"
          target="_blank"
          rel="noopener noreferrer"
          className="px-8 py-4 rounded-lg font-bold text-xl border-2 border-green-400 text-green-400 bg-black/60 shadow-[0_0_10px_#22c55e,0_0_20px_#22c55e,0_0_40px_#22c55e] hover:scale-105 transition transform duration-300"
        >
          Consultar
        </a> */}

        {/* Servicios Cards integradas */}
        {servicios.length > 0 && (
          <div className="mt-16 relative z-20 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {servicios.map((s, i) => (
              <div
                key={i}
                className="flex flex-col items-center p-6 rounded-2xl bg-black/80 border-2 border-neon-pink shadow-[0_0_15px_#ff00ff,0_0_30px_#ff00ff]"
              >
                {/* Icono */}
                {s.icon}

                {/* Título */}
                <h3 className="text-xl font-bold text-neon-yellow drop-shadow-[0_0_10px_#ffff00] mt-4 mb-2">
                  {s.title}
                </h3>

                {/* Descripción */}
                <p className="text-gray-300 text-sm text-center">{s.description}</p>

                {/* Botón de consulta */}
        <a
          href={`https://wa.me/5492615985233?text=Hola%20quiero%20consultar%20por%20${encodeURIComponent(
              s.title
            )}`}
            target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-4 rounded-lg font-bold text-xl text-green-400 bg-black/60 hover:scale-105 transition transform duration-300"
        >
          Consultar
        </a>


              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
