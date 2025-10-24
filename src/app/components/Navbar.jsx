'use client';
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-black/90 backdrop-blur-md shadow-lg">
      <div className="max-w-6xl mx-auto flex items-center justify-between p-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="relative w-[120px] h-[120px]">
            <Image
              src="/img/logo-nuevo.png"
              alt="Tanocell Logo"
              fill
              className="object-contain filter drop-shadow-[0_0_10px_#fef08a] drop-shadow-[0_0_20px_#fef08a]"
            />
          </div>
        </Link>

        {/* Desktop menu */}
        <nav className="hidden md:flex gap-6">
          <NeonBoxLink href="/" color="pink">Inicio</NeonBoxLink>
          <NeonBoxLink href="#productos" color="yellow">Productos</NeonBoxLink>
          <NeonBoxLink href="#contacto" color="violet">Contacto</NeonBoxLink>
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
        <nav className="md:hidden bg-black/90 backdrop-blur-md shadow-lg p-4 flex flex-col gap-4">
          <NeonBoxLink href="/" color="pink" onClick={() => setOpen(false)}>Inicio</NeonBoxLink>
          <NeonBoxLink href="#productos" color="yellow" onClick={() => setOpen(false)}>Productos</NeonBoxLink>
          <NeonBoxLink href="#servicios" color="cyan" onClick={() => setOpen(false)}>Contacto</NeonBoxLink>
        </nav>
      )}
    </header>
  );
}

/* Componente auxiliar: Link con estilo cyberpunk gamer */
function NeonBoxLink({ href, children, color = "pink", ...props }) {
  const colors = {
    pink: {
      text: "text-neon-pink",
      shadow: "shadow-[0_0_5px_#ff00ff,0_0_15px_#ff00ff,0_0_25px_#ff66ff]",
      hoverShadow: "hover:shadow-[0_0_10px_#ff00ff,0_0_20px_#ff00ff,0_0_35px_#ff66ff]",
      hoverText: "hover:text-neon-pink"
    },
    yellow: {
      text: "text-neon-yellow",
      shadow: "shadow-[0_0_5px_#faff00,0_0_15px_#faff00,0_0_25px_#ffef5c]",
      hoverShadow: "hover:shadow-[0_0_10px_#faff00,0_0_20px_#faff00,0_0_35px_#ffef5c]",
      hoverText: "hover:text-neon-yellow"
    },
    cyan: {
      text: "text-neon-blue",
      shadow: "shadow-[0_0_5px_#00e5ff,0_0_15px_#00e5ff,0_0_25px_#66f2ff]",
      hoverShadow: "hover:shadow-[0_0_10px_#00e5ff,0_0_20px_#00e5ff,0_0_35px_#66f2ff]",
      hoverText: "hover:text-neon-blue"
    },
    violet: {
      text: "text-neon-violet",
      shadow: "shadow-[0_0_5px_#b966ff,0_0_15px_#b966ff,0_0_25px_#d9a6ff]",
      hoverShadow: "hover:shadow-[0_0_10px_#b966ff,0_0_20px_#b966ff,0_0_35px_#d9a6ff]",
      hoverText: "hover:text-neon-violet"
    }
  };

  const c = colors[color] || colors.pink;

  return (
    <Link
      href={href}
      {...props}
      className={`
        relative px-4 py-2 rounded-lg font-bold text-lg bg-black/70 border-2 ${c.text} ${c.shadow}
        after:absolute after:inset-0 after:rounded-lg after:border-2 after:border-current after:opacity-50 after:blur-lg
        transition-all duration-300 transform hover:scale-105 ${c.hoverShadow} ${c.hoverText}
      `}
    >
      {children}
    </Link>
  );
}
