'use client';
import React from 'react';
import Image from 'next/image';
import {
  FaWhatsapp,
  FaFacebookF,
  FaInstagram,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
} from 'react-icons/fa';

export default function Footer() {
  const whatsappLink = 'https://wa.me/5492615985233';
  const email = 'tanocellcomunicaciones@gmail.com';
  const telefono = '+54 261 598-5233';
  const direccion = 'Doctor Moreno 158 - local 2, Villa Tulumaya, Mendoza';
  const facebook = 'https://facebook.com/share/1BWhMPAsRB/';
  const instagram =
    'https://www.instagram.com/fernandomazzeoblanco?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==';

  return (
    <footer id="footer" className="bg-black text-white py-10 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Dirección */}
        <div className="flex flex-col gap-2">
          <h3 className="font-bold text-lg mb-2">Oficina</h3>
          <div className="flex items-center gap-2">
            <FaMapMarkerAlt />
            <span>{direccion}</span>
          </div>
          <div className="flex items-center gap-2">
            <FaPhone />
            <span>{telefono}</span>
          </div>
          <div className="flex items-center gap-2">
            <FaWhatsapp />
            <a
              href={whatsappLink}
              target="_blank"
              className="hover:text-green-500"
            >
              Consultar por WhatsApp
            </a>
          </div>
          <div className="flex items-center gap-2">
            <FaEnvelope />
            <a href={`mailto:${email}`} className="hover:text-blue-400">
              {email}
            </a>
          </div>
        </div>

        {/* Redes Sociales */}
        <div className="flex flex-col gap-2">
          <h3 className="font-bold text-lg mb-2">Redes Sociales</h3>
          <div className="flex items-center gap-2">
            <FaFacebookF />
            <a
              href={facebook}
              target="_blank"
              className="hover:text-blue-600 transition"
            >
              Facebook
            </a>
          </div>
          <div className="flex items-center gap-2">
            <FaInstagram />
            <a
              href={instagram}
              target="_blank"
              className="hover:text-pink-500 transition"
            >
              Instagram
            </a>
          </div>
        </div>

        {/* Horarios */}
        <div className="flex flex-col gap-2">
          <h3 className="font-bold text-lg mb-2">Horario de Atención</h3>
          <span>Lunes a Viernes: 9:00 - 18:00</span>
          <span>Sábados: 10:00 - 14:00</span>
        </div>
      </div>

      {/* Línea divisoria */}
      <div className="border-t border-gray-800 my-8" />

      {/* Créditos desarrollador */}
      <div className="flex flex-col flex-wrap items-center justify-center text-center gap-2">
        <p className="text-gray-400 text-sm">Desarrollado por:</p>
        <a
          href="https://impulsardigital.com.ar"
          target="_blank"
          className="hover:opacity-90 transition"
        >
          <Image
            src="/img/logo-impulsar.png"
            alt="Impulsar Digital"
            width={180}
            height={80}
            className="mx-auto"
          />
        </a>

        {/* WhatsApp del desarrollador */}
        <a
          href="https://wa.me/5492615985233"
          target="_blank"
          className="flex items-center gap-2 mt-2 text-gray-400 hover:text-green-500 transition"
        >
          <FaWhatsapp className="text-lg" />
          <span className="text-sm">+54 336 418-9749</span>
        </a>
      </div>

      {/* Copy final */}
      <div className="mt-8 text-center text-gray-500 text-xs">
        &copy; {new Date().getFullYear()} Tanocell. Todos los derechos reservados.
      </div>
    </footer>
  );
}
