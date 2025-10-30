'use client';
import React from 'react';

export default function MapSection({ title = 'Nuestra Ubicación', googleMapsLink }) {
  return (
    <section id="#contact" className="my-16 flex flex-col items-center">
      {/* Título */}
      <h2 className="text-2xl font-bold mb-6 text-center text-cyan-400 drop-shadow-neon-cyan">
        {title}
      </h2>

      {/* Contenedor del mapa */}
      <div className="relative w-full md:w-1/2 h-72 md:h-96 rounded-2xl overflow-hidden shadow-cyan-500/50 border border-cyan-500/50">
        
        {/* Mapa oscuro como fondo */}
        <iframe
          src={googleMapsLink}
          className="w-full h-full border-0 filter brightness-50 contrast-125"
          loading="lazy"
          title="Mapa"
        ></iframe>

        {/* Overlay clickeable */}
        <a
          href={googleMapsLink.replace('/embed', '')} // abre Google Maps real
          target="_blank"
          rel="noopener noreferrer"
          className="absolute inset-0 z-10"
        >
          {/* vacío, solo captura el click */}
        </a>
      </div>
    </section>
  );
}
