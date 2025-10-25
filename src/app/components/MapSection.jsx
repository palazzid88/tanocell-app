'use client';
import React from 'react';

export default function MapSection() {
  return (
    <section className="my-16 flex flex-col items-center">
      {/* Título */}
      <h2 className="text-2xl font-bold mb-6 text-center text-cyan-400 drop-shadow-neon-cyan">
        Nuestra Ubicación
      </h2>

      {/* Contenedor del mapa */}
      <div className="relative w-full md:w-1/2 h-72 md:h-96 rounded-2xl overflow-hidden shadow-cyan-500/50 border border-cyan-500/50">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3356.6399667523965!2d-68.60057672433939!3d-32.72219347368674!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMzLCsDQzJzE5LjkiUyA2OMKwMzUnNTIuOCJX!5e0!3m2!1ses!2sar!4v1761350633393!5m2!1ses!2sar"
          className="w-full h-full border-0 filter brightness-75 contrast-125"
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Mapa de ubicación"
        ></iframe>

        {/* Overlay clickeable (abre el mapa en una nueva pestaña) */}
        <a
          href="https://www.google.com/maps/place/32%C2%B043'19.9%22S+68%C2%B035'52.8%22W/"
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
