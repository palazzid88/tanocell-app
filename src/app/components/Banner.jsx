"use client";

import { useState, useEffect, useRef } from "react";
import { Wrench, Smartphone, Wifi, ShoppingBag } from "lucide-react";

export default function Banner() {
  const localImages = [
    "/img/21.webp",
    "/img/22.webp",
    "/img/23.webp",
    "/img/24.webp",
    "/img/25.webp",
  ]

  const [currentIndex, setCurrentIndex] = useState(0);
  const [servicios, setServicios] = useState([]);
  const intervalRef = useRef();

  // ⏱️ Rotación automática de imágenes locales
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % localImages.length);
    }, 4000);
    return () => clearInterval(intervalRef.current);
  }, []);

  // 📂 Cargar servicios desde JSON
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
    <section className="relative overflow-hidden text-center py-32 px-6 min-h-[600px] md:min-h-[700px] lg:min-h-[800px]">
      {/* 🖼️ Fondo dinámico */}
      <div className="absolute inset-0 z-0">
        {localImages.map((img, index) => (
          <img
            key={img}
            src={img}
            alt={`Banner ${index + 1}`}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
        <div className="absolute inset-0 bg-black/40 z-1"></div>
      </div>

      {/* 🌟 Contenido */}
      <div className="relative z-10 max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6 text-neon-yellow neon-yellow">
          Bienvenido a <span className="text-white">TANOCELL</span>
        </h1>

        <p className="text-lg md:text-2xl mb-8 text-neon-blue drop-neon-blue">
          Accesorios, Celulares, Servicio Técnico y mucho más.
        </p>

        {/* 🧩 Servicios Cards */}
        {servicios.length > 0 && (
          <div className="mt-16 grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            {servicios.map((s, i) => (
              <div
                key={i}
                className="flex flex-col items-center justify-between p-6 rounded-xl bg-black/70 border border-neon-pink shadow-[0_0_20px_#ff00ff40] hover:shadow-[0_0_30px_#ff00ff80] transition duration-500 h-full"
              >
                {/* Icono */}
                <div className="mb-4">{s.icon}</div>

                {/* Título */}
                <h3 className="text-xl font-bold text-neon-yellow mb-2 neon-yellow text-center">
                  {s.title}
                </h3>

                {/* Descripción */}
                <p className="text-gray-300 text-sm text-center leading-relaxed flex-grow">
                  {s.description}
                </p>

                {/* Botón */}
                <a
                  href={`https://wa.me/5492615985233?text=Hola%20quiero%20consultar%20por%20${encodeURIComponent(
                    s.title
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3 mt-4 rounded-lg font-bold text-sm text-green-400 bg-black/50 border border-green-400/40 hover:bg-green-500/20 hover:scale-105 transition-all duration-300"
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
