'use client';
import React from 'react';

export default function MapSection({ title = 'Ubicación', googleMapsLink }) {
  return (
    <section className="my-16 flex flex-col items-center">
      {/* Título */}
      <h2 className="text-2xl font-bold mb-6 text-center">{title}</h2>

      {/* Contenedor del mapa */}
      <div className="w-full md:w-1/2 h-72 md:h-96 shadow-lg rounded-2xl overflow-hidden">
        <iframe
          src={googleMapsLink}
          className="w-full h-full border-0"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </section>
  );
}
