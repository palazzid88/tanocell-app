

// src/app/components/Banner.jsx

export default function Banner() {
  return (
    <section className="bg-gradient-to-b from-black via-[#0a0a0a] to-black text-center py-20 px-6 relative overflow-hidden">
      {/* Glow background effect */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#2a2a72,#000)] opacity-70" />

      <div className="relative z-10">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6 text-neon-yellow drop-shadow-lg">
          Bienvenido a <span className="text-neon-pink">Tanocell</span>
        </h1>

        <p className="text-lg md:text-2xl mb-8 text-neon-blue drop-shadow-md">
          Accesorios, celulares, servicio técnico y mucho más.
        </p>

       <a
          href="https://wa.me/54911XXXXXXX?text=Hola%20quiero%20hacer%20una%20consulta"
          target="_blank"
          rel="noopener noreferrer"
          className="px-8 py-4 rounded-lg font-bold text-xl border-2 border-green-400 text-green-400 bg-black/60 shadow-[0_0_10px_#22c55e,0_0_20px_#22c55e,0_0_40px_#22c55e] hover:scale-105 transition transform duration-300"
        >
          Consultar
        </a>
      </div>
    </section>
  );
}
