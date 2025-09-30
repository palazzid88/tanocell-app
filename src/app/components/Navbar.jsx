"use client";
import Link from "next/link";
import Image from "next/image"; // <-- Importar Image de Next.js
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-black shadow-md">
      <div className="max-w-6xl mx-auto flex items-center justify-between p-4">
        {/* Logo */}
 <Link href="/" className="flex items-center gap-2">
  <div className="relative w-[120px] h-[120px]">
    <Image
      src="/img/logo-nuevo.png"
      alt="Tanocell Logo"
      fill // <-- hace que ocupe todo el contenedor
      className="object-contain filter drop-shadow-[0_0_10px_#fef08a] drop-shadow-[0_0_20px_#fef08a]"
    />
  </div>
</Link>


        {/* Desktop menu */}
        <nav className="hidden md:flex gap-6 text-lg font-semibold">
          <NeonBoxLink href="/">Inicio</NeonBoxLink>
          <NeonBoxLink href="#productos">Productos</NeonBoxLink>
          <NeonBoxLink href="#servicios">Servicios</NeonBoxLink>
          <NeonBoxLink href="#contacto">Contacto</NeonBoxLink>
        </nav>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden text-neon-yellow text-2xl"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <nav className="md:hidden bg-black shadow-lg p-4 flex flex-col gap-4 text-lg font-semibold">
          <NeonBoxLink href="/" onClick={() => setOpen(false)}>Inicio</NeonBoxLink>
          <NeonBoxLink href="#productos" onClick={() => setOpen(false)}>Productos</NeonBoxLink>
          <NeonBoxLink href="#servicios" onClick={() => setOpen(false)}>Servicios</NeonBoxLink>
          <NeonBoxLink href="#contacto" onClick={() => setOpen(false)}>Contacto</NeonBoxLink>
        </nav>
      )}
    </header>
  );
}

/* Componente auxiliar: Link con estilo cartel de neón */
function NeonBoxLink({ href, children, ...props }) {
  return (
    <Link
      href={href}
      {...props}
      className="px-3 py-1 rounded-lg border-2 border-neon-pink bg-black/60 text-neon-pink shadow-neon-pink hover:scale-105 transform transition duration-300"
    >
      {children}
    </Link>
  );
}
