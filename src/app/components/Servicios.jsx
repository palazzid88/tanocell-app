"use client"; // necesario para usar useEffect

import { useState, useEffect } from "react";
import ServicioCard from "./ServicioCard";
import { Wrench, Smartphone, Wifi, ShoppingBag } from "lucide-react";

export default function Servicios() {
  const [servicios, setServicios] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/data/services.json"); // ahora va a public/
        if (!res.ok) throw new Error("No se pudo cargar el JSON");

        const data = await res.json();

        // Mapear iconos de texto a componentes con color neón
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
    <section className="py-16 px-6 bg-black text-center relative overflow-hidden">
      {/* Glow de fondo */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#1a1a1a,#000)] opacity-80" />

      <div className="relative z-10">
        <h2 className="text-4xl font-extrabold mb-12 text-neon-violet drop-shadow-lg">
          Nuestros Servicios
        </h2>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {servicios.map((servicio, i) => (
            <ServicioCard key={i} {...servicio} />
          ))}
        </div>
      </div>
    </section>
  );
}
