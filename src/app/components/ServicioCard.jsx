export default function ServicioCard({ title, description, icon, image }) {
  return (
    <div
      className="
        flex flex-col items-center justify-center p-6 rounded-2xl 
        bg-black/80 border-2 border-neon-pink 
        shadow-[0_0_15px_#ff00ff,0_0_30px_#ff00ff]
        transition-transform transform hover:scale-105 hover:shadow-[0_0_25px_#ff00ff,0_0_50px_#ff00ff]
      "
    >

      {/* Título */}
      <h3 className="text-xl font-bold text-neon-yellow drop-shadow-[0_0_10px_#ffff00] mb-2">
        {title}
      </h3>

      {/* Descripción */}
      <p className="text-gray-300 text-sm">{description}</p>
    </div>
  );
}
