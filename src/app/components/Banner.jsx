'use client';

import { useState, useEffect, useRef } from "react";
import { Wrench, Smartphone, Wifi, ShoppingBag } from "lucide-react";

export default function Banner() {
  const localImages = [
    "/img/banner1.jpg",
    "/img/banner2.jpg",
    "/img/banner3.jpg",
    "/img/banner4.jpg",
    "/img/banner5.jpg",
    "/img/banner6.jpg",
    "/img/banner7.jpg",
  ];

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
    <section className="relative overflow-hidden text-center py-32 px-6 min-h-[500px]">
      {/* 🖼️ Fondo dinámico de imágenes locales */}
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
      </div>

      {/* 🌟 Contenido del banner */}
      <div className="relative z-10 max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6 text-neon-yellow drop-shadow-lg">
          Bienvenido a <span className="text-neon-pink">Tanocell</span>
        </h1>

        <p className="text-lg md:text-2xl mb-8 text-neon-blue drop-shadow-md">
          Accesorios, celulares, servicio técnico y mucho más.
        </p>

        {/* Servicios Cards */}
        {servicios.length > 0 && (
          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3 relative z-20">
            {servicios.map((s, i) => (
              <div
                key={i}
                className="flex flex-col items-center p-6 rounded-2xl bg-black/80 border-2 border-neon-pink shadow-[0_0_15px_#ff00ff,0_0_30px_#ff00ff]"
              >
                {s.icon}
                <h3 className="text-xl font-bold text-neon-yellow mt-4 mb-2">
                  {s.title}
                </h3>
                <p className="text-gray-300 text-sm text-center">
                  {s.description}
                </p>

                <a
                  href={`https://wa.me/5492615985233?text=Hola%20quiero%20consultar%20por%20${encodeURIComponent(
                    s.title
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-4 rounded-lg font-bold text-xl text-green-400 bg-black/60 hover:scale-105 transition transform duration-300 mt-4"
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
